# AGENTS.md — Badi Bakhar Knowledge OS

> **Badi Bakhar** (बड़ी बखार) = "Big Family Home" (Bundelkhandi: cluster of houses in a village)
> A personal AI-native knowledge operating system. Every piece of knowledge — a WhatsApp forward, a YouTube video, a web article, an Instagram reel — gets captured, processed, and stored here in your knowledge home.

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
├── opencode.json              ← OpenCode config; Bedrock provider, references AGENTS.md
├── inbox/                     ← TRANSIT ZONE — nothing lives here permanently
│   ├── opencode               ← stub file (see plugin note below)
│   ├── soul                   ← question capture queue (soul = question)
│   └── README.md              ← inbox usage guide
├── HQ/                        ← Mission control — system-level documents
│   ├── MISSION.md             ← Purpose, metaphor, the three laws
│   ├── STATUS.md              ← Current system state (update after each session)
│   ├── CHANGELOG.md           ← Append-only log of all system changes
│   ├── ROADMAP.md             ← Phase-based build plan
│   └── REGISTRY.md            ← Master list of all 30 agents
├── observability/             ← Metrics infrastructure
│   ├── prometheus.yml         ← Prometheus scrape config
│   ├── grafana-dashboard.json ← Grafana dashboard for tool call metrics
│   └── install.sh             ← Setup script for Prometheus + Grafana
├── .opencode/                 ← OpenCode AI configuration layer
│   ├── SOUL.md                ← project scratchpad / session context
│   ├── package.json           ← plugin dependencies
│   ├── agents/                ← 28 agent definition files (ingester, researcher, etc.)
│   ├── commands/              ← 3 custom commands: /ingest, /ask, /add-source
│   ├── plugins/
│   │   └── toolcallhistory.js ← pushes Prometheus metrics after every tool call
│   └── skills/                ← 4 reusable skill fragments
│       ├── badi-bakhar/       ← master system reference (directory map, naming, rules)
│       ├── bedrock-models/    ← Bedrock model IDs and selection guidance
│       ├── frontmatter/       ← frontmatter schema with examples by source type
│       └── inbox-workflow/    ← step-by-step inbox processing procedure
└── OS/                        ← The knowledge operating system
    ├── data/                  ← Processed, indexed knowledge (destination)
    │   ├── web/               ← Web article notes
    │   ├── youtube/           ← YouTube video notes
    │   ├── whatsapp/          ← WhatsApp conversation notes
    │   ├── instagram/         ← Instagram reel/post notes
    │   ├── ideas/             ← Original thoughts and insights
    │   ├── people/            ← Notes on people
    │   ├── topics/            ← Structure notes aggregating links on a theme
    │   ├── projects/          ← Active projects with defined end goals
    │   ├── soul/              ← Processed questions from inbox/soul
    │   └── agent-workspaces/  ← Scratch space for multi-step agent work
    └── sources/               ← Source REGISTRY (metadata, not content)
        ├── index.md           ← YAML list of all registered sources
        ├── program.md         ← Source schema definition
        ├── instagram          ← Instagram source record
        ├── web                ← Web source record
        ├── whatapp            ← WhatsApp source record (note: no 's')
        └── youtube            ← YouTube source record
```

### Directory Roles — Quick Reference

| Path | Role | Permanent? |
|------|------|------------|
| `inbox/` | Transit zone for new captures | No |
| `inbox/opencode` | Stub file — do not edit | System file |
| `inbox/soul` | Question queue | Until processed |
| `HQ/` | Mission control docs | Yes |
| `observability/` | Prometheus + Grafana metrics config | Yes |
| `OS/data/` | Final home for processed knowledge | Yes |
| `OS/sources/` | Source metadata registry | Yes |
| `.opencode/agents/` | 28 agent definition files | Yes |
| `.opencode/commands/` | 3 custom commands | Yes |
| `.opencode/skills/` | 4 reusable skill fragments | Yes |
| `.opencode/plugins/` | Prometheus metrics plugin | Yes |

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
- "सवाल" → `soul`
- "बड़ी बखार" → `badi-bakhar`

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
| **Soul** | A question to investigate | `OS/data/soul/` |
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
- `inbox/soul` contains question captures — route to `OS/data/soul/`
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
| `opencode` | plugin | Tool call metrics → Prometheus Pushgateway |
| `web` | web | General internet articles, blog posts, documentation |
| `youtube` | youtube | Educational videos, talks, lectures |
| `whatsapp` | whatsapp | Family/community group conversations and forwards |
| `instagram` | instagram | Reels, carousels, educational creator content |
| `paperclip` | web | AI agent orchestration patterns (github.com/paperclipai) |
| `openfang` | web | Rust-based agent OS with WhatsApp channel support |

---

## 8. Plugin Awareness — `inbox/opencode` and Observability

The file `.opencode/plugins/toolcallhistory.js` fires after **every tool call** in any OpenCode session. It pushes four Prometheus metrics to a Pushgateway at `localhost:9091`:

| Metric | Type | Description |
|--------|------|-------------|
| `toolcall_total` | counter | Tool calls per tool name, session, parent session |
| `toolcall_output_bytes` | gauge | Output size per tool call |
| `subagent_spawned_total` | counter | Subagent Task invocations per parent session + agent type |
| `subagent_duration_seconds` | gauge | Wall-clock duration of each subagent session |

The Grafana dashboard is at `observability/grafana-dashboard.json`. Prometheus config at `observability/prometheus.yml`. Setup script at `observability/install.sh`.

The file `inbox/opencode` is a **stub** — it contains only a `##toolcallhistory` header line. It is not actively written by the plugin (metrics go to Pushgateway instead).

### What this means for AI behavior:

- **NEVER overwrite, truncate, or edit `inbox/opencode`**
- **NEVER include it in inbox processing**
- For session history, check the Prometheus/Grafana metrics stack if running, or rely on session context within the current chat

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

This is your knowledge home — it grows organically, piece by piece, as you capture and process. Patience is part of the design.

---

*Last updated: 2026-03-17 — Agent 1 (architect); revised 2026-03-17 — system sync (directory map, plugin, skills, source registry)*
