# How This Book Becomes a Website

This document describes how `ice-cream-book` reaches **icecreamtofightwith.com**, and how this repo relates to its companion infrastructure repo, [`PitziLabs/foundry-platform-demo`](https://github.com/PitziLabs/foundry-platform-demo).

Before May 2026, the Astro application source and the deploy workflow lived in `foundry-platform-demo/app/`, and this repo fired a cross-repo `repository_dispatch` event when recipes changed. Issue [foundry-platform-demo#55](https://github.com/PitziLabs/foundry-platform-demo/issues/55) split that arrangement: the application now lives here alongside the content it serves; the foundry repo provides infrastructure (ECR, ECS, ALB, IAM trust) and nothing else.

## This Repo's Two Build Pipelines

Both pipelines read `recipes/*.md` as their source of truth. They produce different artifacts.

### Book pipeline

```
recipes/*.md + front_matter/ + back_matter/
        │
        ▼
   compile_book.py        ← strips the YAML frontmatter block,
        │                   concatenates with --- separators
        ▼
Ice_Cream_to_Fight_With_COMPLETE.md
```

This is the printable/portable Markdown book. The compile script lives at the repo root; CI runs it on every PR via `.github/workflows/compile-book.yml`.

### Website pipeline

```
recipes/*.md + illustrations/
        │
        ▼
   sync_recipes.py        ← parses YAML frontmatter + the
        │                   **Difficulty:** / **Total Time:** prose lines,
        ▼                   emits Astro content collection files
src/content/recipes/*.md (gitignored — regenerated on every build)
        │
        ▼
   npx astro build
        │
        ▼
dist/ (static HTML + assets, gitignored)
        │
        ▼
   docker build → push to ECR → ECS rolls new tasks
        │
        ▼
icecreamtofightwith.com
```

This is what `.github/workflows/deploy.yml` runs on every push to `main`.

## What the Foundry Platform Provides

| Resource | What this repo uses it for |
|---|---|
| ECR repository `foundry-dev-app` | Tag target for `docker push` |
| ECS cluster `foundry-dev-cluster` + service `foundry-dev-app` | Where the container actually runs |
| IAM role `foundry-dev-github-actions` | Assumed via OIDC from this repo's `Build & Deploy` workflow; grants ECR push + ECS update permissions |
| ALB + Route 53 + ACM certificate | HTTPS termination, DNS, TLS. Health check probes `/health:8080` |

The IAM role's trust policy is scoped to `repo:PitziLabs/ice-cream-book:*` — only workflows from this repo can assume it. The foundry repo holds the Terraform that creates and maintains the role; this repo holds the workflow that uses it.

No stored AWS credentials in GitHub Secrets. Every deploy run gets fresh short-lived credentials via the OIDC JWT exchange.

## The Recipe Frontmatter Schema

Each recipe file in `recipes/` begins with a YAML frontmatter block:

```yaml
---
cuisine: "Vietnamese"
active_time_minutes: 20
total_time_minutes_min: 360
total_time_minutes_max: 480
yield: "About 1.5 quarts"
dietary:
  - egg-free
  - contains-nuts
---
```

`compile_book.py` strips this block before assembling the book — readers see only prose. `sync_recipes.py` parses it and emits the values into the Astro content collection so the website's `RecipeMeta` component can render the cuisine, time, yield, and dietary chips.

The canonical schema and allowed `dietary` tags are documented in [`STYLE_GUIDE.md`](../STYLE_GUIDE.md).

## What Changes Here Affect

| Change | Effect on the book | Effect on the website |
|---|---|---|
| Edit recipe body prose | Next compile picks it up | Next deploy picks it up |
| Edit YAML frontmatter | No effect (stripped) | Metadata card updates on next deploy |
| Add a recipe `.md` file | New section in the book | New page at `/recipes/<slug>/` |
| Rename a recipe file | Section order may shift | URL slug changes — old URL 404s (no redirects yet) |
| Edit `src/`, `Dockerfile`, `nginx.conf` | No effect | Container behavior changes on next deploy |
| Edit `compile_book.py` | Book output may differ | No effect |

## Local Development

Book only (no Node or Docker needed):

```bash
python3 compile_book.py
```

Website preview:

```bash
npm ci
python3 sync_recipes.py
npx astro dev   # http://localhost:4321
```

Or build the production image locally to verify the deploy pipeline before pushing:

```bash
npx astro build
docker build -t ice-cream-test .
docker run --rm -p 8080:8080 ice-cream-test
curl -sI http://localhost:8080/health   # expect 200
```
