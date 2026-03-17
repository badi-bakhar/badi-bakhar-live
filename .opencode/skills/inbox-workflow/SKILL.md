---
name: inbox-workflow
description: "Step-by-step inbox processing procedure — how to triage, classify, and route inbox captures"
---

# Inbox Processing Workflow

## The 5 File Types

| Type | Criteria | Destination |
|------|----------|-------------|
| **Reference** | Knowledge to keep and query later | `OS/data/` |
| **Action** | A task, project, or thing to do | `OS/data/projects/` |
| **Soal** | A question to investigate | `OS/data/soal/` |
| **Discard** | Noise, duplicates, expired content | Set `status: archived`, leave in inbox |
| **Uncertain** | Can't decide | Leave in `inbox/`, set `status: needs-review` |

## Classification Decision Tree

```
Is it a question to investigate?
  → Yes: Soal → OS/data/soal/

Is it a task or project?
  → Yes: Action → OS/data/projects/

Is it clearly noise, duplicate, or expired?
  → Yes: Discard → status: archived

Is it knowledge worth keeping?
  → Yes: Reference → OS/data/

Still unsure?
  → Uncertain → leave in inbox/, status: needs-review
```

## Step-by-Step Procedure

1. **Scan** — list all files in `inbox/` excluding `inbox/opencode`
2. **Read** — read each file's content and any existing frontmatter
3. **Classify** — apply the decision tree above to determine type
4. **Prepare frontmatter** — draft updated frontmatter:
   - Set `title`, `date`, `source`, `lang`, `tags`
   - Set `status: processed` (or `needs-review` if uncertain)
5. **Determine destination** — resolve exact target path in `OS/data/`
6. **Confirm with user** — always show before moving:
   - Current path
   - Proposed destination
   - Proposed frontmatter (full block)
7. **Move** — only after explicit user confirmation

## Destination Paths

| Type | Path pattern |
|------|--------------|
| Reference (general) | `OS/data/YYYY-MM-DD-slug.md` |
| Reference (by topic) | `OS/data/<topic>/YYYY-MM-DD-slug.md` if directory exists |
| Action / Project | `OS/data/projects/YYYY-MM-DD-slug.md` |
| Soal | `OS/data/soal/YYYY-MM-DD-slug.md` |

Create subdirectories under `OS/data/` only if a category already has enough notes — do not speculate structure.

## Confirmation Protocol

Always present this block before moving any file:

```
Current:   inbox/filename
Proposed:  OS/data/destination/YYYY-MM-DD-slug.md

Frontmatter:
---
title: "..."
date: YYYY-MM-DD
source: ...
status: processed
lang: ...
tags: [...]
---

Proceed?
```

## Special Cases

| Case | Handling |
|------|----------|
| Voice note transcript | Treat as whatsapp or manual; preserve transcript verbatim |
| URL only, no content | Set `status: needs-review`; note that content needs fetching |
| Image description | Source = `instagram` or `whatsapp` as appropriate; describe in body |
| Multi-language content | Use `lang: mixed`; preserve all languages in body |
| Soal already in `inbox/soal` | Route directly to `OS/data/soal/` — same workflow applies |

## Files That Must Never Be Touched

- **`inbox/opencode`** — append-only AI tool call log; skip entirely during processing
- Never delete any file — use `status: archived` for discards
- When uncertain, always leave in inbox and flag `needs-review` rather than guessing
