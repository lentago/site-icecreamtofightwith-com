# ice-cream-book — "Ice Cream to Fight With"

A 28-recipe custard-based ice cream cookbook spanning international cuisines, built as a modular Markdown project and served as content for [icecreamtofightwith.com](https://icecreamtofightwith.com). The book combines sophisticated technique instruction with a distinctive conversational voice — recipes you'll actually want to read, not just follow.

**Authorship:** The recipes, front matter, and build scripts in this repo are co-written with [Claude](https://claude.ai) (Anthropic). I bring the flavor ideas, technique experience, and editorial direction; Claude writes the prose and the code. I'm an infrastructure operator, not a software engineer or a professional writer — please don't read this repo as a portfolio of either coding or authorship.

## Why This Exists

What started as a personal recipe collection became a full cookbook project: 28 recipes developed through iterative design, flavor pairing research, and obsessive attention to technique. Every recipe has been tested, revised, and documented with the kind of detail that actually helps someone make ice cream — not the sanitized, hedge-everything approach of most cookbooks.

The project is also a deliberate exercise in modular content architecture. The book lives as individual Markdown files, compiled on demand, version-controlled with git, and deployed as a static site by an Astro/Nginx app that lives in the same repo. The companion infrastructure repository ([foundry-platform-demo](https://github.com/PitziLabs/foundry-platform-demo)) provides ECR, ECS, ALB, and the IAM trust this repo's deploy workflow assumes via OIDC. No CMS, no database, no proprietary formats — just text files, a build script, and a tiny Astro site.

## What's in the Book

Twenty-eight recipes organized by difficulty, from approachable to genuinely demanding:

**Front Matter:** Introduction, philosophy, a custard fundamentals tutorial, difficulty ratings, and a flavor overview. Nine sections covering everything a reader needs before touching a recipe.

**Recipes:** International flavors spanning kulfi, Vietnamese avocado smoothie ice cream, Sichuan peppercorn plum, wattleseed and macadamia, ube, miso matcha, and more. Each recipe includes cultural context, technique instruction, sourcing guidance, and detailed notes.

**Difficulty System:** Four tiers — CHILL (minimal technique), LEGIT (solid fundamentals needed), THE REAL DEAL (narrow margins for error), and A F█CK█NG ORDEAL (multi-day commitments and professional techniques). Difficulty ratings are honest, not aspirational. (The redaction is load-bearing: the author is job hunting, so profanity here and on [icecreamtofightwith.com](https://icecreamtofightwith.com) has its vowels censored. The book itself remains gloriously uncensored.)

**Voice:** The "HOMIE voice" — casual, educational, self-deprecating, and technically precise. Like a smart friend who's already made all the mistakes teaching you what actually works. Strategic profanity for emphasis, not decoration.

## Repository Structure

```
ice-cream-book/
├── front_matter/                  # Book introduction (9 files)
│   ├── 01_title_and_intro.md
│   ├── ...
│   └── 09_final_thoughts.md
├── recipes/                       # Individual recipes (28 files, YAML frontmatter + prose)
│   ├── 01_coconut_pandan.md
│   ├── ...
│   └── 28_appalachian_pawpaw_maple.md
├── back_matter/
│   └── 99_closing.md
├── illustrations/                 # Per-recipe hero images (one PNG per slug)
├── compile_book.py                # Compiles the book into one Markdown file
├── STYLE_GUIDE.md                 # Editorial conventions + frontmatter schema
├── CLAUDE.md                      # AI assistant development guide
│
│   # Website (Astro static site, served by Nginx on ECS Fargate)
├── src/                           # Astro source: layouts, pages, components, content config
├── sync_recipes.py                # Translates recipes/*.md into Astro content collection
├── astro.config.mjs
├── package.json / package-lock.json
├── Dockerfile                     # Production container — copies dist/ into nginx
├── nginx.conf                     # Port 8080, /health endpoint, clean URLs
├── .github/workflows/deploy.yml   # Build → ECR → ECS, authenticated via OIDC
└── docs/INFRASTRUCTURE_RELATIONSHIP.md  # How this repo lands on icecreamtofightwith.com
```

The book and the website share the same `recipes/` directory as source of truth. `compile_book.py` produces the printable Markdown; `sync_recipes.py` produces the Astro content collection.

## Design Decisions

### Modular File Structure, Not a Single Document

Each recipe, front matter section, and back matter piece lives in its own file. This enables granular version control (diffs show exactly what changed in which recipe), efficient AI-assisted editing (load one 10KB file instead of a 345KB monolith), and flexible reordering (renumber files to rearrange the book). The compiled output is generated on demand, not maintained by hand.

### Plain Text Only — No Emojis, No Decorative Unicode

The number one rule. Emojis corrupt across platforms, display inconsistently, and add nothing to a cookbook that earns its personality through writing, not decoration. Em dashes, degree symbols, and proper UTF-8 accent marks are allowed. Everything else is prohibited.

### Difficulty Ratings Over Skill Levels

Recipes are rated by what they demand, not what the reader brings. CHILL means minimal technique. A F█CK█NG ORDEAL means multi-day commitment with professional techniques. The ratings are honest about what the reader is signing up for, explained in the same conversational voice as the recipes themselves.

### Cultural Context as a Requirement, Not a Garnish

International recipes include substantive cultural context — origins, significance, honest notes about adaptations. This isn't "inspired by" tourism. If a recipe draws from a culinary tradition, the reader should understand what they're working with and where it comes from.

### No Churn Time Estimates

Ice cream maker equipment varies too widely. Every recipe describes churning by doneness ("soft-serve consistency," "thick and holds its shape") rather than minutes. Visual and textural cues are reliable; clock times are not.

### Zero External Dependencies

Both build scripts (Python and Bash) use only standard library tools. No package managers, no build configuration, no version requirements beyond a basic Python 3 or Bash install. The compilation is simple concatenation with separators — it should never break.

## Getting Started

Compile the book with either script:

```bash
python compile_book.py    # Python (preferred)
./compile_book.sh         # Bash (alternative)
```

Output: `Ice_Cream_to_Fight_With_COMPLETE.md`

See [STYLE_GUIDE.md](STYLE_GUIDE.md) for content conventions and [CLAUDE.md](CLAUDE.md) for the full development guide.

## Related Repositories

- [**foundry-platform-demo**](https://github.com/PitziLabs/foundry-platform-demo) — Terraform-managed AWS platform that provides the ECR registry, ECS cluster, ALB, and IAM trust this repo's deploy workflow assumes via OIDC. Pushes to main here trigger `Build & Deploy`, which lands directly on icecreamtofightwith.com.
- [**PitziLabs**](https://github.com/PitziLabs) — GitHub organization housing this and related projects.

## License

MIT License — see [LICENSE](LICENSE).
