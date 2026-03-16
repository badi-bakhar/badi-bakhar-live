#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────
# Badi Bakhar — Observability Stack Installer
# Installs: Prometheus, Pushgateway, Grafana
# Configures Prometheus with project config
# Imports Grafana dashboard automatically
# ─────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMETHEUS_CONFIG="$SCRIPT_DIR/prometheus.yml"
DASHBOARD_JSON="$SCRIPT_DIR/grafana-dashboard.json"

GRAFANA_USER="admin"
GRAFANA_PASS="admin"
GRAFANA_URL="http://localhost:3000"
PROMETHEUS_URL="http://localhost:9090"
PUSHGATEWAY_PORT="9091"

GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m"

log()  { echo -e "${GREEN}[ok]${NC} $*"; }
info() { echo -e "${YELLOW}[..] $*${NC}"; }
fail() { echo -e "${RED}[!!] $*${NC}"; exit 1; }

require_sudo() {
  if [[ $EUID -ne 0 ]]; then
    fail "This script must be run with sudo: sudo bash $0"
  fi
}

# ── 1. Check OS ───────────────────────────────
check_os() {
  info "Checking OS..."
  if ! command -v apt-get &>/dev/null; then
    fail "This installer requires apt-get (Ubuntu/Debian only)"
  fi
  log "Ubuntu/Debian detected"
}

# ── 2. Install Prometheus + Pushgateway ───────
install_prometheus() {
  info "Installing Prometheus and Pushgateway..."
  apt-get update -qq
  apt-get install -y -qq prometheus prometheus-pushgateway
  log "Prometheus and Pushgateway installed"
}

# ── 3. Apply project Prometheus config ────────
configure_prometheus() {
  info "Applying Prometheus config from $PROMETHEUS_CONFIG..."

  PROM_CONFIG_DEST="/etc/prometheus/prometheus.yml"

  # Back up the default config once
  if [[ ! -f "${PROM_CONFIG_DEST}.bak" ]]; then
    cp "$PROM_CONFIG_DEST" "${PROM_CONFIG_DEST}.bak"
    log "Backed up default config to ${PROM_CONFIG_DEST}.bak"
  fi

  cp "$PROMETHEUS_CONFIG" "$PROM_CONFIG_DEST"
  log "Prometheus config installed at $PROM_CONFIG_DEST"
}

# ── 4. Install Grafana ────────────────────────
install_grafana() {
  info "Installing Grafana..."
  apt-get install -y -qq apt-transport-https software-properties-common wget

  if [[ ! -f /etc/apt/sources.list.d/grafana.list ]]; then
    wget -qO- https://packages.grafana.com/gpg.key | apt-key add - 2>/dev/null
    echo "deb https://packages.grafana.com/oss/deb stable main" \
      > /etc/apt/sources.list.d/grafana.list
    apt-get update -qq
  fi

  apt-get install -y -qq grafana
  log "Grafana installed"
}

# ── 5. Enable and start services ──────────────
start_services() {
  info "Enabling and starting services..."

  systemctl enable --now prometheus-pushgateway
  systemctl restart prometheus
  systemctl enable --now grafana-server

  log "prometheus-pushgateway started"
  log "prometheus started"
  log "grafana-server started"
}

# ── 6. Wait for Grafana to be ready ───────────
wait_for_grafana() {
  info "Waiting for Grafana to be ready..."
  local attempts=0
  until curl -sf "$GRAFANA_URL/api/health" &>/dev/null; do
    attempts=$((attempts + 1))
    if [[ $attempts -ge 30 ]]; then
      fail "Grafana did not become ready in time. Check: sudo systemctl status grafana-server"
    fi
    sleep 2
  done
  log "Grafana is up"
}

# ── 7. Configure Prometheus datasource ────────
configure_datasource() {
  info "Adding Prometheus datasource to Grafana..."

  local payload
  payload=$(cat <<EOF
{
  "name": "Prometheus",
  "type": "prometheus",
  "url": "$PROMETHEUS_URL",
  "access": "proxy",
  "isDefault": true
}
EOF
)

  local response
  response=$(curl -sf -X POST \
    -H "Content-Type: application/json" \
    -u "$GRAFANA_USER:$GRAFANA_PASS" \
    -d "$payload" \
    "$GRAFANA_URL/api/datasources" 2>&1 || true)

  if echo "$response" | grep -q '"id"'; then
    log "Prometheus datasource added"
  elif echo "$response" | grep -q "already exists"; then
    log "Prometheus datasource already exists, skipping"
  else
    echo "  Response: $response"
    fail "Failed to add Prometheus datasource"
  fi
}

# ── 8. Import Grafana dashboard ───────────────
import_dashboard() {
  info "Importing Grafana dashboard..."

  # Wrap the dashboard JSON in the import envelope and bind the datasource
  local ds_uid
  ds_uid=$(curl -sf \
    -u "$GRAFANA_USER:$GRAFANA_PASS" \
    "$GRAFANA_URL/api/datasources/name/Prometheus" \
    | python3 -c "import sys,json; print(json.load(sys.stdin)['uid'])" 2>/dev/null || echo "")

  # Build import payload using python3 (available by default on Ubuntu)
  python3 - "$DASHBOARD_JSON" "$ds_uid" "$GRAFANA_URL" "$GRAFANA_USER" "$GRAFANA_PASS" <<'PYEOF'
import sys, json, urllib.request, urllib.error

dashboard_file = sys.argv[1]
ds_uid         = sys.argv[2]
grafana_url    = sys.argv[3]
user           = sys.argv[4]
password       = sys.argv[5]

with open(dashboard_file) as f:
    dashboard = json.load(f)

# Remove import-only keys
dashboard.pop("__inputs", None)
dashboard.pop("__requires", None)
dashboard["id"] = None

# Bind datasource UID in all targets
def bind_ds(obj, uid):
    if isinstance(obj, dict):
        if obj.get("type") == "prometheus" and "uid" in obj:
            obj["uid"] = uid if uid else "${DS_PROMETHEUS}"
        for v in obj.values():
            bind_ds(v, uid)
    elif isinstance(obj, list):
        for item in obj:
            bind_ds(item, uid)

if ds_uid:
    bind_ds(dashboard, ds_uid)

payload = json.dumps({
    "dashboard": dashboard,
    "folderId": 0,
    "overwrite": True,
}).encode()

import base64
token = base64.b64encode(f"{user}:{password}".encode()).decode()

req = urllib.request.Request(
    f"{grafana_url}/api/dashboards/import",
    data=payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Basic {token}",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())
        print(f"  Dashboard URL: {grafana_url}{result.get('importedUrl', '')}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"  HTTP {e.code}: {body}", file=sys.stderr)
    sys.exit(1)
PYEOF

  log "Dashboard imported"
}

# ── 9. Print summary ──────────────────────────
print_summary() {
  echo ""
  echo "────────────────────────────────────────────"
  log "Observability stack is live"
  echo ""
  echo "  Pushgateway  →  http://localhost:$PUSHGATEWAY_PORT"
  echo "  Prometheus   →  $PROMETHEUS_URL"
  echo "  Grafana      →  $GRAFANA_URL"
  echo "    user: $GRAFANA_USER  /  pass: $GRAFANA_PASS"
  echo ""
  echo "  Restart OpenCode to activate the plugin."
  echo "────────────────────────────────────────────"
}

# ── Main ──────────────────────────────────────
main() {
  require_sudo
  check_os
  install_prometheus
  configure_prometheus
  install_grafana
  start_services
  wait_for_grafana
  configure_datasource
  import_dashboard
  print_summary
}

main "$@"
