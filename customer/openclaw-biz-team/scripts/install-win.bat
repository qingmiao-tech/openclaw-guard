#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_ROOT="$HOME/.openclaw"
TEAM_ROOT="$TARGET_ROOT/customer-biz-team"
TARGET_CONFIG="$TARGET_ROOT/openclaw.json"
STAMP="$(date +%Y%m%d-%H%M)"

mkdir -p "$TARGET_ROOT"
mkdir -p "$TEAM_ROOT"

if [ -f "$TARGET_CONFIG" ]; then
  cp "$TARGET_CONFIG" "$TARGET_ROOT/openclaw.json.bak-${STAMP}"
  echo "[backup] $TARGET_ROOT/openclaw.json.bak-${STAMP}"
fi

cp "$SRC_DIR/openclaw.json" "$TARGET_CONFIG"
mkdir -p "$TEAM_ROOT/workspaces"
rsync -a "$SRC_DIR/workspaces/" "$TEAM_ROOT/workspaces/"

echo "[ok] OpenClaw customer package installed"
echo "[next] export OPENAI_API_KEY and DASHSCOPE_API_KEY"
echo "[next] openclaw gateway restart"
