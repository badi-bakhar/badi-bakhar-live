---
title: "Paperclip — Open-source orchestration for zero-human companies"
date: 2026-03-17
source: web
url: https://github.com/paperclipai/paperclip
status: raw
lang: en
tags: [ai, agents, orchestration, open-source, multi-agent, company-automation]
---

# Paperclip — Open-source orchestration for zero-human companies

> "If OpenClaw is an employee, Paperclip is the company"

## What it is

Paperclip is a Node.js server + React UI that orchestrates a team of AI agents to run a business. You bring your own agents (OpenClaw, Claude Code, Codex, Cursor, Bash, HTTP), assign goals, and track work and costs from one dashboard.

It models a **company** — with org charts, budgets, governance, and goal alignment — not just a pipeline or workflow builder.

26.6k stars on GitHub. MIT license. Self-hosted.

## How it works

1. Define a goal — e.g. "Build the #1 AI note-taking app to $1M MRR"
2. Hire agents — CEO, CTO, engineers, designers, any bot, any provider
3. Approve and run — review strategy, set budgets, hit go
4. Monitor from dashboard — full audit trail, cost tracking, org chart view

## Key features

- **Bring Your Own Agent** — any agent that can receive a heartbeat is hired
- **Goal alignment** — every task traces back to company mission. Agents know what AND why.
- **Heartbeats** — agents wake on a schedule, check work, act. Delegation flows up and down org chart.
- **Cost control** — monthly budgets per agent. Hit limit → stop. No runaway costs.
- **Multi-company** — one deployment, many companies, complete data isolation
- **Ticket system** — every conversation traced, every decision explained, full tool-call tracing
- **Governance** — approve hires, override strategy, pause/terminate any agent at any time
- **Org chart** — hierarchies, roles, reporting lines. Your agents have a boss and a job description.
- **Mobile ready** — monitor and manage from anywhere

## What it is NOT

- Not a chatbot — agents have jobs, not chat windows
- Not an agent framework — doesn't tell you how to build agents, tells you how to run a company of them
- Not a workflow builder — no drag-and-drop pipelines
- Not a prompt manager
- Not a single-agent tool — designed for teams of 20+ agents

## Quickstart

```bash
npx paperclipai onboard --yes
# or
git clone https://github.com/paperclipai/paperclip.git
cd paperclip && pnpm install && pnpm dev
```

API at `http://localhost:3100`. Embedded PostgreSQL, no setup required. Requires Node.js 20+, pnpm 9.15+.

## Roadmap highlights

- ClipMart — buy/sell entire agent companies (coming soon)
- Cloud agents (Cursor, e2b)
- Plugin system (knowledgebase, custom tracing, queues) — done
- Easier agent config

## Relevance to Badi Bakhar

Paperclip is the orchestration layer missing from most personal AI setups. For Badi Bakhar, relevant patterns:
- The **heartbeat** model (agents that run on schedule, not just when prompted) maps well to the weekly inbox processing ritual
- **Goal ancestry** in tasks mirrors the `why` field in the source schema — every action knows its reason
- **Cost tracking** is a good mental model for managing token usage across OpenCode sessions
- The **ticket-based session persistence** solves exactly the problem the `toolcallhistory` plugin addresses — AI memory across reboots
