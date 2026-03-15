#!/usr/bin/env bash
set -euo pipefail

CHANNEL_ID="feishu-enhanced"
CONFIG_FILE="${HOME}/.openclaw/openclaw.json"

usage() {
  cat <<'EOF'
Usage:
  bash scripts/setup-feishu-per-agent.sh [--channel feishu-enhanced|feishu] [--config ~/.openclaw/openclaw.json]

What it does:
  1) Backs up openclaw.json
  2) Adds 7 Feishu accounts (one per agent) under channels.<channel>.accounts
  3) Adds routing bindings: match.channel + match.accountId -> agentId
  4) Prints required env vars and writes an env template file
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --channel)
      CHANNEL_ID="$2"
      shift 2
      ;;
    --config)
      CONFIG_FILE="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "[error] Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ ! -f "$CONFIG_FILE" ]]; then
  echo "[error] Config not found: $CONFIG_FILE" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
STAMP="$(date +%Y%m%d-%H%M)"
BACKUP_FILE="${CONFIG_FILE}.bak-${STAMP}"

cp "$CONFIG_FILE" "$BACKUP_FILE"
echo "[backup] $BACKUP_FILE"

node "$SCRIPT_DIR/setup-feishu-per-agent.mjs" \
  --config "$CONFIG_FILE" \
  --channel "$CHANNEL_ID"

echo "[next] Fill env vars in ~/.zshrc (or current shell), then:"
echo "       openclaw gateway restart"
echo "       openclaw channels status"
echo "       openclaw agents list --bindings"
