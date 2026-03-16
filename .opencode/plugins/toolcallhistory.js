const PUSHGATEWAY = "http://localhost:9091"
const JOB = "opencode"

/**
 * Push metrics to Prometheus Pushgateway after every tool call.
 *
 * Metrics pushed:
 *   toolcall_total              counter  — calls per tool, session, parent_session
 *   toolcall_output_bytes       gauge    — output size per tool, session, parent_session
 *   subagent_spawned_total      counter  — subagent Task invocations per parent session + agent type
 *   subagent_duration_seconds   gauge    — wall-clock duration of each subagent session
 */
export const ToolCallHistoryPlugin = async () => {
  // Per-tool call counters (in-process, accumulates until restart)
  const counts = {}

  // subagent spawn counters keyed by parentSessionID||agent
  const spawnCounts = {}

  // child sessionID → { parentID, agent, startMs }
  const childSessions = {}

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

  return {
    // ── Tool call tracking (all sessions including subagents) ──────────────
    "tool.execute.after": async (input, output) => {
      const { tool, sessionID } = input

      // Look up whether this session is a child (subagent) session
      const parentSession = childSessions[sessionID]?.parentID ?? ""

      const key = `${tool}||${sessionID}`
      counts[key] = (counts[key] || 0) + 1

      const outputBytes = output.output
        ? Buffer.byteLength(output.output, "utf8")
        : 0

      const body = [
        `# HELP toolcall_total Total number of tool calls`,
        `# TYPE toolcall_total counter`,
        `toolcall_total{tool="${tool}",session="${sessionID}",parent_session="${parentSession}"} ${counts[key]}`,
        `# HELP toolcall_output_bytes Size of tool output in bytes`,
        `# TYPE toolcall_output_bytes gauge`,
        `toolcall_output_bytes{tool="${tool}",session="${sessionID}",parent_session="${parentSession}"} ${outputBytes}`,
        "",
      ].join("\n")

      await push(`tool_${tool}`, body)
    },

    // ── Event bus: track subagent spawns and durations ────────────────────
    event: async ({ event }) => {
      // ── session.created: record child sessions ──────────────────────────
      if (event.type === "session.created") {
        const { id, parentID } = event.properties.info
        if (parentID) {
          // This is a subagent (child) session
          childSessions[id] = { parentID, startMs: Date.now(), agent: "" }
        }
        return
      }

      // ── message.part.updated: capture subtask spawn (Task tool) ─────────
      if (event.type === "message.part.updated") {
        const part = event.properties.part
        if (part.type === "subtask") {
          const { sessionID, agent, description } = part
          const key = `${sessionID}||${agent}`
          spawnCounts[key] = (spawnCounts[key] || 0) + 1

          // Annotate the child session with its agent type once we see the subtask part
          // (child session may already exist from session.created)
          for (const [childID, info] of Object.entries(childSessions)) {
            if (info.parentID === sessionID && info.agent === "") {
              childSessions[childID].agent = agent
              break
            }
          }

          const body = [
            `# HELP subagent_spawned_total Total subagent Task invocations`,
            `# TYPE subagent_spawned_total counter`,
            `subagent_spawned_total{parent_session="${sessionID}",agent="${agent}"} ${spawnCounts[key]}`,
            "",
          ].join("\n")

          await push(`subagent_spawn_${sessionID}`, body)
        }
        return
      }

      // ── session.idle: record subagent duration when it finishes ──────────
      if (event.type === "session.idle") {
        const { sessionID } = event.properties
        const info = childSessions[sessionID]
        if (info) {
          const durationSecs = ((Date.now() - info.startMs) / 1000).toFixed(3)
          const agent = info.agent || "unknown"

          const body = [
            `# HELP subagent_duration_seconds Wall-clock duration of a subagent session`,
            `# TYPE subagent_duration_seconds gauge`,
            `subagent_duration_seconds{session="${sessionID}",parent_session="${info.parentID}",agent="${agent}"} ${durationSecs}`,
            "",
          ].join("\n")

          await push(`subagent_duration_${sessionID}`, body)

          // Clean up — session is done
          delete childSessions[sessionID]
        }
      }
    },
  }
}
