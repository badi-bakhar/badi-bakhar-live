# AGENTS.md — Badi Bakhar Knowledge OS

> **Badi Bakhar** (بڑی بکھار) = "The Great Granary"
> A personal AI-native knowledge operating system. Every piece of knowledge — a WhatsApp forward, a YouTube video, a web article, an Instagram reel — gets harvested, processed, and stored here, like grain brought into a granary.

---

## 1. Identity & Purpose

Badi Bakhar is a **personal knowledge OS** built for one person. It is not a team wiki, not a public database. Its job is to:

- Capture knowledge from multiple sources (WhatsApp, YouTube, Instagram, web, manual notes)
- Process and structure it into a queryable local file-system
- Make it retrievable and linkable over time

The owner writes in **English and Hinglish** (Hindi-English code-switching). Both are first-class languages in note bodies. The system is **build as you go** — intentionally minimal, evolving with actual usage.

---

## 2. Directory Map

```
badi-bakhar/
├── AGENTS.md                  ← YOU ARE HERE — loaded into every AI session
├── opencode.json              ← OpenCode config; references AGENTS.md
├── inbox/                     ← TRANSIT ZONE — nothing lives here permanently
│   ├── opencode               ← AI tool call log (append-only, DO NOT EDIT)
│   └── soal                   ← question capture queue (soal = question)
├── .opencode/                 ← OpenCode AI configuration layer
│   ├── SOAL.md                ← project scratchpad / session context
│   ├── package.json           ← plugin dependencies
│   └── plugins/
│       └── toolcallhistory.js ← logs every tool call to inbox/opencode
└── OS/                        ← The knowledge operating system
    ├── data/                  ← Processed, indexed knowledge (destination)
    └── sources/               ← Source REGISTRY (metadata, not content)
        ├── index.md           ← YAML list of all registered sources
        ├── program.md         ← Source schema definition
        ├── instagram          ← Instagram source record
        ├── web                ← Web source record
        ├── whatapp            ← WhatsApp source record
        └── youtube            ← YouTube source record
```

### Directory Roles — Quick Reference

| Path | Role | Permanent? |
|------|------|------------|
| `inbox/` | Transit zone for new captures | No |
| `inbox/opencode` | AI session tool call log | Append-only system file |
| `inbox/soal` | Question queue | Until processed |
| `OS/data/` | Final home for processed knowledge | Yes |
| `OS/sources/` | Source metadata registry | Yes |
| `.opencode/` | AI config and plugins | Yes |

---

## 3. File Naming Convention

All note files follow this pattern:

```
YYYY-MM-DD-ascii-lowercase-slug.md
```

**Examples:**
```
2026-03-17-react-server-components-overview.md
2026-03-17-chai-paani-conversation-notes.md
2026-03-17-urdu-poetry-faiz-ahmed.md
```

**Rules:**
- Date prefix always in `YYYY-MM-DD` format
- Slug is ASCII/Latin only — **never Devanagari or Urdu script in filenames**
- All lowercase, words separated by hyphens
- No spaces, no special characters, no underscores
- Extension always `.md`

If the title is in Hindi/Urdu, **romanize** it for the filename:
- "चाय पानी" → `chai-paani`
- "سوال" → `soal`
- "بڑی بکھار" → `badi-bakhar`

---

## 4. Frontmatter Schema

Every note file starts with this YAML frontmatter block:

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

### Field Reference

| Field | Values | Notes |
|-------|--------|-------|
| `title` | Any string, any language | Human-readable; can be Hindi, Urdu, Hinglish |
| `date` | `YYYY-MM-DD` | Date of capture, not processing |
| `source` | `web`, `youtube`, `whatsapp`, `instagram`, `manual` | Where it came from |
| `status` | `raw`, `processed`, `linked`, `evergreen` | Processing state (default: `raw`) |
| `lang` | `en`, `hi`, `hi-en`, `ur`, `mixed` | Primary language of note body |
| `tags` | Array of strings | English or romanized Hindi only |

### Status Lifecycle

```
raw → processed → linked → evergreen
              ↓
           archived
```

- `raw` — Just captured, not reviewed
- `processed` — Read and categorized
- `linked` — Connected to other notes
- `evergreen` — Stable, long-term reference
- `archived` — Not needed but preserved (never delete)
- `needs-review` — Uncertain, needs human decision

---

## 5. Language Rules

| Context | Rule |
|---------|------|
| Filenames | ASCII/Latin only, lowercase, hyphenated |
| Frontmatter keys | Always English |
| Frontmatter values | Always English (for `source`, `status`, `lang`, `tags`) |
| Note bodies | Any language freely — English, Hindi, Urdu, Hinglish |
| Tags | English or romanized Hindi — no Devanagari script |
| Title field | Any language (this is human-readable) |

**Never** translate note bodies. Preserve original language exactly as written. A WhatsApp message in Hinglish stays in Hinglish.

---

## 6. Inbox Processing Workflow

When asked to process the inbox, follow these steps:

### Step 1 — Scan
Find all files in `inbox/` that have `status: raw` (or no frontmatter yet).

### Step 2 — Classify each file
Read the content and determine:

| Type | Criteria | Destination |
|------|----------|-------------|
| **Reference** | Knowledge to keep and query later | `OS/data/` |
| **Action** | Something to do, a task or project | `OS/data/projects/` |
| **Soal** | A question to investigate | `OS/data/soal/` |
| **Discard** | Noise, duplicates, expired content | Set `status: archived` |
| **Uncertain** | Can't decide | Leave in `inbox/`, set `status: needs-review` |

### Step 3 — Prepare the file
Before moving:
1. Add or update frontmatter (title, date, source, status, lang, tags)
2. Set `status: processed` (or `linked` if connections are obvious)
3. Confirm the destination path

### Step 4 — Confirm with user
**Always confirm before moving any file out of inbox.** Show:
- Current path
- Proposed destination
- Proposed frontmatter changes

### Step 5 — Move
Only after user confirms. Never delete — use `status: archived` for anything not needed.

### Notes
- `inbox/opencode` is **off-limits** — skip it entirely during processing
- `inbox/soal` contains question captures — route to `OS/data/soal/`
- When uncertain about category: leave in inbox, set `status: needs-review`

---

## 7. Source Registry

`OS/sources/` is a **metadata registry** — it records *what* sources exist and *how* they connect to the system. It is not a content store.

### Schema (from `OS/sources/program.md`)

```yaml
- name: source identifier
  when: YYYY-MM-DD
  why: reason for adding this source
  type: plugin | feed | manual | api | export
  url: path or URL to the source
  description: what this source provides
```

### Rules

- **Always update `OS/sources/index.md`** when a new source is registered
- Each source file in `OS/sources/` (web, youtube, whatapp, instagram) is a stub — fill it in when the source becomes active
- Source files hold metadata about *how* to get content, not the content itself
- The `whatapp` file is WhatsApp (note the filename: `whatapp`, not `whatsapp`)

### Registered Sources

Currently registered in `OS/sources/index.md`:

| Name | Type | Description |
|------|------|-------------|
| `opencode` | plugin | Tool call history logger → `inbox/opencode` |

---

## 8. Plugin Awareness — `inbox/opencode`

The file `inbox/opencode` is written by `.opencode/plugins/toolcallhistory.js`. After **every tool call** in any OpenCode session, the plugin appends one JSON line:

```json
{"time":"2026-03-17T10:00:00.000Z","tool":"read","sessionID":"...","callID":"...","args":{...},"title":"...","output":"...","metadata":{...}}
```

### What this means for AI behavior:

- **This file is the AI's action memory across sessions**
- When asked "what did you do last session?" or "what happened before?" — read `inbox/opencode`
- **NEVER overwrite, truncate, or edit this file**
- **NEVER include it in inbox processing**
- It is append-only and managed entirely by the plugin
- Reading it is safe and encouraged for context

---

## 9. AI Behavior Rules

These rules apply in every session:

### Files
- **Never delete files** — move to archive or set `status: archived`
- **Never create files outside `inbox/` or `OS/data/`** without explicit user instruction
- **Always confirm before moving files** out of `inbox/`
- When uncertain about category: leave in inbox, set `status: needs-review`

### Content
- **Preserve original language** in note bodies — do not translate
- **Romanize** Hindi/Urdu only for filenames and tags, never for content
- Add minimal frontmatter — do not over-annotate

### System Files
- **`inbox/opencode` is untouchable** — append-only system log, never edit
- **`OS/sources/index.md` must be updated** whenever a new source is registered
- **`OS/sources/program.md`** is the schema definition — read it before adding source records

### Uncertainty
- Ask before acting if the user's intent is unclear
- Surface ambiguity rather than guess
- Prefer doing less and confirming over doing more and being wrong

---

## 10. Build As You Go

Badi Bakhar is intentionally minimal. The current structure is a scaffold, not a finished system.

**Principles:**
- Add frontmatter fields only when real usage reveals the need
- Add new `OS/data/` subdirectories only when a category has enough notes to warrant one
- Never create organizational structure speculatively
- The system should feel lighter after each session, not heavier

**What comes next is driven by what actually gets captured.** If WhatsApp is the primary source, the `whatapp` source record gets filled in. If YouTube notes pile up, `OS/data/youtube/` gets created. Not before.

This is a granary — it fills up grain by grain, harvest by harvest. Patience is part of the design.

---

*Last updated: 2026-03-17 — Agent 1 (architect)*
