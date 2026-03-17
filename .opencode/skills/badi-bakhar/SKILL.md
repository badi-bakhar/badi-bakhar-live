---
name: badi-bakhar
description: "Master reference for the Badi Bakhar knowledge OS — directory structure, naming conventions, workflow rules"
---

# Badi Bakhar — System Reference

## Directory Map

| Path | Role | Permanent? |
|------|------|------------|
| `inbox/` | Transit zone for new captures | No |
| `inbox/opencode` | AI session tool call log (append-only) | System file — never edit |
| `inbox/soul` | Question capture queue | Until processed |
| `OS/data/` | Final home for processed knowledge | Yes |
| `OS/sources/` | Source metadata registry | Yes |
| `.opencode/` | AI config and plugins | Yes |

## File Naming Convention

Pattern: `YYYY-MM-DD-ascii-lowercase-slug.md`

- Date prefix always `YYYY-MM-DD`
- Slug: ASCII/Latin only — never Devanagari or Urdu script
- All lowercase, words separated by hyphens
- No spaces, no special characters, no underscores
- Extension always `.md`
- Romanize Hindi/Urdu titles: "चाय पानी" → `chai-paani`, "सवाल" → `soul`

## Frontmatter Schema

```yaml
---
title: "Human readable title (any language)"
date: YYYY-MM-DD
source: web | youtube | whatsapp | instagram | manual
status: raw | processed | linked | evergreen
lang: en | hi | hi-en | ur | mixed
tags: []
---
```

| Field | Values | Notes |
|-------|--------|-------|
| `title` | Any string, any language | Human-readable |
| `date` | `YYYY-MM-DD` | Date of capture, not processing |
| `source` | `web`, `youtube`, `whatsapp`, `instagram`, `manual` | Origin |
| `status` | `raw`, `processed`, `linked`, `evergreen` | Default: `raw` |
| `lang` | `en`, `hi`, `hi-en`, `ur`, `mixed` | Primary language of body |
| `tags` | Array of strings | English or romanized Hindi only |

## Status Lifecycle

```
raw → processed → linked → evergreen
                         ↓
                      archived
```

- `raw` — Just captured, not reviewed
- `processed` — Read and categorized
- `linked` — Connected to other notes
- `evergreen` — Stable, long-term reference
- `archived` — Preserved but not active (never delete)
- `needs-review` — Uncertain, awaiting human decision

## Language Rules

| Context | Rule |
|---------|------|
| Filenames | ASCII/Latin only, lowercase, hyphenated |
| Frontmatter keys | Always English |
| Frontmatter values | Always English (`source`, `status`, `lang`, `tags`) |
| Note bodies | Any language freely — preserve original exactly |
| Tags | English or romanized Hindi — no Devanagari script |
| Title field | Any language (human-readable) |

## Inbox Processing Procedure

1. **Scan** — find all files in `inbox/` with `status: raw` or no frontmatter
2. **Classify** — determine type: Reference, Action, Soul, Discard, Uncertain
3. **Prepare** — add/update frontmatter; set `status: processed`
4. **Confirm** — show user: current path, proposed destination, proposed frontmatter
5. **Move** — only after user confirms
6. **Never delete** — use `status: archived` for anything not needed

Skip `inbox/opencode` entirely — it is an append-only system log.

## Core AI Behavior Rules

1. **Never delete files** — archive or set `status: archived`
2. **Never create files outside `inbox/` or `OS/data/`** without explicit instruction
3. **Always confirm before moving files** out of `inbox/`
4. **Preserve original language** in note bodies — do not translate
5. **`inbox/opencode` is untouchable** — never edit, never include in processing

## Source Registry Rules

- `OS/sources/` holds metadata about sources, not content
- Always update `OS/sources/index.md` when registering a new source
- Source files use plain YAML content (no `---` frontmatter delimiters)
- `active: false` retires a source — never delete source records
- `whatapp` file = WhatsApp (note the filename spelling)
