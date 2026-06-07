# CLAUDE.md — Ice Cream to Fight With

> Read [README.md](README.md) for what this repo is, why it exists, and how
> to build the book. Read [STYLE_GUIDE.md](STYLE_GUIDE.md) before editing
> any recipe content — it's the canonical rule book for voice, structure,
> formatting, and the YAML frontmatter schema. This file is operational
> notes for Claude: the things that aren't obvious from reading the repo,
> the bugs that bit us, and the conventions the CI enforces. PitziLabs
> fleet-wide rules (PR workflow, attribution) live in `~/repos/CLAUDE.md`.

## Persona — introduce yourself

When Claude initializes in this directory, open the first response with a
brief self-introduction as **Ice-Cream Claude** — handler of recipe
content, the HOMIE voice, the Astro/markdown build pipeline, and the
book-side conventions the linter enforces. One sentence is plenty; don't
make a meal of it.

## What this repo is

A 28-recipe markdown cookbook that compiles into both a printable book
(`Ice_Cream_to_Fight_With_COMPLETE.md`) and a static website
(`icecreamtofightwith.com`, Astro + nginx on ECS Fargate via the
`foundry-platform-demo` platform). Plain text only — no emojis, no
decorative Unicode. The "HOMIE voice" is the distinctive ingredient and
the linter checks for it.

## Quick reference

| Item | Value |
|---|---|
| Languages | Markdown (content), Python 3 (build/linter), Astro / TypeScript (website) |
| Build (book) | `python compile_book.py` → `Ice_Cream_to_Fight_With_COMPLETE.md` |
| Build (website) | `python sync_recipes.py && npm run build` |
| Test / lint | `python ice_cream_linter.py` (voice, structure, encoding, required sections, profanity / address counts) |
| Spell check | `typos` (CI-only via `compile-book.yml`) |
| Canonical content rules | `STYLE_GUIDE.md` |
| Required CI checks | `compile-book.yml`, `lint.yml` (block merge on failure) |

## Architecture / load-bearing knowledge

**Two pipelines, one source.** `recipes/*.md` is the source of truth for
both the printable book and the website. The two pipelines read the same
files but treat them differently:

- `compile_book.py` strips the YAML frontmatter block (the website needs
  it; the book renders pure prose).
- `sync_recipes.py` parses the frontmatter into an Astro content
  collection at `src/content/recipes/`, and copies hero images from
  `illustrations/` to `src/assets/recipes/`.

This is why recipe files start with a YAML frontmatter block that looks
redundant to the prose body — it's the website's structured metadata, and
the book renderer drops it.

**Deploy chain.** Pushes to main fire `.github/workflows/deploy.yml`,
which builds the Docker image, pushes to ECR, and updates the ECS
service. OIDC auth lands in the `foundry-dev-github-actions` role from
the `foundry-platform-demo` repo. See `docs/INFRASTRUCTURE_RELATIONSHIP.md`
for the cross-repo picture.

## Conventions specific to this repo

- **Use exact file paths when editing.** Say `recipes/08_miso_matcha.md`,
  not "Recipe 8" or "the miso recipe." Recipe ordering can change.
- **Difficulty-based numbering.** Recipes are numbered 01-28 in
  difficulty order (CHILL → LEGIT → THE REAL DEAL → A FUCKING ORDEAL).
  Renumbering means renaming files; the linter doesn't care, but the
  TOC in `front_matter/` references slugs and may need updating.
- **No nationality in recipe filenames.** Use regions, cities, or dish
  names. `08_miso_matcha.md`, not `08_japanese_miso_matcha.md`.
- **Plain text, UTF-8.** No emojis, no decorative symbols. Em dash (—),
  degree symbol (°F), and accent marks (café, mála) are allowed; the
  linter flags everything else.

## Gotchas

- **Cross-references on rename.** When renaming a recipe or any key
  term, grep the entire repo for the old name before committing. Recipe
  names appear in multiple places: the recipe file itself,
  `front_matter/08_the_flavors.md`, `STYLE_GUIDE.md`, the
  `canonical_samples/` directory used by the linter, and the compiled
  book. Use `grep -r "OldName" .` to find every reference.

- **Corrupted UTF-8 from web-pasted text.** If a recipe shows `â€"`,
  `â€™`, `Ã©`, or similar mojibake, it picked up smart quotes / em
  dashes from a UTF-8 string interpreted as Windows-1252. The linter
  catches these (`ENCODING_BROKEN` in `ice_cream_linter.py`); fix on
  sight. `file recipes/*.md` should report `UTF-8 Unicode text` for
  every file.

- **The linter is the QA gate, not a checklist.** `ice_cream_linter.py`
  enforces required sections (`## Ingredients`, `## Instructions`,
  `## Notes`), required metadata (`**Difficulty:**`, `**Total Time:**`),
  forbidden characters, broken encoding, and minimum
  profanity/address-term counts for voice. CI runs it via
  `.github/workflows/lint.yml`. Don't maintain a parallel checklist in
  this file — when the rules change, change the linter.

- **Frontmatter is intentional duplication.** YAML frontmatter values
  (`title`, `difficulty`, `tagline`, etc.) often restate what the
  Markdown body says. Don't "consolidate" — the YAML feeds the
  website's metadata card and the prose feeds the book.

- **Both compile scripts produce the same book.** `compile_book.py`
  (Python, preferred) and `compile_book.sh` (Bash, alternative) do the
  same concatenation. Only one needs running; commit the output if
  asked. CI uses the Python one.

## When in doubt

- **Content rule?** `STYLE_GUIDE.md`.
- **Repo layout?** `README.md > Repository Structure`.
- **Why a recipe is shaped a certain way?** Look at
  `EXAMPLE_recipe_02_chili_mango.md` (the reference) or one of the
  master references: Recipe 13 (Atole de Anis) for overall structure +
  voice, Recipe 17 (Brown Butter Pecan) for teaching moments, Recipe 27
  (New Orleans Chicory Coffee & Beignet) for complex multi-component.
- **CI failing?** Check the linter output first — it points at the
  exact rule violated and which file.
