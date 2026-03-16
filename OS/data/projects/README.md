# data/projects/

Active projects with defined end goals. Each project gets its own file or subfolder.

## Projects vs Topics

The key distinction (from the PARA method):

- **Projects** have an end state. They are done when something is shipped, decided, or completed. Example: *"Launch Badi Bakhar v1"*, *"Research options for moving to Pune"*.
- **Topics** are ongoing areas of interest with no finish line. Example: *"economics"*, *"health"*.

If you can't define what "done" looks like, it's a topic, not a project.

## File Naming Convention

Single-file projects:
```
YYYY-MM-DD-project-name.md
```

Multi-file projects (subfolder):
```
projects/project-name/
    README.md
    notes.md
    ...
```

## Frontmatter

```yaml
---
title:
date: YYYY-MM-DD
source: manual
status: active | on-hold | completed | archived
tags: []
---
```

- `status: active` — currently in progress
- `status: on-hold` — paused, revisit later
- `status: completed` — done; keep the file, don't delete
- `status: archived` — abandoned or obsolete

## Notes

Completed projects are not deleted — they become a record of what was done and why. Move the status to `completed` and leave the file in place.
