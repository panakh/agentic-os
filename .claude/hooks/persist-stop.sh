#!/usr/bin/env bash
# Stop hook: end-of-turn persistence safety-net.
# Nudges the agent (once) to run the session-persist skill so any takes,
# corrections, decisions, or file changes from the turn get wikified + committed.
#
# SAFETY:
#  - Fail-open: any error path exits 0 (allow stop) so a turn is NEVER trapped.
#  - Loop-guard: if this Stop is already a continuation triggered by this hook
#    (stop_hook_active=true), allow stop — so it fires at most once per turn.
set +e

input="$(cat 2>/dev/null)"

# If we cannot read/parse the state, fail open (allow stop) rather than risk a loop.
command -v jq >/dev/null 2>&1 || exit 0
active="$(printf '%s' "$input" | jq -r '.stop_hook_active // false' 2>/dev/null)"

# Continuation already triggered by this hook, or unreadable state -> allow stop.
[ "$active" = "true" ] && exit 0
[ -z "$active" ] && exit 0

# First stop of the turn: ask the agent to run the persistence sweep once.
cat <<'JSON'
{"decision":"block","reason":"End-of-turn persistence check: run the session-persist skill now. If this turn produced any user correction, decision, take, rule, or created/edited file that is not yet persisted, capture it — route to the right wiki (personal take -> Brain, operational SOP -> 90 System/Operations, external fact -> 30 Resources), update the memory index + the active project file, and commit the vault with explicit paths. If everything is already persisted and committed, briefly confirm and stop."}
JSON
exit 0
