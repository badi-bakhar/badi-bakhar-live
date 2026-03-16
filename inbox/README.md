# inbox/

This is a **transit zone**. Nothing lives here permanently.
Everything that arrives must be processed and moved out — or deleted.

---

## Files

| File       | Purpose                                           | Touch? |
|------------|---------------------------------------------------|--------|
| `soal`     | Question capture queue — append new soals here    | Yes    |
| `opencode` | AI tool-call log, written by the system           | Never  |

---

## How to capture a soal

Open `soal`, copy the template block at the top, fill it in, append it at the bottom.
Any language is fine. Capture fast — perfectionism kills capture.

---

## The three-touch rule

1. **Capture** — drop it in `soal` with `status: open`. Takes 30 seconds.
2. **Triage** — once a week, scan all `status: open` entries. Promote urgency, add context, or archive junk.
3. **Process** — turn the soal into a note, a decision, an action, or an answer. Move it out of inbox.

---

## Processing ritual (weekly)

- Open `soal`
- For each entry with `status: open` or `status: exploring`:
  - If answered → fill `answer:`, change `status: answered`, move note to the right vault folder
  - If still open → bump urgency if needed, keep exploring
  - If irrelevant now → change `status: archived`
- Run `/ingest` to let the AI help you process with context

---

## The 30-day rule

Any soal sitting at `status: open` for more than 30 days without progress
gets **archived or deleted**. If a question hasn't moved in a month, it probably
wasn't important enough to answer.

---

## /ingest — AI-assisted processing

Run the `/ingest` slash command inside OpenCode to process the inbox with AI help.
It reads `soal`, surfaces patterns, suggests answers or next steps, and helps you
decide where processed notes should live in the vault.

---

*Keep the inbox empty. An empty inbox is a sign of a working system.*
