# data/topics/

Topic overview notes — structure notes that aggregate links and ideas on a theme.

Think of each file here as a **table of contents for a subject**. It doesn't contain the knowledge itself; it organizes links to where the knowledge lives.

## File Naming Convention

```
YYYY-MM-DD-topic-name.md
```

Example: `2026-03-17-economics.md`

Use the date you first created the topic note.

## Frontmatter

```yaml
---
title:
date: YYYY-MM-DD
source: manual
tags: []
---
```

## Suggested Structure

```markdown
## Overview
One paragraph on what this topic covers and why it matters to you.

## Key Notes
- [[2026-03-17-note-on-inflation]]
- [[2026-03-17-how-central-banks-work]]

## Key People
- [[2026-03-17-john-maynard-keynes]]

## Open Questions
- Things you're still trying to understand
```

## Example Topics

economics, technology, health, culture, language, philosophy, history, urban-planning

## Topics vs Projects

Topics don't end — economics is always a topic. Projects have a defined end goal and a done state. If it has a finish line, it belongs in `projects/`.
