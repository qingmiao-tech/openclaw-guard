#!/usr/bin/env bash
set -euo pipefail

OWNER="${OPENCLAW_GUARD_OWNER:-qingmiao-tech}"
VERSION="${OPENCLAW_GUARD_VERSION:-latest}"
PORT="${OPENCLAW_GUARD_PORT:-18088}"
MANAGED_PREFIX="${OPENCLAW_GUARD_MANAGED_PREFIX:-}"
DRY_RUN=0

guard_package_spec() {
  local base="@${OWNER}/openclaw-guard"
  if [ "$VERSION" != 'latest' ]; then
    printf '%s@%s' "$base" "$VERSION"
    return
  fi
  printf '%s' "$base"
}

usage() {
  cat <<'EOF'
OpenClaw Guard installer (macOS / Linux)

Usage:
  ./install.sh [--owner <owner>] [--version <version>] [--port <port>] [--managed-prefix <path>] [--dry-run]

What it does:
  1. Ensure Node.js + npm are available
  2. Install @<owner>/openclaw-guard globally with npm
  3. Delegate machine setup to: openclaw-guard init-machine --install-openclaw --start-web
EOF
}

log() {
  printf '[install.sh] %s\n' "$*"
}

have_command() {
  command -v "$1" >/dev/null 2>&1
}

run_cmd() {
  if [ "$DRY_RUN" -eq 1 ]; then
    log "[dry-run] $*"
    return 0
  fi
  "$@"
}

detect_linux_family() {
  if [ ! -f /etc/os-release ]; then
    printf 'unsupported'
    return
  fi
  # shellcheck disable=SC1091
  . /etc/os-release
  local id_like_lower="${ID_LIKE:-}"
  id_like_lower="$(printf '%s' "$id_like_lower" | tr '[:upper:]' '[:lower:]')"
  local id_lower="${ID:-}"
  id_lower="$(printf '%s' "$id_lower" | tr '[:upper:]' '[:lower:]')"
  if [ "$id_lower" = "debian" ] || [ "$id_lower" = "ubuntu" ] || printf '%s' "$id_like_lower" | grep -q 'debian'; then
    printf 'debian'
    return
  fi
  if [ "$id_lower" = "fedora" ] || [ "$id_lower" = "rhel" ] || [ "$id_lower" = "centos" ] || printf '%s' "$id_like_lower" | grep -Eq 'fedora|rhel'; then
    printf 'fedora'
    return
  fi
  if [ "$id_lower" = "arch" ] || printf '%s' "$id_like_lower" | grep -q 'arch'; then
    printf 'arch'
    return
  fi
  printf 'unsupported'
}

ensure_node() {
  if have_command node && have_command npm; then
    log "Detected Node.js $(node --version) and npm $(npm --version)."
    return
  fi

  local platform
  platform="$(uname -s)"
  case "$platform" in
    Darwin)
      if have_command brew; then
        log 'Node.js is missing. Installing with Homebrew...'
        run_cmd brew install node
        return
      fi
      log 'Homebrew is missing. Installing Homebrew first, then Node.js...'
      run_cmd /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      run_cmd brew install node
      ;;
    Linux)
      local family
      family="$(detect_linux_family)"
      case "$family" in
        debian)
          log 'Node.js is missing. Installing with apt-get...'
          run_cmd sudo apt-get update
          run_cmd sudo apt-get install -y nodejs npm
          ;;
        fedora)
          log 'Node.js is missing. Installing with dnf...'
          run_cmd sudo dnf install -y nodejs npm
          ;;
        arch)
          log 'Node.js is missing. Installing with pacman...'
          run_cmd sudo pacman -Sy --noconfirm nodejs npm
          ;;
        *)
          log 'This Linux distribution is outside the supported auto-bootstrap matrix.'
          log 'Please install Node.js + npm manually, then rerun this installer.'
          exit 1
          ;;
      esac
      ;;
    *)
      log 'install.sh only supports macOS and Linux.'
      exit 1
      ;;
  esac
}

install_guard() {
  local package_spec
  package_spec="$(guard_package_spec)"
  log "Installing ${package_spec} globally via npm..."
  run_cmd npm install -g "$package_spec"
}

prepend_npm_global_bin() {
  local prefix
  prefix="$(npm config get prefix 2>/dev/null || true)"
  if [ -z "$prefix" ] || [ "$prefix" = 'undefined' ]; then
    return
  fi

  local bin_dir
  case "$(uname -s)" in
    Darwin|Linux)
      bin_dir="${prefix}/bin"
      ;;
    *)
      bin_dir="$prefix"
      ;;
  esac

  case ":${PATH}:" in
    *":${bin_dir}:"*) ;;
    *) export PATH="${bin_dir}:${PATH}" ;;
  esac
}

run_init_machine() {
  local cli_args=(
    init-machine
    --install-openclaw
    --start-web
    --port "$PORT"
  )
  if [ -n "$MANAGED_PREFIX" ]; then
    cli_args+=(--managed-prefix "$MANAGED_PREFIX")
  fi
  if [ "$DRY_RUN" -eq 1 ]; then
    cli_args+=(--dry-run --json)
  fi

  if have_command openclaw-guard; then
    if [ "$DRY_RUN" -eq 1 ]; then
      log 'Running init-machine in dry-run mode through the installed CLI...'
    fi
    openclaw-guard "${cli_args[@]}"
    return
  fi

  local package_spec
  package_spec="$(guard_package_spec)"

  if [ "$DRY_RUN" -eq 1 ]; then
    log 'openclaw-guard is not on PATH yet. Showing fallback command only:'
    log "[dry-run] npx -y ${package_spec} ${cli_args[*]}"
    return
  fi

  log 'openclaw-guard is not on PATH yet. Falling back to npx for init-machine...'
  npx -y "$package_spec" "${cli_args[@]}"
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --owner)
      OWNER="${2:-}"
      shift 2
      ;;
    --version)
      VERSION="${2:-latest}"
      shift 2
      ;;
    --port)
      PORT="${2:-18088}"
      shift 2
      ;;
    --managed-prefix)
      MANAGED_PREFIX="${2:-}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      log "Unknown argument: $1"
      usage
      exit 1
      ;;
  esac
done

log "GitHub owner default: ${OWNER}"
log "Requested Guard version: ${VERSION}"
log "Target Guard Web port: ${PORT}"
if [ -n "$MANAGED_PREFIX" ]; then
  log "Managed prefix override: ${MANAGED_PREFIX}"
fi

ensure_node
if have_command npm; then
  prepend_npm_global_bin
fi
install_guard
if have_command npm; then
  prepend_npm_global_bin
fi
run_init_machine
