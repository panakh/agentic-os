#!/bin/bash
# Hook: Enforce mandatory skill loading at session start
# Fires on: SessionStart (startup, resume, clear, compact)
# Purpose: Inject additionalContext so the agent MUST load agent-protocol + memory-sync
# Zero dependencies (no jq): emits the reminder JSON and exits.

cat << 'CONTEXT'
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "MANDATORY SKILL LOADING (enforced by hook - non-negotiable):\n\nBefore responding to the user, before reading files, before ANY action:\n1. Use the Skill tool to load 'agent-protocol'\n2. Use the Skill tool to load 'memory-sync'\n\nThese skills load your operating rules, memory protocol, and workspace context. Skipping them means operating blind. There are NO exceptions - not for 'simple' tasks, not for quick questions, not for anything. Load both skills FIRST, then proceed with the user's request.\n\nIf you generate ANY response to the user before loading these two skills, you are violating the #1 operating rule."
  }
}
CONTEXT
exit 0
