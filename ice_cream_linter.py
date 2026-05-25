#!/usr/bin/env python3
"""
Ice Cream Book Linter v3 (Grouped Output + Suggestions + Prioritized Ordering)
"""

import argparse
import sys
import re
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parent
RECIPE_DIR = ROOT / "recipes"
FRONT_DIR = ROOT / "front_matter"
BACK_DIR = ROOT / "back_matter"
CANONICAL_DIR = ROOT / "canonical_samples"
FLAVORS_FILE = FRONT_DIR / "08_the_flavors.md"

PROFANITY = ["fuck", "shit", "damn", "hell", "ass"]
ADDRESS_TERMS = ["homie", "dude", "chief", "buddy", "pal", "boss", "dawg", "friend", "friendo"]
FORBIDDEN_CHARS = ["✓", "→", "★", "🔥", "🍨"]
ENCODING_BROKEN = ["â€", "Ã", "�"]

REQUIRED_SECTIONS = ["## Ingredients", "## Instructions", "## Notes"]
REQUIRED_METADATA = ["**Difficulty:**", "**Total Time:**"]

VOICE_THRESHOLD = 0.65

PROFANITY_MIN = 3
ADDRESS_MIN = 2

NATIONALITY_TERMS = [
    "indian", "vietnamese", "mexican", "thai", "japanese", "french",
    "italian", "korean", "chinese", "australian", "haitian", "brazilian",
    "british", "irish", "ethiopian", "colombian", "turkish", "portuguese",
    "mozambican", "german", "spanish", "russian", "american", "english",
    "scottish", "welsh", "filipino", "indonesian", "malaysian", "persian",
    "iranian", "iraqi", "egyptian", "moroccan", "lebanese", "syrian",
    "greek", "polish", "swedish", "danish", "dutch", "belgian", "swiss",
    "argentinian", "peruvian", "cuban", "jamaican", "nigerian", "kenyan",
    "israeli", "palestinian",
]

BANNED_PHRASES = [
    "according to your ice cream maker's instructions",
    "according to your ice cream maker instructions",
]

CHURN_TIME_RE = re.compile(
    r"churn[^\n.!?]{0,40}?\d{1,3}\s*(?:-|–|to)\s*\d{1,3}\s*minutes",
    re.IGNORECASE,
)

ALLERGEN_NOTE_RE = re.compile(r"\*\*allergen[^*]*\*\*[^\n]*", re.IGNORECASE)
MILK_EGG_RE = re.compile(r"\b(milk|eggs?|dairy)\b", re.IGNORECASE)

H1_RE = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
TAGLINE_RE = re.compile(r"^\*[^*\n]+\*\s*$")
BOLD_TITLE_RE = re.compile(r"\*\*([^*\n]+)\*\*")
RECIPE_FILENAME_RE = re.compile(r"^\d{2}_[a-z0-9_]+\.md$")

# --- Helpers ---

def read_file(path):
    return path.read_text(encoding="utf-8", errors="replace")


def tokenize(text):
    return re.sub(r"[^a-z\s]", "", text.lower()).split()


def vectorize(text):
    return Counter(tokenize(text))


def cosine_similarity(v1, v2):
    common = set(v1) & set(v2)
    dot = sum(v1[x] * v2[x] for x in common)
    mag1 = sum(v*v for v in v1.values()) ** 0.5
    mag2 = sum(v*v for v in v2.values()) ** 0.5
    return dot / (mag1 * mag2) if mag1 and mag2 else 0


def build_canonical_profile():
    if not CANONICAL_DIR.exists():
        return Counter()
    return vectorize("\n".join(read_file(f) for f in CANONICAL_DIR.glob("*.md")))

CANONICAL_PROFILE = build_canonical_profile()


_WORD_SUFFIX = r"(?:ing|ed|er|s|y|in)?"


def count_occurrences(text, words):
    pattern = r"\b(?:" + "|".join(re.escape(w) for w in words) + r")" + _WORD_SUFFIX + r"\b"
    return len(re.findall(pattern, text, re.IGNORECASE))


def split_paragraphs(text):
    return [p.strip() for p in text.split("\n\n") if p.strip()]


def split_sentences(text):
    return [s.strip() for s in re.split(r"[.!?]+", text) if s.strip()]


def suggest(msg, fix):
    return f"{msg} → SUGGEST: {fix}"


def extract_h1(text):
    m = H1_RE.search(text)
    return m.group(1).strip() if m else None


def extract_tagline(text):
    """First non-blank line after the H1, or None."""
    seen_h1 = False
    for line in text.splitlines():
        if not seen_h1:
            if line.startswith("# "):
                seen_h1 = True
            continue
        stripped = line.strip()
        if stripped:
            return stripped
    return None

# --- Per-file checks ---

def check_blockers(text, is_recipe):
    errors = []

    for ch in FORBIDDEN_CHARS:
        if ch in text:
            errors.append(suggest(f"Forbidden character '{ch}'", "Remove or replace"))

    for bad in ENCODING_BROKEN:
        if bad in text:
            errors.append(suggest(f"Encoding corruption: {bad}", "Re-save as UTF-8"))

    if not is_recipe:
        return errors

    for section in REQUIRED_SECTIONS:
        if section not in text:
            errors.append(suggest(f"Missing section: {section}", "Add required section"))

    for meta in REQUIRED_METADATA:
        if meta not in text:
            errors.append(suggest(f"Missing metadata: {meta}", "Add metadata"))

    if "what it tastes like" not in text.lower():
        errors.append(suggest("Missing 'What it Tastes Like'", "Add final section"))

    return errors


def check_nationality(text, path):
    """Recipe titles and filenames must not contain nationality terms."""
    errors = []
    h1 = extract_h1(text)
    if h1:
        lower = h1.lower()
        for term in NATIONALITY_TERMS:
            if re.search(rf"\b{re.escape(term)}\b", lower):
                errors.append(suggest(
                    f"Nationality '{term}' in title '{h1}'",
                    "Use a region, city, or dish name instead",
                ))
                break
    stem = path.stem.lower().replace("_", " ")
    for term in NATIONALITY_TERMS:
        if re.search(rf"\b{re.escape(term)}\b", stem):
            errors.append(suggest(
                f"Nationality '{term}' in filename '{path.name}'",
                "Rename file to use region, city, or dish",
            ))
            break
    return errors


def check_banned_phrases(text):
    errors = []
    lower = text.lower()
    for phrase in BANNED_PHRASES:
        if phrase in lower:
            errors.append(suggest(
                f"Banned phrase: '{phrase}'",
                "Describe churn doneness by visual/textural cues",
            ))
    if CHURN_TIME_RE.search(text):
        errors.append(suggest(
            "Churn-time estimate (e.g., '20-25 minutes')",
            "Describe doneness, not duration—equipment varies",
        ))
    return errors


def check_tagline(text):
    """Italicized tagline must follow the H1."""
    if not H1_RE.search(text):
        return []
    tagline = extract_tagline(text)
    if tagline is None:
        return [suggest("Missing tagline", "Add italicized tagline below H1")]
    if not TAGLINE_RE.match(tagline):
        return [suggest(
            f"Tagline not italicized: '{tagline[:60]}'",
            "Wrap in single asterisks: *tagline here*",
        )]
    return []


def check_voice_minimums(text):
    warnings = []
    p = count_occurrences(text, PROFANITY)
    if p < PROFANITY_MIN:
        warnings.append(suggest(
            f"Low profanity count ({p})",
            f"Add emphasis—aim for {PROFANITY_MIN}-5 strategic uses",
        ))
    a = count_occurrences(text, ADDRESS_TERMS)
    if a < ADDRESS_MIN:
        warnings.append(suggest(
            f"Low casual-address count ({a})",
            f"Use 'homie/chief/buddy' at least {ADDRESS_MIN} times",
        ))
    return warnings


def check_allergen_notes(text):
    """Allergen notes should not flag milk/eggs (this is ice cream)."""
    warnings = []
    for m in ALLERGEN_NOTE_RE.finditer(text):
        if MILK_EGG_RE.search(m.group()):
            warnings.append(suggest(
                "Allergen note flags milk/eggs/dairy",
                "Only note nuts, wheat, or soy—milk and eggs are baseline",
            ))
            break
    return warnings


def check_all(text, is_recipe=True):
    """Universal warnings; recipe-specific voice rules gated on is_recipe.

    The STYLE_GUIDE's voice thresholds ("3-5 profanity per recipe",
    "2-4 address terms") are explicitly per-recipe. Front/back matter
    has different rhetorical needs (philosophy, intros, fundamentals)
    and shouldn't be measured against those limits.
    """
    warnings = []

    sentences = split_sentences(text)
    if sentences:
        avg = sum(len(s.split()) for s in sentences) / len(sentences)
        if avg > 22:
            warnings.append(suggest("Sentences too long", "Split long sentences"))

    if not is_recipe:
        return warnings

    if count_occurrences(text, PROFANITY) > 5:
        warnings.append(suggest("Too much profanity", "Remove 1–3 uses"))

    if count_occurrences(text, ADDRESS_TERMS) > 4:
        warnings.append(suggest("Too many address terms", "Reduce to ≤4"))

    if CANONICAL_PROFILE:
        sim = cosine_similarity(vectorize(text), CANONICAL_PROFILE)
        if sim < VOICE_THRESHOLD:
            warnings.append(suggest(f"Voice drift ({sim:.2f})", "Align intro/notes to canonical"))

    for i, p in enumerate(split_paragraphs(text)):
        if count_occurrences(p, PROFANITY) > 2:
            warnings.append(suggest(f"Profanity clustering (para {i+1})", "Spread or remove"))
            break

    if "## Instructions" in text:
        instr = text.split("## Instructions", 1)[1].split("## Notes", 1)[0]
        if count_occurrences(instr, PROFANITY) > 2:
            warnings.append(suggest("Too much profanity in instructions", "Keep neutral tone"))

    return warnings


def lint_file(path, is_recipe):
    text = read_file(path)
    errors = check_blockers(text, is_recipe)
    warnings = check_all(text, is_recipe)
    if is_recipe:
        errors.extend(check_nationality(text, path))
        errors.extend(check_banned_phrases(text))
        errors.extend(check_tagline(text))
        warnings.extend(check_voice_minimums(text))
        warnings.extend(check_allergen_notes(text))
    return errors, warnings

# --- Global / cross-file checks ---

def check_filename_hygiene(recipe_files):
    """Convention + contiguous numbering. Returns list of (path_or_None, msg)."""
    errors = []
    seen = {}
    for f in recipe_files:
        if not RECIPE_FILENAME_RE.match(f.name):
            errors.append((f, suggest(
                f"Filename '{f.name}' doesn't match ##_lowercase_with_underscores.md",
                "Rename to match convention",
            )))
            continue
        num = int(f.name[:2])
        if num in seen:
            errors.append((f, suggest(
                f"Duplicate numeric prefix {num:02d} (also in {seen[num].name})",
                "Renumber one of the files",
            )))
        else:
            seen[num] = f
    if seen:
        nums = sorted(seen)
        expected = list(range(1, len(nums) + 1))
        if nums != expected:
            missing = sorted(set(expected) - set(nums))
            errors.append((None, suggest(
                f"Non-contiguous numbering. Missing prefixes: {missing}",
                "Renumber so prefixes run 01..N without gaps",
            )))
    return errors


def check_cross_references(recipe_titles, flavors_text):
    """recipe_titles: list of (path, h1_title). Flag titles missing from flavors index."""
    warnings = []
    flavors_titles = {
        m.group(1).strip().lower()
        for m in BOLD_TITLE_RE.finditer(flavors_text)
    }
    for f, h1 in recipe_titles:
        if h1 and h1.strip().lower() not in flavors_titles:
            warnings.append((f, suggest(
                f"Recipe title '{h1}' not found in {FLAVORS_FILE.name}",
                "Update the flavors index to match, or rename the recipe",
            )))
    return warnings

# --- Rendering ---

def render_text(results, total_files, files_with_issues, total_errors, total_warnings,
                global_errors, global_warnings):
    out = []
    if global_errors or global_warnings:
        out.append("GLOBAL")
        for f, msg in global_errors:
            label = f.name if f else "(repo)"
            out.append(f"  ERROR: {label}: {msg}")
        for f, msg in global_warnings:
            label = f.name if f else "(repo)"
            out.append(f"  WARN: {label}: {msg}")
    for f, errors, warnings in results:
        out.append(f"\n{f}")
        if errors:
            out.append(f"  ERROR ({len(errors)})")
            for e in errors:
                out.append(f"    - {e}")
        if warnings:
            out.append(f"  WARN ({len(warnings)})")
            for w in warnings:
                out.append(f"    - {w}")
    out.append("\nSUMMARY")
    out.append(f"  Files checked: {total_files}")
    out.append(f"  Files with issues: {files_with_issues}")
    out.append(f"  Errors: {total_errors}")
    out.append(f"  Warnings: {total_warnings}")
    return "\n".join(out)


def render_markdown(results, total_files, total_errors, total_warnings,
                    global_errors, global_warnings):
    out = ["## Linter Report", ""]
    out.append(
        f"**Files checked:** {total_files} · "
        f"**Errors:** {total_errors} · "
        f"**Warnings:** {total_warnings}"
    )
    out.append("")

    if global_errors:
        out.append("### Global errors")
        out.append("")
        for f, msg in global_errors:
            label = f.name if f else "_(repo)_"
            out.append(f"- **{label}**: {msg}")
        out.append("")

    if total_errors:
        out.append("### Errors")
        out.append("")
        for f, errors, _ in results:
            if not errors:
                continue
            out.append(f"**`{f.relative_to(ROOT)}`**")
            for e in errors:
                out.append(f"- {e}")
            out.append("")
    elif not global_errors:
        out.append("No errors.")
        out.append("")

    if global_warnings or total_warnings:
        warn_files = sum(1 for _, _, w in results if w)
        total_w = total_warnings
        out.append("<details>")
        out.append(f"<summary>{total_w} warnings across {warn_files} files (plus {len(global_warnings)} global)</summary>")
        out.append("")
        if global_warnings:
            out.append("**Global**")
            for f, msg in global_warnings:
                label = f.name if f else "_(repo)_"
                out.append(f"- {label}: {msg}")
            out.append("")
        for f, _, warnings in results:
            if not warnings:
                continue
            out.append(f"**`{f.relative_to(ROOT)}`**")
            for w in warnings:
                out.append(f"- {w}")
            out.append("")
        out.append("</details>")

    return "\n".join(out)


def run_lint(fmt="text"):
    recipe_files = sorted(RECIPE_DIR.glob("*.md"))
    front_files = sorted(FRONT_DIR.glob("*.md"))
    back_files = sorted(BACK_DIR.glob("*.md"))
    files = (
        [(f, True) for f in recipe_files]
        + [(f, False) for f in front_files]
        + [(f, False) for f in back_files]
    )

    global_errors = check_filename_hygiene(recipe_files)
    global_warnings = []
    if FLAVORS_FILE.exists():
        recipe_titles = [(f, extract_h1(read_file(f))) for f in recipe_files]
        global_warnings = check_cross_references(recipe_titles, read_file(FLAVORS_FILE))

    results = []
    total_errors = len(global_errors)
    total_warnings = len(global_warnings)

    for f, is_recipe in files:
        errors, warnings = lint_file(f, is_recipe)
        if errors or warnings:
            results.append((f, errors, warnings))
            total_errors += len(errors)
            total_warnings += len(warnings)

    results.sort(key=lambda x: (len(x[1]) == 0, -len(x[1]), -len(x[2])))

    total_files = len(files)
    files_with_issues = len(results)

    if fmt == "markdown":
        print(render_markdown(results, total_files, total_errors, total_warnings,
                              global_errors, global_warnings))
    else:
        print(render_text(results, total_files, files_with_issues, total_errors,
                          total_warnings, global_errors, global_warnings))

    return 1 if total_errors else 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--format", choices=["text", "markdown"], default="text")
    args = parser.parse_args()
    sys.exit(run_lint(fmt=args.format))
