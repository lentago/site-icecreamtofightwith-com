# ice-cream-book

A professionally-written ice cream cookbook featuring 27 original custard-based recipes spanning international cuisines, built as a modular Markdown project and served as content for [icecreamtofightwith.com](https://icecreamtofightwith.com). The book combines sophisticated technique instruction with a distinctive conversational voice — recipes you'll actually want to read, not just follow.

## Why This Exists

Written by Chris Pitzi with Claude (Anthropic). What started as a personal recipe collection became a full cookbook project: 27 original recipes developed through iterative design, flavor pairing research, and obsessive attention to technique. Every recipe has been tested, revised, and documented with the kind of detail that actually helps someone make ice cream — not the sanitized, hedge-everything approach of most cookbooks.

The project is also a deliberate exercise in modular content architecture. The book lives as individual Markdown files, compiled on demand, version-controlled with git, and deployed as a static site through the companion infrastructure repository. No CMS, no database, no proprietary formats — just text files and a build script.

## What's in the Book

Twenty-seven recipes organized by difficulty, from approachable to genuinely demanding:

**Front Matter:** Introduction, philosophy, a custard fundamentals tutorial, difficulty ratings, and a flavor overview. Nine sections covering everything a reader needs before touching a recipe.

**Recipes:** International flavors spanning kulfi, Vietnamese avocado smoothie ice cream, Sichuan peppercorn plum, wattleseed and macadamia, ube, miso matcha, and more. Each recipe includes cultural context, technique instruction, sourcing guidance, and detailed notes.

**Difficulty System:** Four tiers — CHILL (minimal technique), LEGIT (solid fundamentals needed), THE REAL DEAL (narrow margins for error), and A FUCKING ORDEAL (multi-day commitments and professional techniques). Difficulty ratings are honest, not aspirational.

**Voice:** The "HOMIE voice" — casual, educational, self-deprecating, and technically precise. Like a smart friend who's already made all the mistakes teaching you what actually works. Strategic profanity for emphasis, not decoration.

## Repository Structure

```
ice-cream-book/
├── front_matter/                  # Book introduction (9 files)
│   ├── 01_title_and_intro.md
│   ├── 02_table_of_contents.md
│   ├── 03_what_makes_different.md
│   ├── 04_philosophy.md
│   ├── 05_how_to_use.md
│   ├── 06_difficulty_ratings.md
│   ├── 07_the_flavors.md
│   ├── 08_custard_fundamentals.md
│   └── 09_final_thoughts.md
├── recipes/                       # Individual recipes (27 files)
│   ├── 01_cardamom_pistachio_kulfi.md
│   ├── 02_sinh_to_bo.md
│   ├── ...
│   └── 27_new_orleans_chicory_beignet.md
├── back_matter/
│   └── 99_closing.md             # Closing remarks
├── compile_book.py                # Python compilation script
├── compile_book.sh                # Bash compilation script
├── STYLE_GUIDE.md                 # Comprehensive style guide
├── CLAUDE.md                      # AI assistant development guide
└── docs/
    └── ...                        # Additional documentation
```

## Design Decisions

### Modular File Structure, Not a Single Document

Each recipe, front matter section, and back matter piece lives in its own file. This enables granular version control (diffs show exactly what changed in which recipe), efficient AI-assisted editing (load one 10KB file instead of a 345KB monolith), and flexible reordering (renumber files to rearrange the book). The compiled output is generated on demand, not maintained by hand.

### Plain Text Only — No Emojis, No Decorative Unicode

The number one rule. Emojis corrupt across platforms, display inconsistently, and add nothing to a cookbook that earns its personality through writing, not decoration. Em dashes, degree symbols, and proper UTF-8 accent marks are allowed. Everything else is prohibited.

### Difficulty Ratings Over Skill Levels

Recipes are rated by what they demand, not what the reader brings. CHILL means minimal technique. A FUCKING ORDEAL means multi-day commitment with professional techniques. The ratings are honest about what the reader is signing up for, explained in the same conversational voice as the recipes themselves.

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

- [**foundry-platform-demo**](https://github.com/PitziLabs/foundry-platform-demo) — Terraform-managed AWS infrastructure that hosts this content at icecreamtofightwith.com. Pushes to main here trigger cross-repo dispatch to deploy.
- [**PitziLabs**](https://github.com/PitziLabs) — GitHub organization housing this and related projects.

## License

MIT License — see [LICENSE](LICENSE).
