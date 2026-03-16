---
title: "avrio-ops-agent — Google Chat API (GCP Console)"
date: 2026-03-16
source: manual
status: raw
lang: en
tags: [gcp, google-chat-api, avrio-ops-agent, work]
---

# avrio-ops-agent — Google Chat API (GCP Console)

Captured from GCP Console. Google Chat API is enabled on the `avrio-ops-agent` project but shows zero traffic over 30 days.

---

## Image Description

### URL / Project

- **URL:** `console.cloud.google.com/apis/api/chat.googleapis.com/metrics?project=avrio-ops-agent`
- **GCP Project:** `avrio-ops-agent`

---

### API / Service

- **Name:** Google Chat API
- **Provider:** Google Enterprise API
- **Description:** "The Google Chat API lets you build Chat apps to integrate your services with Google Chat and manage Chat resources such as spaces, members, and messages."

---

### Metadata Fields

| Field | Value |
|-------|-------|
| Service name | `chat.googleapis.com` |
| Type | Public API |
| Status | **Enabled** |

A **"Disable API"** button is visible, confirming the API is currently active.

---

### Tabs

| Tab | State |
|-----|-------|
| **Metrics** | **Active** |
| Quotas & System Limits | Inactive |
| Credentials | Inactive |
| Configuration | Inactive |

---

### Filter Settings

- **Select Graphs:** `4 Graphs` (dropdown)
- **Credentials:** `GWS Agents, Unspecifi...` (truncated)
- **Methods:** `39 options selected`

---

### Graphs Visible

1. **Traffic by response code** — fully visible, flat/empty
2. **Errors by API method** — partially visible at bottom, appears empty

Total graphs configured: 4 (2 visible in viewport)

---

### Time Range

- **Selected:** `30 days`
- **X-axis:** Feb 17 → Mar 16
- **Timezone:** UTC+5:30 (IST)

---

### Key Observation

The **Traffic by response code** graph is completely flat over the full 30-day window. The Google Chat API is enabled on `avrio-ops-agent` but has received **zero API calls** in 30 days. This is likely a project under setup — the API is configured but not yet in active use.

Browser profile: **Work** account.
