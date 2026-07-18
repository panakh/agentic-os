---
name: session-persist
description: End-of-turn persistence + wikify safety-net. Ensures any user correction, decision, take, rule, or file change from THIS turn is captured — wikified to the right wiki, written to the memory index + project files, and committed — before the turn ends. Idempotent and FAST: exits immediately when nothing this turn needs persisting (the common case for Q&A turns). Invoked automatically by the Stop hook and available as /session-persist. Trigger on: end of turn, "persist", "capture this", "did we save that", after any correction / decision / new rule / created or edited file.
---

# session-persist

Guarantee nothing durable gets lost at the end of a turn. Run the capture + wikify + commit sweep — but only do work when there is work to do.

## Step 1 — fast exit (do this first, every time)

Ask: did THIS turn produce anything durable that is NOT already persisted?
- a user correction, a decision, a new rule / preference, a take / insight / "wonder", OR
- a created / edited file that is not yet committed.

If **no** → reply "nothing to persist" and stop. Never create empty commits or churn. Most Q&A turns end here.

## Step 2 — persist (only if step 1 found something)

Reuse the existing skills — do NOT reimplement their logic:

1. Load `memory-sync` and the `wikify` / `llm-wiki` skill if not already loaded.
2. Route each durable item to its home (let the wiki skill decide):
   - personal take / stance / mental model / "wonder" → the personal wiki (Brain)
   - operational rule / SOP / how-we-do-X → the operations wiki (90 System/Operations)
   - external fact / product / pricing / competitor data → the resources wiki (30 Resources)
   - work to do → a task in its project (Next Actions), or the inbox
3. Propagate corrections to ALL relevant files (memory index / MEMORY.md, the active project's Activity Log, preference and rule files) — not just one.
4. Commit the vault: stage EXPLICIT changed paths only (never `git add -A` / `.` / `-u`, never `git stash`), HEREDOC message. Skip cleanly if the vault is not a git repo.
5. Confirm in one line what was persisted and where.

## Rules

- Idempotent: safe to run twice; the fast-exit prevents redundant work.
- Explicit paths only on commit — never clobber another session's staged work.
- Portable: route through the wiki skill, never hardcode absolute paths. Works on any Agentic OS vault (this skill ships in the starter kit).
- This is a SAFETY NET, not a replacement for capturing as you go — capture during the turn; this catches what slipped.
