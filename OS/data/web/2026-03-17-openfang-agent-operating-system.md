---
title: "OpenFang — The Agent Operating System (Rust, open-source)"
date: 2026-03-17
source: web
url: https://www.openfang.sh/
status: raw
lang: en
tags: [ai, agents, rust, open-source, agent-os, security, channels, mcp]
---

# OpenFang — The Agent Operating System

> "Open-source Agent OS built in Rust. 7 autonomous Hands, 30 agents, 40 channels, 38 tools, 26 LLM providers. 16 security systems. One binary."

Built by Jaber ([@Akashi203](https://x.com/Akashi203)), founder of RightNow AI. v0.1.0.

14 crates, 137K lines of Rust, zero clippy warnings.

## What it is

A full agent operating system — not a framework, not a library. A **kernel** for autonomous agents. You install one binary, configure it, and it manages agents, memory, channels, tools, and security.

Install:
```bash
curl -fsSL https://openfang.sh/install | sh
```

## Core architecture

- **14-crate Rust workspace** — modular, each crate with a distinct responsibility
- **SQLite + vector embeddings** for persistent memory
- **WASM dual-metered sandbox** — tool code runs in WASM with fuel + epoch interruption metering
- **Merkle audit trail** — immutable, cryptographically chained action log
- **Ed25519 manifest signing** — every Hand manifest is signed

## The 7 Autonomous Hands

Hands are pre-built agents that **work for you** on schedules — not chat bots you prompt.

| Hand | Domain | What it does |
|---|---|---|
| Clip | Content | Long video → viral short clips. Captions, thumbnails, AI voice-overs. Publishes to Telegram + WhatsApp. |
| Lead | Data | Autonomous lead generation — discovers, enriches, scores, deduplicates. ICP scoring 0-100. |
| Collector | Intelligence | OSINT-style target monitoring. Change detection, sentiment tracking, knowledge graphs. |
| Predictor | Forecasting | Superforecasting with Brier score calibration. Evidence chains, contrarian mode. |
| Researcher | Productivity | Deep research with CRAAP fact-checking, APA citations, multi-language reports. |
| Twitter | Communication | Autonomous X manager — 7 content formats, scheduling, engagement, brand voice. |
| Browser | Automation | Web automation via Playwright. Mandatory purchase approval gate. |

Each Hand bundles: HAND.toml manifest, system prompt, SKILL.md expert knowledge, configurable settings, dashboard metrics.

## 16 Security systems

WASM dual-metered sandbox, Ed25519 manifest signing, Merkle audit trail, taint tracking, SSRF protection, secret zeroization, HMAC-SHA256 mutual auth, GCRA rate limiter, subprocess isolation, prompt injection scanner, path traversal prevention, and more.

## Scale stats

- 40 channel adapters (Telegram, Discord, Slack, WhatsApp, Teams, IRC, Matrix, +33 more)
- 26 LLM providers
- 30 pre-built agents across 4 performance tiers
- 38 built-in tools + MCP client + MCP server
- 140+ REST API endpoints

## Protocols supported

- **MCP** — Model Context Protocol (client + server)
- **A2A** — Google Agent-to-Agent tasks
- **OFP** — OpenFang Protocol for P2P networking with HMAC-SHA256 mutual auth

## Desktop app

Tauri 2.0 native app — system tray, notifications, single-instance, auto-start, global shortcuts.

## vs. other frameworks

| | OpenFang | OpenClaw | ZeroClaw | CrewAI | AutoGen |
|---|---|---|---|---|---|
| Language | Rust | TypeScript | Rust | Python | Python |
| Hands | 7 built-in | None | None | None | None |
| Security | 16 layers | 3 basic | 6 layers | 1 basic | Docker |
| Channels | 40 | 13 | 15 | 0 | 0 |
| Cold start | 180ms | 5980ms | 10ms | 3000ms | 4000ms |
| Memory | 40 MB | 394 MB | 5 MB | 200 MB | 250 MB |

## Relevance to Badi Bakhar

- **Researcher Hand** — directly relevant. CRAAP fact-checking + APA citations is exactly the kind of pipeline needed for processing WhatsApp forwards of dubious reliability. Could integrate as a verification step before marking a note `evergreen`.
- **40 channel adapters including WhatsApp** — OpenFang already solves the WhatsApp ingestion problem. Worth exploring as a pipeline to auto-forward messages into `inbox/`.
- **Collector Hand** — OSINT-style monitoring with knowledge graph construction. Could monitor specific web sources and push updates to Badi Bakhar inbox.
- **Clip Hand** — YouTube long video → short clips + notes. Relevant for the YouTube source ingestion pipeline.
- **Merkle audit trail** is a more robust version of what `toolcallhistory.js` does — worth studying for future hardening of the action log.
