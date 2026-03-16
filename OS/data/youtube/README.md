# data/youtube/

YouTube-sourced knowledge — video notes, key ideas, timestamps, and channel summaries.

## File Naming Convention

```
YYYY-MM-DD-slug.md
```

Example: `2026-03-17-veritasium-entropy-explained.md`

## Frontmatter

```yaml
---
title:
date: YYYY-MM-DD
source: youtube
url:
channel:
duration:
tags: []
summary:
---
```

- `url` should point to the specific video (include timestamp if relevant, e.g. `?t=320`).
- `channel` is the YouTube channel name or handle.
- `duration` is optional but useful for gauging depth (e.g. `1h 12m`).

## Notes

Structure video notes with timestamps where possible:

```
[00:04:30] — Key concept introduced here
[00:18:00] — Counterargument and rebuttal
```

For long-form content, a brief outline at the top helps for quick retrieval.
