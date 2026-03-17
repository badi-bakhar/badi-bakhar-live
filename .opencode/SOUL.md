# SOAL.md — Project Scratchpad & Living Context

> *This is not the rulebook (that's AGENTS.md). This is the heart of the project —
> the why, the open questions, the honest state of things.*

---

## 1. Bismillah

Yeh project hai mera apna granary — Badi Bakhar. Duniya mein knowledge har jagah se
aati hai: koi WhatsApp pe kuch forward kar deta hai, YouTube pe ek video se ghante
nikal jaate hain, Instagram pe koi reel dekhi aur ek idea spark ho gaya. Problem yeh
hai ki yeh sab kahin jaata nahi — browser tabs band hote hain, chat scroll ho jaati
hai, aur woh insight jo kabhi thi, gayab ho jaati hai. Badi Bakhar is ka jawab hai:
ek ghar, ek granary, jahan har daaney ko rakh sako — processed, linked, queryable.
Yahan knowledge aati hai aur yahan se nikalnay ka koi darwaza nahi hota.

---

## 2. Vision

Jab yeh system sahi se chal raha hoga, kuch aisa dikhega:

- Subah uthke ek YouTube video dekha, ek idea aaya — ek simple command se capture
  ho jaata hai, aur system khud batata hai ki yeh 3 purani notes se connect hota hai.
- Kisi ne WhatsApp pe kuch bheja — I process it, system rate karta hai reliability,
  aur ya toh granary mein jaata hai ya discard ho jaata hai. Koi clutter nahi.
- Mujhe ek soal hai — koi question jo dimag mein ghoom raha hai. Main AI se poochhta
  hoon, aur woh internet pe nahi jaata — meri apni notes mein search karta hai aur
  meri apni knowledge se jawab deta hai. Yeh feel different hai.
- Weeks baad, main keh sakta hoon: "us topic pe mere paas kya hai?" — aur ek honest
  inventory mil jaati hai, not browser bookmarks, not chat history.
- System lightweight rehta hai. No over-engineering. Grain by grain, harvest by harvest.

---

## 3. Open Soals (Current Design Questions)

Yeh genuine open questions hain — abhi koi final answer nahi hai.

1. **WhatsApp reliability rating** — WhatsApp forwards are notoriously unreliable.
   Should I build a `reliability` frontmatter field? How do I decide what's signal
   vs. noise without spending too much time on it?

2. **Evergreen threshold** — When does a note actually graduate from `processed` to
   `evergreen`? Is it time-based (survived 3 months of review)? Link-density based
   (connected to 5+ notes)? Or is it just a gut call I make manually?

3. **Voice notes from WhatsApp** — Log of conversation mein voice notes bhi aate
   hain. Transcription ki zaroorat padegi. Kya koi local model (whisper?) use karein,
   ya yeh abhi scope se bahar hai?

4. **Cross-source linking** — Ek YouTube video aur ek WhatsApp forward dono same
   concept ke baare mein hain. Kya wikilinks (`[[note-slug]]`) use karein? Ya tags
   kafi hain? Kab does linking become overhead?

5. **Weekly review ritual** — Should there be a structured `/review` command that
   surfaces notes added in the last 7 days, prompts for linking, and pushes `raw`
   notes to `processed`? Or is this too structured for how I actually work?

6. **Instagram reels** — Reel content is mostly visual + audio. Kya save karna
   meaningful hai without a transcript or summary? What's the minimum viable capture
   for a reel — just the idea it sparked, or more?

7. **Search interface** — Abhi AI is the search. But what about non-AI moments? Do
   I need a simple grep-based search command for when I just want to find something
   fast without opening a full session?

---

## 4. What's Been Built (as of 2026-03-17)

Honest inventory — no overstating:

- **Project scaffold** — Directory structure created: `inbox/`, `OS/data/`,
  `OS/sources/`, `.opencode/`
- **AGENTS.md** — Full AI instruction file written by Agent 1 (architect). This is
  the authoritative rulebook loaded into every session.
- **Source schema** — `OS/sources/program.md` defines the YAML schema for source
  records (name, when, why, type, url, description)
- **Source registry started** — `OS/sources/index.md` has the first registered
  source: the `opencode` toolcallhistory plugin
- **toolcallhistory plugin** — `.opencode/plugins/toolcallhistory.js` is live.
  Every tool call in every OpenCode session gets appended as a JSON line to
  `inbox/opencode`. This is the AI's cross-session memory.
- **opencode.json** — Config wired up: AGENTS.md + program.md as instructions,
  bash permission set to `ask`, watcher ignores `OS/data/` and `node_modules`
- **inbox/soal** — Question capture queue exists (currently empty, waiting for use)
- **Source stubs** — `OS/sources/` has stub files for instagram, web, whatapp,
  youtube — placeholders waiting to be filled when those sources go live

What's rough: `OS/data/` is completely empty. No notes have been processed yet.
The system is a granary with a roof and walls but no grain inside — yet.

---

## 5. Next Focus

Short-term, yeh karna hai:

- **First real capture** — Process something through the system end-to-end. One
  note, inbox → OS/data/. Just to prove the workflow works in practice.
- **Fill the WhatsApp source stub** — When WhatsApp forwarding starts, document
  exactly how it will work (email bridge? manual paste? screenshot OCR?)
- **Decide on linking strategy** — Pick wikilinks or tags-only before notes start
  accumulating and retroactively changing becomes painful
- **inbox/soal processing** — Define the soal → `OS/data/soal/` pipeline and test
  it with one real question
- **First evergreen note** — Identify one piece of knowledge that's stable enough
  to deserve `evergreen` status, and understand what that decision actually feels like

---

*Last updated: 2026-03-17 — Agent 6 (soal-context)*
*This file is a living document. Update it when the vision shifts or questions get answered.*
