# data/whatsapp/

WhatsApp-sourced knowledge — forwarded messages, group discussions, and voice note transcripts.

## File Naming Convention

```
YYYY-MM-DD-slug.md
```

Example: `2026-03-17-budget-session-highlights.md`

## Frontmatter

```yaml
---
title:
date: YYYY-MM-DD
source: whatsapp
group:
reliability: high | medium | low
tags: []
summary:
---
```

- `reliability` is required. WhatsApp forwards are frequently unverified, misleading, or out of context. Default to `low` unless you have independently verified the claim.
- `group` is optional — note the group or contact the message came from if relevant.

## Reliability Guide

| Level | Meaning |
|-------|---------|
| `high` | Verified against a primary or trusted secondary source |
| `medium` | Plausible, from a known person, not yet fully verified |
| `low` | Unverified forward, unknown origin, treat with skepticism |

Always cross-reference important claims from WhatsApp before acting on them or linking them in other notes.
