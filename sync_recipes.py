#!/usr/bin/env python3
"""
Convert ice-cream-book recipe markdown files into Astro-compatible
content files with YAML frontmatter.

Recipes and illustrations live alongside this script at the repo root,
since the solidago migration (issue #55) brought the Astro
source into this repo. No RECIPE_SOURCE indirection needed.

Illustrations are copied from illustrations/ into src/assets/recipes/
and referenced from frontmatter via Astro's image() schema helper.

Writes to: src/content/recipes/*.md, src/assets/recipes/*.png
"""

import re
import shutil
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent
REPO_RECIPES = REPO_ROOT / "recipes"
ILLUSTRATIONS_SOURCE = REPO_ROOT / "illustrations"

OUTPUT_DIR = Path(__file__).parent / "src" / "content" / "recipes"
ILLUSTRATIONS_OUTPUT = Path(__file__).parent / "src" / "assets" / "recipes"

TIER_MAP = {
    "CHILL": {"order": 1, "color": "#7ecfb3", "label": "CHILL"},
    "LEGIT": {"order": 2, "color": "#f2c94c", "label": "LEGIT"},
    "THE REAL DEAL": {"order": 3, "color": "#f2994a", "label": "THE REAL DEAL"},
    "A FUCKING ORDEAL": {"order": 4, "color": "#eb5757", "label": "A FUCKING ORDEAL"},
}


FRONTMATTER_FIELDS = (
    "date",
    "cuisine",
    "active_time_minutes",
    "total_time_minutes_min",
    "total_time_minutes_max",
    "yield",
    "dietary",
)


def parse_yaml_frontmatter(text):
    """Tiny YAML reader covering only what recipe frontmatter uses:
    quoted/unquoted scalars, integers, and `- item` lists. Returns
    (parsed_dict, body_text). If no frontmatter, returns ({}, text)."""
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return {}, text
    block = text[4:end]
    body = text[end + len("\n---\n"):]

    data = {}
    current_list_key = None
    for raw in block.split("\n"):
        if not raw.strip():
            continue
        if raw.startswith("  - ") and current_list_key:
            data[current_list_key].append(raw[4:].strip())
            continue
        current_list_key = None
        if ":" not in raw:
            continue
        key, _, val = raw.partition(":")
        key = key.strip()
        val = val.strip()
        if val == "":
            data[key] = []
            current_list_key = key
        elif val == "[]":
            data[key] = []
        elif val.startswith('"') and val.endswith('"'):
            data[key] = val[1:-1]
        elif val.lstrip("-").isdigit():
            data[key] = int(val)
        else:
            data[key] = val
    return data, body


def parse_recipe(filepath):
    """Parse a recipe markdown file and extract metadata + body."""
    text = filepath.read_text(encoding="utf-8")
    fm, text = parse_yaml_frontmatter(text)
    lines = text.split("\n")

    metadata = {
        "title": "",
        "subtitle": "",
        "tier": "",
        "tier_order": 0,
        "tier_color": "",
        "difficulty_text": "",
        "total_time": "",
        "recipeSlug": filepath.stem,
        "recipe_number": 0,
    }
    for k in FRONTMATTER_FIELDS:
        if k in fm:
            metadata[k] = fm[k]

    # Extract recipe number from filename
    num_match = re.match(r"(\d+)_", filepath.name)
    if num_match:
        metadata["recipe_number"] = int(num_match.group(1))

    # Parse title: first H1
    for line in lines:
        if line.startswith("# "):
            metadata["title"] = line[2:].strip()
            break

    # Parse subtitle: first italic line
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("*") and stripped.endswith("*") and not stripped.startswith("**"):
            metadata["subtitle"] = stripped.strip("*").strip()
            break

    # Parse difficulty line
    for line in lines:
        if line.startswith("**Difficulty:**"):
            diff_text = line.replace("**Difficulty:**", "").strip()
            for tier_name in TIER_MAP:
                if diff_text.upper().startswith(tier_name):
                    metadata["tier"] = tier_name
                    metadata["tier_order"] = TIER_MAP[tier_name]["order"]
                    metadata["tier_color"] = TIER_MAP[tier_name]["color"]
                    break
            dash_idx = diff_text.find(" - ")
            if dash_idx >= 0:
                metadata["difficulty_text"] = diff_text[dash_idx + 3:].strip()
            break

    # Parse total time
    for line in lines:
        if line.startswith("**Total Time:**"):
            metadata["total_time"] = line.replace("**Total Time:**", "").strip()
            break

    # Build the body: everything after the Total Time line
    body_started = False
    body_lines = []
    skip_next_blank = False

    for i, line in enumerate(lines):
        if line.startswith("**Total Time:**"):
            body_started = True
            skip_next_blank = True
            continue
        if body_started:
            if skip_next_blank and line.strip() == "":
                skip_next_blank = False
                continue
            skip_next_blank = False
            body_lines.append(line)

    body = "\n".join(body_lines).strip()

    if body.endswith("---"):
        body = body[:-3].rstrip()

    return metadata, body


def generate_frontmatter(metadata):
    """Generate YAML frontmatter string."""
    def esc(s):
        return s.replace('"', '\\"')

    lines = [
        "---",
        f'title: "{esc(metadata["title"])}"',
        f'subtitle: "{esc(metadata["subtitle"])}"',
        f'tier: "{esc(metadata["tier"])}"',
        f'tierOrder: {metadata["tier_order"]}',
        f'tierColor: "{metadata["tier_color"]}"',
        f'difficultyText: "{esc(metadata["difficulty_text"])}"',
        f'totalTime: "{esc(metadata["total_time"])}"',
        f'recipeSlug: "{metadata["recipeSlug"]}"',
        f'recipeNumber: {metadata["recipe_number"]}',
    ]
    if "date" in metadata:
        lines.append(f'date: "{metadata["date"]}"')
    if "cuisine" in metadata:
        lines.append(f'cuisine: "{esc(metadata["cuisine"])}"')
    if "active_time_minutes" in metadata:
        lines.append(f'activeTimeMinutes: {metadata["active_time_minutes"]}')
    if "total_time_minutes_min" in metadata:
        lines.append(f'totalTimeMinutesMin: {metadata["total_time_minutes_min"]}')
    if "total_time_minutes_max" in metadata:
        lines.append(f'totalTimeMinutesMax: {metadata["total_time_minutes_max"]}')
    if "yield" in metadata:
        lines.append(f'recipeYield: "{esc(metadata["yield"])}"')
    if "dietary" in metadata:
        if metadata["dietary"]:
            lines.append("dietary:")
            for tag in metadata["dietary"]:
                lines.append(f"  - {tag}")
        else:
            lines.append("dietary: []")
    if metadata.get("illustration"):
        # Path is relative to the markdown file location (src/content/recipes/)
        lines.append(f'illustration: "{metadata["illustration"]}"')
    lines.append("---")
    return "\n".join(lines)


def main():
    if not REPO_RECIPES.exists():
        print(f"Error: Recipe directory not found at {REPO_RECIPES}")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ILLUSTRATIONS_OUTPUT.mkdir(parents=True, exist_ok=True)

    have_illustrations = ILLUSTRATIONS_SOURCE.exists()
    if have_illustrations:
        print(f"Illustrations source: {ILLUSTRATIONS_SOURCE}")
    else:
        print(f"No illustrations directory at {ILLUSTRATIONS_SOURCE} — proceeding without")

    recipe_files = sorted(REPO_RECIPES.glob("*.md"))
    print(f"Found {len(recipe_files)} recipe files in {REPO_RECIPES}")

    illustrated = 0
    for filepath in recipe_files:
        metadata, body = parse_recipe(filepath)

        if have_illustrations:
            src_image = ILLUSTRATIONS_SOURCE / f"{metadata['recipeSlug']}.png"
            if src_image.exists():
                dst_image = ILLUSTRATIONS_OUTPUT / src_image.name
                shutil.copy2(src_image, dst_image)
                metadata["illustration"] = f"../../assets/recipes/{src_image.name}"
                illustrated += 1

        frontmatter = generate_frontmatter(metadata)
        output = f"{frontmatter}\n\n{body}\n"

        out_path = OUTPUT_DIR / filepath.name
        out_path.write_text(output, encoding="utf-8")
        mark = "🎨" if metadata.get("illustration") else "  "
        print(f"  {mark} {filepath.name} → {metadata['title']} [{metadata['tier']}]")

    print(f"\nDone! {len(recipe_files)} recipes written to {OUTPUT_DIR}")
    if have_illustrations:
        print(f"Illustrations: {illustrated}/{len(recipe_files)} recipes have hero images")


if __name__ == "__main__":
    main()
