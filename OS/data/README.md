# OS/data/

This is the **processed knowledge store** for Badi Bakhar.

Notes live here after being triaged and processed from `inbox/`. Every file in this directory has been reviewed, tagged, and given proper frontmatter. Raw, unprocessed material belongs in `inbox/` — not here.

## Subdirectory Structure

| Directory | Purpose |
|-----------|---------|
| `web/` | Articles, blog posts, and online reads |
| `youtube/` | Video notes, key ideas, timestamps |
| `whatsapp/` | Forwarded messages, group discussions, voice note transcripts |
| `instagram/` | Reels, posts, carousels, educational content |
| `ideas/` | Original thoughts and insights (your own thinking) |
| `people/` | Notes on thinkers, creators, and contacts |
| `topics/` | Structure notes aggregating links on a theme |
| `projects/` | Active projects with defined end goals |

## Frontmatter Schema

Every note should include at minimum:

```yaml
---
title:
date: YYYY-MM-DD
source: web | youtube | whatsapp | instagram | idea
tags: []
---
```

Source-specific fields are documented in each subdirectory's README.
