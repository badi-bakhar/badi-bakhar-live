# Badi Bakhar — System Status
Last updated: 2026-03-17

## Granary Stats
- OS/data/ notes: 8
  - web/: 2 (paperclip, openfang)
  - whatsapp/: 1 (badi-bakhar-whatsapp-group)
  - projects/: 1 (avrio-ops-agent-google-chat-api)
  - soal/: 2 (system-vs-habit, capture-vs-thinking)
  - root: 1 (badi-bakhar-origin)
  - agents-workspaces/, ideas/, instagram/, people/, topics/, youtube/: READMEs only
- Registered sources: 7 (opencode, web, youtube, whatsapp, instagram, paperclip, openfang)
- Active agents: 3 (ingester, researcher, chronicler)
- Pending agents: 27 (see HQ/REGISTRY.md)
- Custom commands: 3 (/ingest, /ask, /add-source)
- Skills: 4 (badi-bakhar, bedrock-models, frontmatter, inbox-workflow)

## Inbox
- inbox/soal: 2 entries, both status: archived (moved to OS/data/soal/)
- inbox/opencode: stub file — ##toolcallhistory header only (never edit)
- inbox/badi-bakhar-hq: status: archived
- inbox/README.md: system doc (permanent)

## Observability
- Plugin: toolcallhistory.js — pushes Prometheus metrics to localhost:9091
- Grafana dashboard: observability/grafana-dashboard.json
- Prometheus config: observability/prometheus.yml
- Status: configured, not confirmed running

## Provider
- Model: amazon-bedrock/global.anthropic.claude-sonnet-4-5-20250929-v1:0
- Region: ap-south-1
- Profile: badi-bakhar

## Recent Changes
- 2026-03-17: Project initialized — AGENTS.md, opencode.json, OS/, inbox/, .opencode/agents/
- 2026-03-17: Sources registered: web, youtube, whatsapp, instagram, paperclip, openfang
- 2026-03-17: Bedrock IAM user opencode-badi-bakhar created
- 2026-03-17: GitHub org badi-bakhar live at https://github.com/badi-bakhar
- 2026-03-17: Inbox processed — 6 screenshots → 2 notes, 2 soals → OS/data/soal/
- 2026-03-17: AGENTS.md synced — directory map, plugin description, skills, source registry updated

## Next Actions
- [ ] Confirm Prometheus + Grafana stack running (run observability/install.sh)
- [ ] Set GitHub Actions secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
- [ ] Investigate soal: system vs habit (OS/data/soal/2026-03-17-system-vs-habit.md)
- [ ] Investigate soal: capture vs thinking (OS/data/soal/2026-03-17-capture-vs-thinking.md)
- [ ] Process Dad's Facebook reel (https://www.facebook.com/share/r/16wPTkc3D9/) — add to OS/data/web/ or whatsapp/
