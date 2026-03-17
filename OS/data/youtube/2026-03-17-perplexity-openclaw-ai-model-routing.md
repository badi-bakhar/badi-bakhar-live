---
title: "Perplexity just destroyed OpenClaw — AI model routing table"
date: 2026-03-17
source: youtube
status: raw
lang: en
tags: [ai-agents, model-routing, perplexity, openai, anthropic, gemini, multi-agent]
---

# Perplexity just destroyed OpenClaw — AI model routing table

**Channel:** David Ondrej (359K subscribers)
**URL:** https://youtube.com/watch?v=tJ-lNHRf8SY
**Captured:** 2026-03-17

---

## Key Idea

A slide from the video showing a proposed default model routing table for a multi-agent AI system — which model to use for which task type, with rationale. Models shown are speculative/future versions used to illustrate the concept.

The slide also notes: "Users can also explicitly override the model for a specific task."

---

## Image Description

### Slide — Task Type / Default Model / Rationale

| Task Type | Default Model | Rationale |
|-----------|---------------|-----------|
| Main orchestrator | Claude (Anthropic) | Primary reasoning engine |
| General research subagents | Claude Sonnet 4.6 | Good quality, fast, cost-effective |
| Asset creation (PDF, PPTX, etc.) | Claude Opus 4.6 | Highest quality reasoning |
| Website building | Claude Opus 4.6 | Complex multi-file reasoning |
| Budget research | Gemini 3.1 Pro | 1M context window, cheaper |
| Math / logic tasks | GPT 5.2 | Strong structured reasoning |
| Code generation | GPT 5.3 Codex | Specialized for code |
| Wide / batch research | GPT 5.2 | Broad reasoning at scale |
| Cron (easy, recurring) | Grok 4.1 | Fast for simple recurring checks |
| Cron (hard, recurring) | GPT 5.2 | Complex recurring analysis |
| Browser automation | Gemini 3 Flash | Fast page interaction |
| Image generation | Nano Banana 2 / Pro | Dedicated image models |
| Video generation | Sora 2 / Veo 3.1 | Dedicated video models |
| Text-to-speech | Gemini 2.5 Pro TTS | Dedicated speech model |

> Note: Model names (GPT 5.2, GPT 5.3 Codex, Gemini 3.1 Pro, Claude Opus 4.6, Grok 4.1, Nano Banana 2/Pro) are speculative/future versions — conceptual illustration, not current releases.

---

## Why This Matters for Badi Bakhar

This is a direct reference for the Badi Bakhar agent model routing strategy. The same pattern applies here: different agents should use different models based on task complexity and cost. Compare with `.opencode/skills/bedrock-models/SKILL.md` which defines the current Haiku/Sonnet split for this system.

**Pattern:** orchestrator = strongest model; subagents = cost-optimized per task type.
