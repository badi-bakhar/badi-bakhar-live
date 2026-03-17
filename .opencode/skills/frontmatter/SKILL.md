---
name: frontmatter
description: "Complete frontmatter schema with valid values, defaults, and examples for all source types"
---

# Frontmatter Schema Reference

## Field Definitions

| Field | Type | Required | Allowed Values | Default |
|-------|------|----------|----------------|---------|
| `title` | string | yes | Any language | — |
| `date` | `YYYY-MM-DD` | yes | ISO date | — |
| `source` | enum | yes | `web`, `youtube`, `whatsapp`, `instagram`, `manual` | — |
| `status` | enum | yes | `raw`, `processed`, `linked`, `evergreen`, `archived`, `needs-review` | `raw` |
| `lang` | enum | yes | `en`, `hi`, `hi-en`, `ur`, `mixed` | `en` |
| `tags` | string[] | no | English or romanized Hindi | `[]` |

## Examples by Source Type

**web**
```yaml
---
title: "How React Server Components Work"
date: 2026-03-17
source: web
status: raw
lang: en
tags: [react, web-dev, frontend]
---
```

**youtube**
```yaml
---
title: "MIT 6.006 Lecture 1 — Algorithmic Thinking"
date: 2026-03-17
source: youtube
status: raw
lang: en
tags: [algorithms, mit, computer-science]
---
```

**whatsapp**
```yaml
---
title: "Forward: Ayurveda tips for immunity"
date: 2026-03-17
source: whatsapp
status: raw
lang: hi-en
tags: [health, ayurveda, forward]
---
```

**instagram**
```yaml
---
title: "Reel: stoic quotes on patience"
date: 2026-03-17
source: instagram
status: raw
lang: en
tags: [stoicism, quotes, mindset]
---
```

**manual**
```yaml
---
title: "Chai pe baithke socha — March 17"
date: 2026-03-17
source: manual
status: raw
lang: hi-en
tags: [reflection, journal]
---
```

## Language Values — Distinctions

| Value | When to use |
|-------|-------------|
| `en` | Body is entirely in English |
| `hi` | Body is in Hindi (Devanagari or Roman) |
| `hi-en` | Code-switched Hinglish — Hindi and English mixed naturally |
| `ur` | Body is primarily in Urdu |
| `mixed` | Multiple languages without a single dominant one |

For notes with some incidental English words in an otherwise Hindi note, use `hi`. Use `mixed` only when no language dominates.

## Common Mistakes to Avoid

- **Devanagari in tags** — wrong: `tags: [चाय]` → correct: `tags: [chai]`
- **Wrong status values** — only use the 6 defined values; never invent new ones
- **Missing date** — always required; use capture date, not processing date
- **Translating the body** — never translate note bodies; preserve original language
- **Urdu script in filenames** — `سوال` in a filename is wrong; use `soul`
- **`source: manual` for forwards** — WhatsApp forwards are `source: whatsapp` even if typed manually
