---
description: Process all unprocessed files in inbox/
agent: build
---

Process the inbox. Follow these steps exactly:

## Step 1 — Scan inbox/

List all files in `inbox/`. Skip `inbox/opencode` entirely — never read, move, or modify it. Also skip `inbox/soul` for now unless it has unprocessed entries.

For every other file, read its content and check for frontmatter. Files with `status: raw`, `status: open`, or no frontmatter at all are candidates for processing.

## Step 2 — Classify each file

For each candidate file, determine:

1. **Type**: Is it a reference (knowledge to keep), an action/project (something to do), a soul (a question to investigate), or discard (noise/duplicate/expired)?
2. **Destination**:
   - Reference → `OS/data/` (create a subdirectory if a clear category warrants one)
   - Action/Project → `OS/data/projects/`
   - Soul → `OS/data/soul/`
   - Discard → stay in inbox, set `status: archived`
   - Uncertain → stay in inbox, set `status: needs-review`

## Step 3 — Prepare a processing plan

For each file, produce a summary block like this:

```
FILE: inbox/<filename>
SUMMARY: <2-3 sentence summary of the content>
TYPE: reference | action | soul | discard | uncertain
PROPOSED DESTINATION: OS/data/<path>/<new-filename>.md
PROPOSED FILENAME: YYYY-MM-DD-ascii-lowercase-slug.md
PROPOSED FRONTMATTER:
  title: "..."
  date: YYYY-MM-DD
  source: web | youtube | whatsapp | instagram | manual
  status: processed
  lang: en | hi | hi-en | ur | mixed
  tags: [...]
REASON: <why this destination and classification>
```

Follow filename rules: ASCII/Latin only, lowercase, hyphenated, no special characters, date-prefixed. If the title is in Hindi/Urdu, romanize it for the filename.

## Step 4 — Ask for confirmation

Present the full processing plan to the user. Ask: "Confirm these moves? Reply 'yes' to proceed, or tell me what to change."

**Do not move or modify any file until the user confirms.**

## Step 5 — Execute after confirmation

Once the user confirms:
1. Create the destination file with updated frontmatter and original content preserved (do not translate or edit the body)
2. Set `status: processed` in the frontmatter
3. Delete the original from inbox/ only after the destination file is successfully written
4. Report each completed move

Preserve original note body language exactly. Do not translate content. Do not over-annotate.
