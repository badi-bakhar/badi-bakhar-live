---
description: Search the knowledge base for $ARGUMENTS
agent: build
---

Search the knowledge base for: $ARGUMENTS

## Step 1 — Search OS/data/

Search all files under `OS/data/` for content related to "$ARGUMENTS". Look for:
- Direct mentions of the topic in note bodies
- Related tags in frontmatter
- Titles that match or partially match
- Conceptually related content (not just exact string matches)

## Step 2 — Search OS/sources/index.md

Also read `OS/sources/index.md` and check whether any registered source is likely to contain information about "$ARGUMENTS". Note any relevant sources.

## Step 3 — Return findings

For each relevant file found, provide:

```
FILE: OS/data/<path>/<filename>
TITLE: <title from frontmatter>
DATE: <date from frontmatter>
SOURCE: <source from frontmatter>
RELEVANCE: <1-2 sentences explaining why this file matches>
EXCERPT: <most relevant passage from the note>
```

Then give a brief synthesized answer based only on what the files actually say. Quote or paraphrase directly from the notes — do not add outside knowledge.

## Step 4 — If nothing found

If no relevant files exist in `OS/data/`, say so clearly:

"Nothing found in the knowledge base for: $ARGUMENTS"

Then suggest:
- Which registered source (from `OS/sources/index.md`) might have this information
- Whether this topic should be captured as a soal in `inbox/soal` for future investigation

## Rules

- Only answer from actual files in `OS/data/`. Never fabricate or fill gaps with outside knowledge.
- If the search returns partial or uncertain matches, surface them with a note on confidence level.
- If the query is ambiguous, ask one clarifying question before searching.
