const PUSHGATEWAY = "http://localhost:9091"
const JOB = "opencode"

/**
 * Push metrics to Prometheus Pushgateway after every tool call.
 * Counters survive restarts by seeding from persisted Pushgateway values on startup.
 *
 * Metrics pushed:
 *   toolcall_total              counter  — calls per tool (accumulates across all sessions/restarts)
 *   toolcall_output_bytes       gauge    — output size per tool + session
 *   subagent_spawned_total      counter  — subagent Task invocations per agent type
 *   subagent_duration_seconds   gauge    — wall-clock duration of each subagent session
 */
export const ToolCallHistoryPlugin = async () => {
  // Persistent counters — seeded from Pushgateway on startup, incremented in-process
  // keyed by tool name only (cross-session totals)
  const toolTotals = {}

  // subagent spawn counters keyed by agent type only (cross-session)
  const spawnTotals = {}

  // child sessionID → { parentID, agent, startMs }
  const childSessions = {}

  // Track which child sessionID is spawned by which parent + agent
  // key: parentSessionID||agent → childSessionID
  const spawnedChildren = {}

  // ── Helpers ──────────────────────────────────────────────────────────────

  async function push(instance, body) {
    const url = `${PUSHGATEWAY}/metrics/job/${JOB}/instance/${encodeURIComponent(instance)}`
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body,
      })
    } catch (_) {
      // Pushgateway not running — fail silently
    }
  }

  // Parse Prometheus text exposition format and return { labelHash → value }
  // Only extracts lines matching the given metric name
  function parseMetric(text, metricName) {
    const result = {}
    for (const line of text.split("\n")) {
      if (line.startsWith("#") || !line.trim()) continue
      if (!line.startsWith(metricName + "{") && !line.startsWith(metricName + " ")) continue
      // Extract label string and value
      const match = line.match(/^(\w+)\{([^}]*)\}\s+([\d.e+]+)/) ||
                    line.match(/^(\w+)\s+([\d.e+]+)/)
      if (!match) continue
      const labels = match[2] || ""
      const value  = parseFloat(match[3] || match[2])
      result[labels] = value
    }
    return result
  }

  // Fetch current persisted values from Pushgateway for a given instance
  async function fetchPersistedCount(instance, metricName, labelKey) {
    try {
      const url = `${PUSHGATEWAY}/metrics/job/${JOB}/instance/${encodeURIComponent(instance)}`
      const resp = await fetch(url)
      if (!resp.ok) return 0
      const text = await resp.text()
      const parsed = parseMetric(text, metricName)
      // Find the entry whose labels contain our key
      for (const [labels, value] of Object.entries(parsed)) {
        if (labels.includes(labelKey)) return value
      }
    } catch (_) {}
    return 0
  }

  // ── Seed in-memory counters from Pushgateway on startup ──────────────────
  // Pull the persisted toolcall_total per tool so we continue from where we left off
  async function seedCounters() {
    try {
      const resp = await fetch(`${PUSHGATEWAY}/metrics`)
      if (!resp.ok) return
      const text = await resp.text()
      // Extract all toolcall_total lines
      for (const line of text.split("\n")) {
        if (!line.startsWith("toolcall_total{")) continue
        const toolMatch  = line.match(/tool="([^"]+)"/)
        const valueMatch = line.match(/\}\s+([\d.e+]+)/)
        if (toolMatch && valueMatch) {
          const tool = toolMatch[1]
          const val  = parseFloat(valueMatch[1])
          // Keep the highest value seen across all label combinations for this tool
          toolTotals[tool] = Math.max(toolTotals[tool] || 0, val)
        }
        // Also seed subagent spawn totals
        const spawnMatch = line.match(/subagent_spawned_total\{[^}]*agent="([^"]+)"[^}]*\}\s+([\d.e+]+)/)
        if (spawnMatch) {
          const agent = spawnMatch[1]
          const val   = parseFloat(spawnMatch[2])
          spawnTotals[agent] = Math.max(spawnTotals[agent] || 0, val)
        }
      }
      // Also seed subagent_spawned_total
      for (const line of text.split("\n")) {
        const m = line.match(/^subagent_spawned_total\{[^}]*agent="([^"]+)"[^}]*\}\s+([\d.e+]+)/)
        if (m) {
          const agent = m[1]
          const val   = parseFloat(m[2])
          spawnTotals[agent] = Math.max(spawnTotals[agent] || 0, val)
        }
      }
    } catch (_) {}
  }

  await seedCounters()

  // ── Hooks ─────────────────────────────────────────────────────────────────

  return {
    // ── Tool call tracking (all sessions including subagents) ──────────────
    "tool.execute.after": async (input, output) => {
      const { tool, sessionID } = input

      const parentSession = childSessions[sessionID]?.parentID ?? ""

      // Increment the cross-session total for this tool
      toolTotals[tool] = (toolTotals[tool] || 0) + 1

      const outputBytes = output.output
        ? Buffer.byteLength(output.output, "utf8")
        : 0

      const body = [
        `# HELP toolcall_total Total number of tool calls across all sessions`,
        `# TYPE toolcall_total counter`,
        // One series per tool — accumulates across all sessions and restarts
        `toolcall_total{tool="${tool}"} ${toolTotals[tool]}`,
        `# HELP toolcall_session_total Tool calls broken down by session`,
        `# TYPE toolcall_session_total counter`,
        `toolcall_session_total{tool="${tool}",session="${sessionID}",parent_session="${parentSession}"} 1`,
        `# HELP toolcall_output_bytes Size of tool output in bytes`,
        `# TYPE toolcall_output_bytes gauge`,
        `toolcall_output_bytes{tool="${tool}",session="${sessionID}"} ${outputBytes}`,
        "",
      ].join("\n")

      // Use tool name as instance — one stable slot per tool in Pushgateway
      await push(`tool_${tool}`, body)
    },

    // ── Event bus: subagent spawns and durations ───────────────────────────
    event: async ({ event }) => {
      if (event.type === "session.created") {
        const { id, parentID } = event.properties.info
        if (parentID) {
          childSessions[id] = { parentID, startMs: Date.now(), agent: "" }
        }
        return
      }

      if (event.type === "message.part.updated") {
        const part = event.properties.part
        if (part.type === "subtask") {
          const { sessionID, agent } = part

          // Increment cross-session spawn total for this agent type
          spawnTotals[agent] = (spawnTotals[agent] || 0) + 1

          // Store: parentSessionID||agent → agent (for lookup when child goes idle)
          const key = `${sessionID}||${agent}`
          spawnedChildren[key] = agent

          // Also try to update any child session that hasn't been tagged yet
          for (const [childID, info] of Object.entries(childSessions)) {
            if (info.parentID === sessionID && info.agent === "") {
              childSessions[childID].agent = agent
              break
            }
          }

          const body = [
            `# HELP subagent_spawned_total Total subagent Task invocations across all sessions`,
            `# TYPE subagent_spawned_total counter`,
            // One series per agent type — accumulates across sessions
            `subagent_spawned_total{agent="${agent}"} ${spawnTotals[agent]}`,
            `# HELP subagent_spawned_session_total Subagent spawns broken down by parent session`,
            `# TYPE subagent_spawned_session_total counter`,
            `subagent_spawned_session_total{agent="${agent}",parent_session="${sessionID}"} 1`,
            "",
          ].join("\n")

          await push(`subagent_${agent}`, body)
        }
        return
      }

      if (event.type === "session.idle") {
        const { sessionID } = event.properties
        const info = childSessions[sessionID]
        if (info) {
          const durationSecs = ((Date.now() - info.startMs) / 1000).toFixed(3)
          
          // Determine agent name from three sources (in order of preference):
          // 1. Direct mapping (cached from subtask part)
          let agent = info.agent
          
          // 2. If not found, search spawnedChildren for this sessionID
          if (!agent || agent === "") {
            for (const [key, val] of Object.entries(spawnedChildren)) {
              const [parentID, agentName] = key.split("||")
              if (parentID === info.parentID && !agent) {
                agent = agentName
                break
              }
            }
          }
          
          // 3. Fallback to "unknown"
          agent = agent || "unknown"

          const body = [
            `# HELP subagent_duration_seconds Wall-clock duration of a subagent session`,
            `# TYPE subagent_duration_seconds gauge`,
            `subagent_duration_seconds{session="${sessionID}",parent_session="${info.parentID}",agent="${agent}"} ${durationSecs}`,
            "",
          ].join("\n")

          await push(`subagent_duration_${sessionID}`, body)
          delete childSessions[sessionID]
        }
      }
    },
  }
}
