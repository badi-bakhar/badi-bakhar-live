# Badi Bakhar — Source Registry
Last updated: 2026-03-17 (2 web sources added)

All knowledge sources registered in this knowledge home. Each entry follows the schema defined in `program.md`.

---

- name: opencode
  when: 2026-03-17
  why: Track tool call metrics for all OpenCode sessions with visualization
  type: plugin
  url: .opencode/plugins/toolcallhistory.js
  description: Subscribes to tool.execute.after events and pushes metrics (toolcall_total, toolcall_output_bytes) to Prometheus Pushgateway at localhost:9091. Grafana dashboard at observability/grafana-dashboard.json. Prometheus config at observability/prometheus.yml.

- name: web
  when: 2026-03-17
  why: Capture articles, blog posts, and web reading for permanent storage
  type: web
  url: ~
  description: General internet sources — any URL worth keeping. Web articles, blog posts, documentation, research papers.
  reliability: varies
  language: en
  active: true

- name: youtube
  when: 2026-03-17
  why: Capture key ideas from educational videos, talks, and channels for the knowledge base
  type: youtube
  url: https://youtube.com
  description: YouTube videos — educational content, documentaries, lectures, creator channels. Notes focus on key ideas and timestamps.
  reliability: medium
  language: en
  active: true

- name: whatsapp
  when: 2026-03-17
  why: WhatsApp is a primary channel for community knowledge, forwarded insights, and trusted personal conversations
  type: whatsapp
  url: ~
  description: WhatsApp conversations, group forwards, voice note transcripts. High volume, variable quality — reliability field is critical here.
  reliability: varies
  language: hi-en
  active: true

- name: instagram
  when: 2026-03-17
  why: Instagram reels and carousels are increasingly a source of condensed educational content
  type: instagram
  url: https://instagram.com
  description: Instagram posts, reels, and carousels. Focus on educational creators, infographics, and insight-dense content.
  reliability: low
  language: en
  active: true

- name: paperclip
  when: 2026-03-17
  why: Open-source AI company orchestration — relevant patterns for agent coordination, heartbeats, goal alignment, and cost control
  type: web
  url: https://github.com/paperclipai/paperclip
  description: Node.js + React UI for orchestrating teams of AI agents into autonomous companies. Org charts, budgets, governance, ticket system. 26.6k stars, MIT, self-hosted.
  reliability: high
  language: en
  active: true

- name: openfang
  when: 2026-03-17
  why: Rust-based agent OS with 40 channel adapters including WhatsApp — directly relevant to Badi Bakhar's ingestion pipeline
  type: web
  url: https://www.openfang.sh/
  description: Open-source Agent OS in Rust. 7 autonomous Hands, 40 channels (WhatsApp included), 16 security systems, 26 LLM providers, MCP+A2A+OFP protocols. v0.1.0.
  reliability: high
  language: en
  active: true
