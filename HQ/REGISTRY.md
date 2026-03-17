# Badi Bakhar — Agent Registry

All 30 agents in the Badi Bakhar knowledge OS. This is the master registry.

| # | Name | Tier | Mode | Write | Model | Status |
|---|------|------|------|-------|-------|--------|
| 01 | build | Command | primary | yes | sonnet | pending |
| 02 | plan | Command | primary | yes | sonnet | pending |
| 03 | ingester | Intake | primary | yes | sonnet | active |
| 04 | whatsapp-processor | Intake | subagent | yes | haiku | pending |
| 05 | youtube-processor | Intake | subagent | yes | haiku | pending |
| 06 | web-processor | Intake | subagent | yes | haiku | pending |
| 07 | instagram-processor | Intake | subagent | yes | haiku | pending |
| 08 | manual-note-processor | Intake | subagent | yes | haiku | pending |
| 09 | tagger | Enrichment | subagent | yes | haiku | pending |
| 10 | linker | Enrichment | subagent | yes | sonnet | pending |
| 11 | evergreen-evaluator | Enrichment | subagent | no | sonnet | pending |
| 12 | duplicate-detector | Enrichment | subagent | no | haiku | pending |
| 13 | reliability-rater | Enrichment | subagent | no | haiku | pending |
| 14 | soul-investigator | Enrichment | primary | yes | sonnet | pending |
| 15 | researcher | Retrieval | primary | no | sonnet | active |
| 16 | explorer | Retrieval | subagent | no | sonnet | pending |
| 17 | synthesizer | Retrieval | subagent | no | sonnet | pending |
| 18 | gap-analyst | Retrieval | subagent | no | sonnet | pending |
| 19 | chronicler | Maintenance | primary | yes | haiku | active |
| 20 | status-updater | Maintenance | subagent | yes | haiku | pending |
| 21 | schema-guardian | Maintenance | subagent | no | haiku | pending |
| 22 | filename-enforcer | Maintenance | subagent | no | haiku | pending |
| 23 | archive-manager | Maintenance | subagent | yes | haiku | pending |
| 24 | session-historian | Session Intel | subagent | no | haiku | pending |
| 25 | context-loader | Session Intel | subagent | no | haiku | pending |
| 26 | soul-queue-manager | Session Intel | primary | yes | haiku | pending |
| 27 | weekly-reviewer | Session Intel | primary | yes | sonnet | pending |
| 28 | voice-note-handler | Specialized | subagent | yes | sonnet | pending |
| 29 | url-extractor | Specialized | subagent | yes | haiku | pending |
| 30 | tag-vocabulary-keeper | Specialized | primary | yes | haiku | pending |

---

## Tier Descriptions

| Tier | Purpose |
|------|---------|
| **Command** | High-level orchestration — building new system components, planning sessions |
| **Intake** | Receiving and classifying incoming knowledge from all sources |
| **Enrichment** | Adding structure, tags, links, and quality signals to processed notes |
| **Retrieval** | Finding, surfacing, and synthesizing knowledge from `OS/data/` |
| **Maintenance** | Keeping the system healthy, consistent, and well-organized |
| **Session Intel** | Session continuity, history recovery, periodic reviews |
| **Specialized** | Handling specific content types or cross-cutting concerns |

## Mode Descriptions

| Mode | Meaning |
|------|---------|
| **primary** | Can be invoked directly via `/command` or explicitly by name |
| **subagent** | Called by a primary agent; not typically invoked directly by the user |

## Model Tier Notes

- **sonnet** — Used for reasoning-heavy tasks: classification, linking, synthesis, planning
- **haiku** — Used for mechanical/fast tasks: tagging, filename checking, status updates, logging

---

*Last updated: 2026-03-17 — 3 active, 27 pending*
