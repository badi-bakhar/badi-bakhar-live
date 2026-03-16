---
description: Register a new knowledge source: /add-source <name>
agent: build
---

Register a new knowledge source. The source name provided is: $ARGUMENTS

## Step 1 — Read the schema

Read `OS/sources/program.md` to confirm the current source schema before proceeding.

## Step 2 — Gather information

Ask the user for the following fields (all required):

1. **name** — identifier for this source (use "$ARGUMENTS" as the default if it looks right, confirm with user)
2. **when** — date this source was added (`YYYY-MM-DD`)
3. **why** — reason for adding this source (what problem does it solve?)
4. **type** — one of: `plugin`, `feed`, `manual`, `api`, `export`
5. **url** — path or URL to the source (can be a local path or external URL)
6. **description** — what this source provides and how it feeds into the knowledge base

Present a summary of the collected info and ask: "Does this look correct? Reply 'yes' to create the files."

**Do not create any files until the user confirms.**

## Step 3 — Create the source file

After confirmation:

Create `OS/sources/<name>` (no extension, matching the existing source file naming pattern in that directory) with the YAML entry:

```yaml
- name: <name>
  when: <YYYY-MM-DD>
  why: <why>
  type: <type>
  url: <url>
  description: <description>
```

If the file already exists, read it first and append the new entry rather than overwriting.

## Step 4 — Update the index

Read `OS/sources/index.md` and append the new source entry to the YAML list in that file, following the same format as existing entries.

## Step 5 — Confirm completion

Report what was done:

```
Created: OS/sources/<name>
Updated: OS/sources/index.md
Source "<name>" is now registered.
```

If anything already existed (e.g., the source file was pre-existing), note that clearly.
