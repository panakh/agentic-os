---
name: memory-sync
description: Keeps the workspace in sync with what the user says and what the agent learns. Load at the start of every session, right after agent-protocol. Defines how instructions, preferences, and corrections persist across sessions.
---

# Memory Sync

Nothing persists across sessions unless it is written to a file. This skill makes sure everything worth keeping gets written, in the right places.

## Triggers

Act on this skill whenever any of these happen:

- The user says "remember", "always", "never", "from now on", "make sure".
- The user corrects something you did.
- The user states a preference, even casually ("I hate long emails").
- You learn something about the user, their work, or their tools that a future session would need.

## What to do

1. **Find every file the fact touches.** Search the vault: related project files, `CLAUDE.md`, skill files, `30 Resources/`. A rule recorded in one place but contradicted in another is a bug.
2. **Write it everywhere relevant, in the same response.** Not later, not "noted". If it changes how sessions operate, update `CLAUDE.md` or the matching skill. If it belongs to a project, update the project file. Preferences go in `30 Resources/User_Preferences.md` (create it on first use).
3. **Acknowledge with the file path.** "Recorded in X" beats "got it". If you acknowledged without writing, that is a violation of this skill.

## Corrections are permanent guardrails

When the user corrects you:

1. Fix the immediate issue.
2. Ask yourself what class of mistake it was, and where else it could recur.
3. Write the guardrail into the files that govern that behavior (skill, `CLAUDE.md`, project file).
4. Change behavior in the same session. Writing the rule and then repeating the mistake means the sync failed.

The `self-learning` skill covers how lessons graduate into rules and skills over time; this skill covers the immediate write-through.

## After compaction or a fresh session

Context gets lost between and within sessions. Before continuing work on any project, re-read its full project file. The file is the recovery point, not your recollection.
