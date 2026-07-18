#!/bin/bash
# Hook: Reinforce operating rules on every user prompt
# Fires on: UserPromptSubmit
# Purpose: Every turn, remind the agent to (1) load mandatory skills, (2) read the
#          map before acting, (3) capture the instruction before executing.
# Zero dependencies (no jq): emits the reminder JSON and exits.

cat << 'CONTEXT'
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "REMINDER: If you have not yet called Skill('agent-protocol') and Skill('memory-sync') in this session, you MUST do so NOW before responding. These are mandatory session initialization skills. Your FIRST tool calls must be these two skills. No exceptions.\n\nMAP-FIRST REMINDER: For ANY task that draws on your workspace (recall, report, status, 'what do I think about X', reviews, planning), read WIKI.md FIRST, then the sub-index it routes to (a wiki index or a project's index.md), THEN follow every [[link]] on the page you land on - before answering. A grep/glob exact-filename hit is NOT permission to skip the map: an exact hit is the exact moment the map feels skippable and the linked sibling files stay invisible. Read the map even when search already handed you 'the answer'.\n\nCAPTURE REMINDER: Before executing ANY instruction, decision, or correction, RECORD it in the relevant project file in 10 Projects/ FIRST (create the project if none covers it), then act. Update the project file, Today.md, and the journal after the work. Unrecorded work is invisible next session."
  }
}
CONTEXT
exit 0
