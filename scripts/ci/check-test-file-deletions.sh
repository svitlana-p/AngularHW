#!/bin/bash
set -euo pipefail

BASE_SHA="${1:-${BASE_SHA:-}}"
HEAD_SHA="${2:-${HEAD_SHA:-}}"

if [[ -z "$BASE_SHA" ]]; then
  echo "ERROR: BASE_SHA is required (argument 1 or BASE_SHA env var)." >&2
  exit 1
fi
if [[ -z "$HEAD_SHA" ]]; then
  echo "ERROR: HEAD_SHA is required (argument 2 or HEAD_SHA env var)." >&2
  exit 1
fi

if ! git cat-file -e "$BASE_SHA^{commit}" 2>/dev/null; then
  echo "ERROR: Cannot resolve BASE_SHA '$BASE_SHA' as a commit." >&2
  exit 1
fi
if ! git cat-file -e "$HEAD_SHA^{commit}" 2>/dev/null; then
  echo "ERROR: Cannot resolve HEAD_SHA '$HEAD_SHA' as a commit." >&2
  exit 1
fi

# Detect deleted test files using NUL-delimited name-status output.
deleted_test_files=""
while IFS= read -r -d '' status && IFS= read -r -d '' path; do
  if [[ "$status" == "D" ]]; then
    case "$path" in
      *.spec.* | *.test.*)
        deleted_test_files="$deleted_test_files
$path"
        ;;
    esac
  fi
done < <(git diff --diff-filter=D --name-status -z "$BASE_SHA" "$HEAD_SHA" || true)

# Check commit messages in the PR range for a valid DELETE_TESTS marker.
has_marker=false
if git log --format=%B "$BASE_SHA..$HEAD_SHA" | grep -qE 'DELETE_TESTS:[[:space:]]+\S'; then
  has_marker=true
fi

if [[ -z "$deleted_test_files" ]]; then
  echo "PASS: No test files were deleted between $BASE_SHA and $HEAD_SHA."
  exit 0
fi

if $has_marker; then
  echo "PASS: Test files were deleted between $BASE_SHA and $HEAD_SHA, and a valid DELETE_TESTS marker was found in a commit message."
  printf 'Deleted test files:\n'
  printf '%s\n' "$deleted_test_files" | while IFS= read -r line; do
    [[ -n "$line" ]] && printf '  %s\n' "$line"
  done
  exit 0
fi

echo "FAIL: Test files were deleted between $BASE_SHA and $HEAD_SHA without a valid DELETE_TESTS: <reason> marker."
echo "Add a commit message containing DELETE_TESTS: <reason> (with non-whitespace reason) to one of the PR commits."
printf 'Deleted test files:\n'
printf '%s\n' "$deleted_test_files" | while IFS= read -r line; do
  [[ -n "$line" ]] && printf '  %s\n' "$line"
done
exit 1