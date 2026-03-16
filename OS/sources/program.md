# Source Registry Schema

This file defines the schema for all knowledge sources in Badi Bakhar.
Every channel through which knowledge arrives — a YouTube channel, a WhatsApp contact, a website, a plugin —
gets registered here with this schema. Sources are not the content itself; they are the pipes through which
content flows into the granary. Registering a source is a declaration of intent: "knowledge comes from here."

---

## Schema Definition

### `name`
- **Type:** string
- **Required:** yes
- **Description:** Unique identifier for this source. Used as the filename in `OS/sources/` and as the key in `index.md`.
- **Example:** `youtube`

### `when`
- **Type:** date (`YYYY-MM-DD`)
- **Required:** yes
- **Description:** Date this source was registered in the granary.
- **Example:** `2026-03-17`

### `why`
- **Type:** string
- **Required:** yes
- **Description:** The reason this source was added. Captures intent — why does this source matter to the owner?
- **Example:** `Primary source for technical tutorials and lectures`

### `type`
- **Type:** enum
- **Required:** yes
- **Allowed values:** `web` | `youtube` | `whatsapp` | `instagram` | `podcast` | `book` | `manual` | `plugin`
- **Description:** Category of the source. Determines how content is ingested and what processing it may need.
- **Example:** `youtube`

### `url`
- **Type:** string (URL or file path)
- **Required:** no
- **Description:** The URL or local path to the source. Use `~` when not applicable (e.g., for manual or physical sources).
- **Example:** `https://youtube.com`

### `description`
- **Type:** string
- **Required:** yes
- **Description:** What this source provides and how it's used in practice. Be specific — future-you will read this.
- **Example:** `Video content: tutorials, talks, interviews. Captured via manual note-taking or transcript extraction.`

### `reliability`
- **Type:** enum
- **Required:** no
- **Default:** `medium`
- **Allowed values:** `high` | `medium` | `low` | `varies`
- **Description:** How trustworthy is content from this source? Informs how much verification is needed before promoting a note to `evergreen`.
- **Example:** `varies`

### `language`
- **Type:** string (BCP 47 language tag or shorthand)
- **Required:** no
- **Default:** `en`
- **Description:** Primary language of content from this source.
- **Example:** `hi-en`

### `active`
- **Type:** boolean
- **Required:** no
- **Default:** `true`
- **Description:** Whether this source is currently being used to capture knowledge. Set to `false` to retire a source without deleting its record.
- **Example:** `true`

---

## Example Source Records

```yaml
- name: youtube
  when: 2026-03-17
  why: Primary channel for technical tutorials, lectures, and long-form educational content
  type: youtube
  url: https://youtube.com
  description: Video content across topics — programming, science, history. Captured via manual notes or transcript extraction. Quality varies by creator.
  reliability: varies
  language: en
  active: true

- name: whatsapp
  when: 2026-03-17
  why: High-volume source of forwards, voice notes, and informal knowledge shared in family and interest groups
  type: whatsapp
  url: ~
  description: Incoming forwards, links, and messages from contacts and groups. Content is mixed-language (Hinglish, Urdu, English). Needs classification before filing.
  reliability: low
  language: hi-en
  active: true

- name: opencode
  when: 2026-03-17
  why: Automatic logging of all AI tool calls to create a persistent action memory across sessions
  type: plugin
  url: .opencode/plugins/toolcallhistory.js
  description: Appends one JSON line to inbox/opencode after every tool call. Append-only. Never edit manually. Read it to recover session history.
  reliability: high
  language: en
  active: true
```

---

## Notes on Usage

- Source stub files in `OS/sources/` use plain YAML content — no `---` frontmatter delimiters, no enforced extension for legacy stubs.
- `OS/sources/index.md` holds the master list in YAML list format (`- name: value`). Always keep it in sync.
- When registering a new source: create a file in `OS/sources/` AND add a record to `OS/sources/index.md`.
- The `active: false` flag retires a source without losing its history — never delete source records.
- The `why` field is the most important field: it captures the original intent and prevents stale sources from accumulating silently.
