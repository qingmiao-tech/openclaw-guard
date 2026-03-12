#!/usr/bin/env bash
set -euo pipefail

action="preview"
prefix="openclaw-guard"
remote=""
remote_url="https://github.com/qingmiao-tech/openclaw-guard.git"
branch="main"
source_ref="HEAD"
allow_dirty_prefix="false"
squash="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --action)
      action="$2"
      shift 2
      ;;
    --prefix)
      prefix="$2"
      shift 2
      ;;
    --remote)
      remote="$2"
      shift 2
      ;;
    --remote-url)
      remote_url="$2"
      shift 2
      ;;
    --branch)
      branch="$2"
      shift 2
      ;;
    --source-ref)
      source_ref="$2"
      shift 2
      ;;
    --allow-dirty-prefix)
      allow_dirty_prefix="true"
      shift
      ;;
    --squash)
      squash="true"
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

case "$action" in
  preview|push|pull) ;;
  *)
    echo "Unsupported --action '$action'. Use preview, push, or pull." >&2
    exit 1
    ;;
esac

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if [[ ! -d "$prefix" ]]; then
  echo "Prefix path not found: $repo_root/$prefix" >&2
  exit 1
fi

target="$remote_url"
target_label="$remote_url"
if [[ -n "$remote" ]]; then
  target="$remote"
  target_label="remote '$remote'"
fi

current_branch="$(git branch --show-current)"
dirty_prefix_lines="$(git status --porcelain -- "$prefix" || true)"
split_output="$(git subtree split --prefix="$prefix" "$source_ref" 2>&1)"
split_hash="$(printf '%s\n' "$split_output" | sed -nE 's/^([0-9a-f]{7,40})$/\1/p' | tail -n 1)"

if [[ -z "$split_hash" ]]; then
  echo "Unable to resolve subtree split hash for '$prefix' from ref '$source_ref'." >&2
  echo "$split_output" >&2
  exit 1
fi

remote_head="$(git ls-remote "$target" "refs/heads/$branch" 2>/dev/null | awk 'NR==1 {print $1}')"
if [[ -z "$remote_head" ]]; then
  remote_head="(branch not found yet)"
fi

echo
echo "OpenClaw Guard public sync"
echo "Repo root     : $repo_root"
echo "Current branch: $current_branch"
echo "Prefix        : $prefix"
echo "Source ref    : $source_ref"
echo "Target        : $target_label"
echo "Target branch : $branch"
echo "Split commit  : $split_hash"
echo "Remote head   : $remote_head"
if [[ -n "$dirty_prefix_lines" ]]; then
  echo "Dirty prefix  : yes"
else
  echo "Dirty prefix  : clean"
fi
echo

ensure_clean_prefix() {
  if [[ -n "$dirty_prefix_lines" && "$allow_dirty_prefix" != "true" ]]; then
    echo "Detected uncommitted changes under '$prefix'. Commit or stash them before '$action'." >&2
    printf '%s\n' "$dirty_prefix_lines" >&2
    exit 1
  fi
}

if [[ "$action" == "preview" ]]; then
  if [[ -n "$dirty_prefix_lines" ]]; then
    echo "Preview uses committed history only. The following prefix changes are not part of the split yet:"
    printf '%s\n' "$dirty_prefix_lines" | sed 's/^/  /'
    echo
  fi

  if [[ "$remote_head" == "$split_hash" ]]; then
    echo "Public repo is already aligned with the current subtree split."
  else
    echo "Next push command:"
    echo "  git push $target $split_hash:refs/heads/$branch"
  fi

  echo
  echo "Pull command (to bring public repo commits back into the monorepo):"
  if [[ "$squash" == "true" ]]; then
    echo "  git subtree pull --prefix=$prefix --squash $target $branch"
  else
    echo "  git subtree pull --prefix=$prefix $target $branch"
  fi
  exit 0
fi

ensure_clean_prefix

if [[ "$action" == "push" ]]; then
  if [[ "$remote_head" == "$split_hash" ]]; then
    echo "Nothing to push. Public repo already matches split commit $split_hash."
    exit 0
  fi

  git push "$target" "$split_hash:refs/heads/$branch"
  echo "Push completed: $split_hash -> $target_label ($branch)"
  exit 0
fi

pull_cmd=(git subtree pull --prefix="$prefix")
if [[ "$squash" == "true" ]]; then
  pull_cmd+=(--squash)
fi
pull_cmd+=("$target" "$branch")
"${pull_cmd[@]}"

new_head="$(git rev-parse --short HEAD)"
echo "Pull completed into monorepo branch '$current_branch'. New HEAD: $new_head"
