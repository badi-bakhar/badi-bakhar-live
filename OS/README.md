# OS/ — The Knowledge Operating System

`OS/` is the core layer of Badi Bakhar. Not an operating system in the technical sense — a metaphor. This is the "OS" that runs a personal knowledge practice: it knows where knowledge comes from, where it lives, and how it is structured.

---

## Two Sub-systems

### `OS/sources/` — The Source Registry

Tracks **where** knowledge comes from. Each file here is a metadata record for a knowledge channel — web, YouTube, WhatsApp, Instagram, and internal tools like the OpenCode plugin.

This is a **registry**, not a content store. No notes or articles live here. Only channel metadata: why the source exists, how reliable it is, what language it speaks.

Schema definition: `OS/sources/program.md`
Full registry: `OS/sources/index.md`

### `OS/data/` — The Granary

Where processed knowledge lives permanently. Notes, summaries, and ideas — organized by source type and semantic category.

Nothing enters `OS/data/` without first passing through `inbox/`. That transit step is what separates raw capture from processed knowledge.

---

## The Flow

```
[External Sources]
       |
       v
   inbox/              ← raw capture, transit zone
       |
       | (processing: frontmatter, classification, review)
       |
       v
  OS/data/             ← permanent, processed knowledge
       ^
       |
  OS/sources/          ← registry: knows where it came from
```

---

## Key Rule

**Never put raw or unprocessed content directly into `OS/data/`.**

Everything goes through `inbox/` first. The inbox is the airlock. `OS/data/` is the pressurized interior — only vetted, classified, frontmatted knowledge enters.

---

## Reference

| Path | Purpose |
|------|---------|
| `OS/sources/program.md` | Schema definition for source entries |
| `OS/sources/index.md` | Registry of all registered knowledge sources |
| `OS/data/` | Processed knowledge — permanent home |
