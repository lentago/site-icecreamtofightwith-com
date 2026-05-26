# CLAUDE.md - AI Assistant Guide for Ice Cream to Fight With

**Last Updated:** 2026-03-07
**Repository:** ice-cream-book
**Project Type:** Modular Markdown-based Cookbook

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Content Organization](#content-organization)
4. [Development Workflow](#development-workflow)
5. [Git Workflow](#git-workflow)
6. [Build & Compilation](#build--compilation)
7. [Style Guide Essentials](#style-guide-essentials)
8. [The HOMIE Voice](#the-homie-voice)
9. [AI Assistant Guidelines](#ai-assistant-guidelines)
10. [Common Tasks & Commands](#common-tasks--commands)
11. [Quality Assurance Checklist](#quality-assurance-checklist)
12. [Technical Specifications](#technical-specifications)

---

## Project Overview

### What This Is

**"Ice Cream to Fight With: Recipes You'll Fuck Up At Least Once"** is a professionally-written cookbook featuring sophisticated international ice cream recipes with detailed cultural context, technique instruction, and a distinctive conversational voice.

**Key Characteristics:**
- Complete ice cream recipes spanning international cuisines
- Modular file structure optimized for version control and collaborative editing
- Comprehensive style guide with strict formatting and voice requirements
- Plain text markdown only (NO emojis, symbols, or decorative Unicode)
- Professional-quality content with casual, educational "HOMIE voice"
- Four-tier difficulty system (CHILL → LEGIT → THE REAL DEAL → A FUCKING ORDEAL)

**Target Audience:** Home cooks with basic ice cream experience seeking challenging, international flavors with cultural context and detailed instruction.

**Project Maturity:** Fully developed with established conventions, comprehensive documentation, and production-ready content.

---

## Repository Structure

```
ice-cream-book/
├── .git/
│
│   # Editorial source
├── front_matter/                  # Book introduction (9 files)
├── recipes/                       # 28 recipes (YAML frontmatter + HOMIE-voice prose)
├── back_matter/99_closing.md
├── illustrations/                 # Hero images, one PNG per recipe slug
├── EXAMPLE_*.md                   # Reference recipe + front matter formats
├── STYLE_GUIDE.md                 # Editorial conventions + canonical YAML frontmatter schema
├── _typos.toml                    # Spelling allowlist
│
│   # Book build
├── compile_book.py                # Concatenates front_matter + recipes + back_matter
├── compile_book.sh                # Bash equivalent
├── ice_cream_linter.py            # Voice / structure / encoding checker
├── tests/test_linter.py           # pytest for the linter
├── Ice_Cream_to_Fight_With_COMPLETE.md  # Compiled book output
│
│   # Website (post-#55 migration from foundry-platform-demo)
├── src/                           # Astro: layouts, pages, components, content config
├── sync_recipes.py                # Reads recipes/*.md → writes src/content/recipes/
├── astro.config.mjs
├── package.json / package-lock.json
├── Dockerfile                     # Production container (copies built dist/ into nginx)
├── nginx.conf                     # Port 8080, /health endpoint, clean URLs
├── .github/workflows/
│   ├── deploy.yml                 # Build → ECR → ECS, OIDC into foundry-dev-github-actions
│   ├── compile-book.yml           # PR validation: spell check + book compile
│   └── lint.yml                   # Recipe linting
│
└── docs/
    └── INFRASTRUCTURE_RELATIONSHIP.md  # How this repo lands on icecreamtofightwith.com
```

Two build pipelines, one content source:
- `compile_book.py` produces the book Markdown.
- `sync_recipes.py` + Astro produces the website.

Both read `recipes/*.md`. The YAML frontmatter block at the top of each recipe is stripped by `compile_book.py` (keeping the book pure prose) and parsed by `sync_recipes.py` (feeding the website's structured metadata card).

### Directory Purposes

| Directory | Purpose | Files | Size |
|-----------|---------|-------|------|
| `front_matter/` | Book introduction, TOC, philosophy, fundamentals | 9 numbered files | 31KB |
| `recipes/` | Individual recipe files | 28 numbered files | 325KB |
| `back_matter/` | Closing remarks | 1 file | 4KB |
| Root | Build scripts, documentation, compiled output | 7 files | ~355KB |

---

## Content Organization

### Modular Design Philosophy

The project uses a **modular-first approach** for several critical reasons:

1. **Version Control Granularity:** Individual file changes tracked separately
2. **AI Assistant Optimization:** Specific files loaded without entire 345KB document
3. **Collaborative Editing:** Multiple people can work on different recipes simultaneously
4. **Flexible Reorganization:** Recipe order changed by renumbering files
5. **Token Efficiency:** Each recipe file is 7-18KB (well within context limits)

### File Naming Conventions

**Front Matter:** `##_descriptive_name.md`
- Zero-padded numbers (01, 02, etc.)
- Numbered for sequential order
- Lowercase with underscores for spaces

**Recipes:** `##_recipe_name.md`
- Zero-padded numbers (01-27)
- Currently ordered by difficulty
- Lowercase with underscores
- **Never include nationality in filename** (use regions, cities, or dish names)

**Back Matter:** `99_*.md`
- High number to sort last alphabetically

### Recipe Organization (Current Order)

Recipes are numbered 01-28 in difficulty-based order:
- **01-03:** CHILL difficulty
- **04-16:** LEGIT difficulty
- **17-25:** THE REAL DEAL difficulty
- **26-27:** A FUCKING ORDEAL difficulty

**Note:** Recipe order can be changed by renumbering files and recompiling.

---

## Development Workflow

### Editing Individual Files

**Preferred Approach:**
```
Request: "Edit recipes/08_miso_matcha.md"
Action: Load specific file, make changes, save
```

**Avoid:**
```
Request: "Edit Recipe 8" or "Fix the miso recipe"
Better: Use exact filename with path
```

### Adding New Content

**New Recipe:**
```
1. Create recipes/##_recipe_name.md
2. Follow STYLE_GUIDE.md structure exactly
3. Include all required sections (see Recipe Structure below)
4. Test compilation
5. Commit with descriptive message
```

**Modifying Front Matter:**
```
1. Edit specific file: front_matter/##_section_name.md
2. Verify consistent voice with other front matter
3. Test compilation
4. Commit
```

### Workflow Steps

1. **Identify target file** by exact path
2. **Read file** to understand current state
3. **Make changes** following style guide
4. **Save file** with proper encoding (UTF-8)
5. **Test compilation** (optional but recommended)
6. **Commit changes** with descriptive message
7. **Push to branch** (if working in git workflow)
8. **Open a pull request** as the final step — do not stop at "pushed the branch"

---

## Git Workflow

### Current Branch

**Active Branch:** `claude/claude-md-mi6fyi978ce21pnr-019jNus9dKds9SXH4hMkodJQ`

**Remote:** `http://local_proxy@127.0.0.1:58280/git/cpitzi/ice-cream-book`

### Branching Strategy

**Development branches:**
- All development occurs on Claude-specific feature branches
- Branch naming: `claude/claude-md-*` with session ID
- Never push to main/master without explicit permission

### Commit Message Style

**Format:** Imperative mood, concise, descriptive

**Good Examples:**
- `Update difficulty rating for pawpaw recipe`
- `Fix typo in custard fundamentals`
- `Add note about candied ginger storage to sichuan plum`
- `Recompile book after recipe edits`
- `Adjust matcha ratio in miso matcha recipe`

**Bad Examples:**
- `Updated stuff` (too vague)
- `Fixed things in Recipe 8` (use filename)
- `WIP` (not descriptive)
- `asdf` (meaningless)

### Git Commands

**Individual file editing:**
```bash
git add recipes/08_miso_matcha.md
git commit -m "Adjusted matcha ratio in miso matcha recipe"
git push -u origin claude/claude-md-mi6fyi978ce21pnr-019jNus9dKds9SXH4hMkodJQ
```

**After compilation:**
```bash
python compile_book.py
git add Ice_Cream_to_Fight_With_COMPLETE.md
git commit -m "Recompile book with latest changes"
git push -u origin claude/claude-md-mi6fyi978ce21pnr-019jNus9dKds9SXH4hMkodJQ
```

**Push retry logic:**
- Always use `git push -u origin <branch-name>`
- Branch must start with `claude/` and match session ID
- If network errors occur, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

### Optional: Exclude Compiled File

Add to `.gitignore` if you want to track only source files:
```
Ice_Cream_to_Fight_With_COMPLETE.md
```

### Pull Request Creation

Opening a pull request is the final required step — "pushed the branch" is not done. The PR is part of the deliverable.

**PR title:** Match or clearly refine the issue title.

**PR body must include:**
- `Closes #<number>` so merging the PR automatically closes the issue
- A short summary of what changed and why

**Do not merge the PR yourself.** Auto-merge is configured and will handle it once checks pass.

---

## Build & Compilation

### Compilation Scripts

**Python (Preferred):**
```bash
python compile_book.py
```

**Bash (Alternative):**
```bash
chmod +x compile_book.sh
./compile_book.sh
```

**Output file:**
- `Ice_Cream_to_Fight_With_COMPLETE.md`

### Compilation Behavior

1. **Auto-discovery:** Finds all `.md` files in each directory
2. **Alphabetical order:** Sorts files naturally by filename
3. **Concatenation:** Joins sections with `\n\n---\n\n` separator
4. **UTF-8 encoding:** Preserves proper character encoding
5. **Statistics:** Reports file counts and total character count

### No External Dependencies

- Python script uses only standard library (`os`, `pathlib`, `re`, `argparse`)
- Bash script uses only standard utilities
- No package managers (npm, pip, etc.)
- No build configuration files
- No version requirements

---

## Style Guide Essentials

### CRITICAL: Text-Only Content

**This is non-negotiable and the #1 rule:**

**PROHIBITED:**
- DON'T: Emojis (they corrupt files and display inconsistently)
- DON'T: Special symbols (checkmarks, arrows, decorative bullets)
- DON'T: Decorative characters or Unicode art
- DON'T: Any non-standard text characters

**ALLOWED:**
- DO: Em dashes (—) for interrupting thoughts
- DO: Degree symbol (°F) for temperatures
- DO: Accent marks (café, mála) with proper UTF-8
- DO: Foreign characters with correct Unicode
- DO: Standard punctuation only

**Test:** Can you copy-paste into plain text editor without corruption? If yes, it's acceptable.

**If you see corrupted encoding** (`â€"` or `Ã©`), fix immediately.

### Recipe Structure (Required)

Every recipe must follow this exact structure:

```markdown
# Recipe Name
*Tagline (italicized)*

**Difficulty:** [RATING] - [Paragraph explanation in HOMIE voice]
**Total Time:** [X-Y hours] ([Parenthetical about time breakdown])

[Opening paragraph(s) with context/warnings]

## Ingredients

**Component Name:**
- Ingredient with amount
- Another ingredient

## Instructions

**Component Name (with timing if relevant):**

Instruction paragraphs in prose form (not numbered steps).

Another paragraph if needed.

## Notes

**Note Title:**
Content explaining sourcing, technique, cultural context, etc.

**Cultural Context:** (for international recipes)
**Sourcing Guidance:** (where applicable)
**Technique Deep-Dives:** (if relevant)
**Make-Ahead Guidance:** (if multi-component)
**Allergen Information:** (nuts, wheat, soy only - NOT milk/eggs)
**What it Tastes Like:** (ALWAYS final note)
```

### Required Elements Checklist

Every recipe MUST have:

- [ ] Clean title (plain text, no emojis/symbols, no nationalities)
- [ ] Italicized tagline
- [ ] Difficulty rating with HOMIE-style explanation paragraph
- [ ] Total time with funny parenthetical
- [ ] Opening paragraph(s) with context/warnings
- [ ] Grouped ingredient lists with bold headers
- [ ] Instruction sections with bold component headers
- [ ] Notes section with bold note titles
- [ ] Cultural context note (for international recipes)
- [ ] "What it tastes like" as final note
- [ ] Allergen information (if contains nuts/wheat/soy)
- [ ] Make-ahead guidance (if components can be prepped ahead)
- [ ] Proper UTF-8 encoding (no corrupted characters)
- [ ] HOMIE voice throughout (3-5 profanities, casual address)
- [ ] 2-4 teaching moments
- [ ] NO non-text characters anywhere

### Difficulty System

**CHILL:**
- No custard anxiety
- Minimal technique
- Almost no opportunity for catastrophic failure
- Examples: Sinh Tố Bơ, basic blends

**LEGIT:**
- Multiple components
- Sustained attention required
- Solid fundamentals needed
- Most recipes fall here

**THE REAL DEAL:**
- Narrow margins for error
- Techniques that can go wrong in seconds
- Expect to fuck something up at least once
- Examples: Brown butter recipes, candy work

**A FUCKING ORDEAL:**
- Extreme sourcing difficulty
- Professional techniques
- Multi-day commitment
- Genuine insanity
- Examples: Pawpaw Maple (limited availability), Chicory Beignet (complexity)

---

## The HOMIE Voice

### Core Elements

The HOMIE voice is what makes this cookbook distinctive. It's **casual, educational, self-deprecating, and genuinely helpful**—like a smart friend who's already made all the mistakes teaching you what actually works.

**Key Components:**

1. **Casual Address** (2-4 times per recipe)
   - homie, dude, friendo, buddy, dawg, friend, pal, chief, boss
   - Example: "Listen, chief—this timing matters."

2. **Conversational Asides** (in parentheses)
   - "(Ask me how I know. Actually, don't.)"
   - "(You'll thank me later.)"
   - "(This is a hill I will die on.)"

3. **Collaborative Framing**
   - "We're in this together" not "You're doing this alone"
   - "Let's fuck this up and learn something"
   - "We've all been there"

4. **Strategic Profanity** (3-5 per recipe)
   - Words: shit, damn, fuck, hell, ass
   - Use for **emphasis**, not decoration
   - "This step is fucking critical" > "This is pretty important"
   - Don't force it—if unnatural, skip it

5. **Emphasis Techniques**
   - **ALL CAPS** for critical points: "Do NOT skip this step"
   - *Italics* for stress: "The *timing* here matters"
   - Sentence fragments. For impact.
   - Start with And/But/So when natural

6. **Anticipate Reader Experience**
   - "I know you want to stir. Don't."
   - "You'll spend ten minutes staring wondering if it's ready"
   - "Yes, it's supposed to be that yellow"
   - "Fair warning—this burns FAST"

7. **Self-Deprecation** (process, never reader)
   - "This will take forever"
   - "You'll definitely burn the first batch"
   - "I've burned this three times"
   - **NEVER:** "You'll probably mess this up because you're careless"

8. **Technical Accuracy**
   - Never sacrifice accuracy for humor
   - Explain "why" in relatable terms
   - Real-world comparisons: "color of good bourbon"

### What HOMIE Voice Is NOT

- DON'T: Mean-spirited or putting down alternatives
- DON'T: Fake enthusiasm or forced positivity
- DON'T: Losing clarity for the sake of humor
- DON'T: Bragging or showing off
- DON'T: Unexplained jargon
- DON'T: More than 5-6 profanities per recipe (becomes forced)

### Voice Examples

**TOO FORMAL:**
> "One should ensure the mixture reaches the appropriate temperature before proceeding."

**HOMIE VOICE:**
> "Get this to 175°F, homie. No shortcuts."

---

**TOO APOLOGETIC:**
> "Sorry, but this is really important and you need to pay attention to it."

**HOMIE VOICE:**
> "This step is fucking important—don't space out now."

---

**CORPORATE MANUAL:**
> "Monitor the temperature carefully to prevent overcooking."

**HOMIE VOICE:**
> "Watch this like a hawk. It goes from perfect to scrambled in about 5 seconds."

---

## AI Assistant Guidelines

### When Working on This Repository

1. **Always read the STYLE_GUIDE.md first** when making content changes
2. **Use exact file paths** when requesting edits: `recipes/08_miso_matcha.md`
3. **Preserve HOMIE voice** in all content modifications
4. **Never add emojis or decorative symbols** under any circumstance
5. **Verify UTF-8 encoding** is correct (no corrupted characters)
6. **Check all required elements** are present before completing edits
7. **Test compilation** after significant changes (optional but recommended)
8. **Write descriptive commit messages** in imperative mood
9. **Run a consistency check when renaming** - When renaming a recipe or any key term, ALWAYS grep the entire repo for the old name before committing. Recipe names appear in multiple places: the recipe file itself, `front_matter/07_the_flavors.md`, `STYLE_GUIDE.md`, `CLAUDE.md`, and possibly other documentation. Use `grep -r "OldName" .` to find all references.
10. **Open a pull request as the final step** — after pushing to the branch, open a PR. PR title should match or clearly refine the issue title. PR body must include `Closes #<number>` so merge closes the issue, plus a short summary of what changed and why. Do not merge the PR yourself; auto-merge is configured and will handle it once checks pass.

### Content Modification Rules

**DO:**
- DO: Maintain conversational, casual tone
- DO: Include 3-5 strategic profanities per recipe
- DO: Use "homie/dude/chief/buddy" 2-4 times per recipe
- DO: Provide cultural context for international recipes
- DO: Explain techniques with teaching moments (2-4 per recipe)
- DO: Use ranges for measurements ("3-4 egg yolks")
- DO: Describe churning by doneness, never estimate time
- DO: Include allergen notes for nuts/wheat/soy (NOT milk/eggs)

**DON'T:**
- DON'T: Add emojis, symbols, or decorative Unicode
- DON'T: Use nationalities in recipe titles
- DON'T: Estimate churn times ("20-25 minutes")
- DON'T: Say "according to your ice cream maker's instructions"
- DON'T: Skip difficulty rating explanation
- DON'T: Skip total time parenthetical
- DON'T: Omit "What it Tastes Like" final note
- DON'T: Over-explain basic custard technique (reference fundamentals instead)

### File Editing Protocol

**Before Editing:**
1. Read target file completely
2. Review STYLE_GUIDE.md if content changes involved
3. Understand context and current voice

**During Editing:**
1. Preserve exact formatting structure
2. Maintain UTF-8 encoding
3. Keep HOMIE voice consistent
4. Verify all required elements present

**After Editing:**
1. Scan for non-text characters (emojis, symbols)
2. Check encoding (no corrupted UTF-8)
3. Verify structure matches style guide
4. Confirm voice is consistent
5. Test compilation if major changes

### Teaching Moments

Every recipe should have **2-4 teaching moments** that explain:

- **Scientific:** Why ingredients work (chemistry, physics)
- **Cultural/Historical:** Origins, significance, traditions
- **Technique Rationale:** Why this method matters
- **Ingredient Deep-Dives:** What it is, why it's special

**Example - Scientific:**
> "Browning butter—beurre noisette if you want to be fancy about it—transforms it from sweet-cream richness to deep, nutty, almost hazelnut-like complexity. The milk solids caramelize, creating literally HUNDREDS of new flavor compounds."

**Example - Cultural:**
> "Kulfi dates back to the Mughal era in 16th-century India. The word 'kulfi' comes from the Persian 'qulfi' meaning 'covered cup'—it was traditionally frozen in metal cones packed in ice and salt."

**Where Teaching Moments Go:**
- Opening paragraphs (brief context)
- Instructions (quick technique explanations)
- **Notes section** (detailed deep-dives - primary home)

---

## Common Tasks & Commands

### Edit a Recipe

```bash
# 1. Read the file
Read recipes/##_recipe_name.md

# 2. Make changes (follow STYLE_GUIDE.md)

# 3. Save file

# 4. Commit
git add recipes/##_recipe_name.md
git commit -m "Descriptive message about changes"
git push -u origin <branch-name>
```

### Add a New Recipe

```bash
# 1. Create file with proper numbering
Write recipes/##_new_recipe.md

# 2. Follow recipe structure exactly (see STYLE_GUIDE.md)

# 3. Verify all required elements present

# 4. Test compilation
python compile_book.py

# 5. Commit
git add recipes/##_new_recipe.md
git add Ice_Cream_to_Fight_With_COMPLETE.md
git commit -m "Add new recipe: [recipe name]"
git push -u origin <branch-name>
```

### Modify Front Matter

```bash
# 1. Read target file
Read front_matter/##_section_name.md

# 2. Make changes (maintain voice consistency)

# 3. Save file

# 4. Test compilation
python compile_book.py

# 5. Commit
git add front_matter/##_section_name.md
git add Ice_Cream_to_Fight_With_COMPLETE.md
git commit -m "Update [section name]"
git push -u origin <branch-name>
```

### Recompile Book

```bash
# Python (preferred)
python compile_book.py

# Bash (alternative)
chmod +x compile_book.sh
./compile_book.sh

# Verify output
ls -lh Ice_Cream_to_Fight_With_COMPLETE.md

# Commit if satisfied
git add Ice_Cream_to_Fight_With_COMPLETE.md
git commit -m "Recompile book with latest changes"
git push -u origin <branch-name>
```

### Fix Encoding Issues

```bash
# Scan for corrupted characters
grep -r "â€"" recipes/
grep -r "Ã©" recipes/

# Fix in individual files
# Replace â€" with —
# Replace Ã© with proper UTF-8 é

# Verify UTF-8 encoding
file recipes/*.md
# Should show: UTF-8 Unicode text
```

---

## Quality Assurance Checklist

### Pre-Commit Review Process

When reviewing a recipe before committing, check in this order:

1. **Non-text characters:**
   - [ ] Scan entire recipe for emojis
   - [ ] Check for symbols (✓, →, •)
   - [ ] Look for decorative Unicode
   - [ ] **Action:** MUST be removed immediately

2. **Encoding:**
   - [ ] Scan for corrupted characters (`â€"`, `Ã©`, etc.)
   - [ ] Verify proper UTF-8 for accents and foreign characters
   - [ ] **Action:** Fix all corrupted encoding

3. **Structure:**
   - [ ] Difficulty explanation present and uses HOMIE voice
   - [ ] Total time with parenthetical present
   - [ ] All required sections included
   - [ ] Bold headers in Ingredients and Instructions
   - [ ] "What it Tastes Like" as final note

4. **Allergens:**
   - [ ] Nuts/wheat/soy noted if present
   - [ ] NOT noting milk/eggs (this is ice cream)
   - [ ] Vegan recipes called out

5. **Voice:**
   - [ ] Count profanity (3-5 instances?)
   - [ ] "homie/dude/pal" usage (2-4 times?)
   - [ ] Conversational tone throughout
   - [ ] Self-deprecating but encouraging
   - [ ] Technical accuracy maintained

6. **Cultural depth:**
   - [ ] International recipes have substantive cultural context
   - [ ] Origins and significance explained
   - [ ] Honest about adaptations
   - [ ] Ethical sourcing guidance if relevant

7. **Teaching moments:**
   - [ ] 2-4 present throughout recipe
   - [ ] Good depth and educational value
   - [ ] Mix of scientific, cultural, technique rationale
   - [ ] Primarily in Notes section

8. **Technical clarity:**
   - [ ] Temperatures specified (°F)
   - [ ] Ranges provided ("3-4 egg yolks")
   - [ ] Visual cues included
   - [ ] Churning described by doneness (not time)
   - [ ] No phrase "according to your ice cream maker's instructions"

9. **Notes completeness:**
   - [ ] Sourcing guidance (if specialty ingredients)
   - [ ] Technique deep-dives (if complex methods)
   - [ ] Cultural context (if international)
   - [ ] Make-ahead guidance (if multi-component)
   - [ ] "What it Tastes Like" (ALWAYS final note)

### Master Reference Recipes

When unsure about structure or voice, reference these exemplar recipes:

- **Overall structure and voice:** Recipe 13 (Atole de Anis)
- **Cultural depth:** Recipe 07 (Wattleseed & Macadamia), Recipe 03 (Cardamom-Pistachio Kulfi)
- **Teaching moments:** Recipe 17 (Brown Butter Pecan)
- **Complex recipe management:** Recipe 27 (New Orleans Chicory Coffee & Beignet)
- **Egg-free recipes:** Recipe 03 (Cardamom-Pistachio Kulfi), Recipe 02 (Sinh Tố Bơ)

---

## Technical Specifications

### File Format

- **Format:** Markdown (GitHub-flavored)
- **Extension:** `.md`
- **Encoding:** UTF-8
- **Line endings:** Unix (LF)
- **Character limit per line:** None (but keep readable)

### Measurements & Units

- **System:** US customary (cups, tablespoons, teaspoons)
- **Temperature:** Fahrenheit (°F with proper UTF-8 degree symbol)
- **Weight:** Pounds/ounces for produce context
- **Precision:** Ranges preferred ("3-4 egg yolks" not "3.5 yolks")

### Temperature Guidelines

| Type | Temperature | Notes |
|------|-------------|-------|
| Standard custard | 170-175°F | Sometimes noted as "to 175°F" |
| Light custard | 170-175°F | Emphasize lighter than usual |
| Caramel | Visual (deep amber, copper penny) | Visual beats temp |
| Soft ball stage | 240°F | Include visual cues too |
| Frying | Specific (e.g., 360°F for beignets) | Precision matters |

**Rule:** Provide temperature when precision matters, visual cues when appearance is more reliable.

### Churning Guidance (CRITICAL)

**DO NOT:**
- DON'T: Estimate churn times ("20-25 minutes")
- DON'T: Use phrase "according to your ice cream maker's instructions"

**DO:**
- DO: Describe doneness: "until soft-serve consistency"
- DO: Provide visual cues: "should look thick and pale cream-colored"
- DO: Note variations: "May take longer than usual due to fruit content"
- DO: Give context: "The ricotta makes this denser than standard custard"

**Why:** Equipment varies too widely. Readers need visual/textural cues, not time estimates that will be wrong.

### Version Control

- **Git:** Standard git repository
- **Remote:** `http://local_proxy@127.0.0.1:58280/git/cpitzi/ice-cream-book`
- **Hooks:** None currently configured
- **Branch naming:** `claude/claude-md-*` with session ID
- **Commit style:** Imperative mood, descriptive
- **Line length:** No strict limit (but keep commit messages under 72 chars first line)

### Build System

- **Languages:** Python 3 (preferred), Bash (alternative)
- **Dependencies:** None (standard library only)
- **Build time:** < 1 second (simple concatenation)
- **Output size:** ~345KB (8,200+ lines)
- **Incremental builds:** Not supported (full rebuild each time)
- **Caching:** None

---

## Quick Reference Card

### THE RULES (Essential Checklist)

- **Plain text only** - no emojis, no symbols, no decorative Unicode
- **Proper encoding** - fix corrupted characters on sight
- **NO nationalities in titles** - use regions, cities, or dish names
- **Difficulty + Total Time with HOMIE explanations** - required
- **3-5 strategic profanities** per recipe for emphasis
- **2-4 teaching moments** per recipe
- **Allergens for nuts/wheat/soy only** (not milk/eggs)
- **Cultural context for international recipes** - go deep
- **"What it tastes like" as final note** - always
- **Churning: describe doneness, never estimate time**
- **Voice: conversational, self-deprecating, technically accurate**
- **PR creation is the final step** - after pushing, open a PR with `Closes #<number>` in the body; do not merge yourself (auto-merge handles it)

### File Paths Quick Reference

```
front_matter/##_section_name.md    - Intro, TOC, philosophy, fundamentals
recipes/##_recipe_name.md          - Individual recipes
back_matter/99_closing.md          - Closing remarks
STYLE_GUIDE.md                     - Comprehensive style documentation
README.md                          - Workflow guide
compile_book.py                    - Build script (Python)
compile_book.sh                    - Build script (Bash)
```

### Common Commands

```bash
# Read a file
Read recipes/##_recipe_name.md

# Compile book
python compile_book.py

# Commit changes
git add [file]
git commit -m "Descriptive message"
git push -u origin <branch-name>

# Check file encoding
file recipes/*.md

# Search for corrupted encoding
grep -r "â€"" recipes/
```

---

## Additional Resources

- **STYLE_GUIDE.md** - Full style guide (515 lines, authoritative)
- **README.md** - Workflow documentation
- **EXAMPLE_recipe_02_chili_mango.md** - Complete example recipe
- **EXAMPLE_front_matter_01_title_and_intro.md** - Front matter example
- **front_matter/08_custard_fundamentals.md** - Comprehensive custard tutorial

---

## Summary for AI Assistants

This is a **professional cookbook project** with:

1. **Strict style requirements** (read STYLE_GUIDE.md before content changes)
2. **Modular file structure** (edit individual files, not complete book)
3. **Distinctive voice** (HOMIE voice - casual, educational, strategic profanity)
4. **Plain text only** (absolutely NO emojis or decorative Unicode)
5. **Cultural respect** (deep context for international recipes required)
6. **Technical accuracy** (temperatures, measurements, technique explanations)
7. **Educational focus** (2-4 teaching moments per recipe)
8. **Git workflow** (descriptive commits, branch naming conventions)

**Most Important:**
- Always use exact file paths
- Preserve HOMIE voice
- Never add emojis or symbols
- Verify all required elements present
- Test compilation after significant changes
- Write descriptive commit messages

**When in doubt:** Reference STYLE_GUIDE.md or ask for clarification.

---

*This document was created to help AI assistants understand the ice-cream-book repository structure, conventions, and workflows. Last updated by Claude on 2025-11-19.*
