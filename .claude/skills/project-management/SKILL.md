---
name: project-management
description: "Load before starting ANY work that needs a home in the project system. Trigger on all of these: (1) Creating/tracking work — 'create a project', 'track this', 'track this bug/feature', 'new project for X', 'set up a project', 'log this', 'record this'. (2) Any work request that needs a project home — 'fix this bug', 'build X', 'I want to do Y', 'let's work on X', 'add a feature', 'implement X'. (3) Lifecycle — 'this is done', 'archive this', 'move to backlog', 'mark complete', 'close this out', 'put this on hold', 'defer this', 'where does this go'. (4) Status/progress — 'update progress', 'what's the status', 'where are we on X'. (5) Persistence — 'remember this for later', 'save this for later', 'note this down'. When in doubt, load it: the routing logic inside decides whether a new project is needed or an existing one gets updated."
---

# Project Management

The system for turning work into tracked, recoverable projects inside your Agentic OS (`10 Projects/`, `20 Areas/`, `40 Archives/`). Pairs with `llm-wiki` (the wiki that makes projects findable) and `agent-protocol` (capture-first rules).

## Step Zero: find or create the right home

**Every piece of work needs a home. But not every instruction is its own project.** Before doing the work, route it.

- **Project** — a group of related tasks with a clear, completable outcome (roughly a 2–7 day arc). You can look at the outcome and say "done" or "not done". Lives in `10 Projects/`. "Fix the login bug" is a task; "Login Reliability Fix" (investigate → fix → test → ship, outcome "login works for every provider") is a project.
- **Area** — an ongoing responsibility with no end date: a recurring SOP, a weekly review, monitoring. Lives in `20 Areas/`.
- **One-off** (< ~30 min, no follow-up) — just log it in the most related area or the daily journal and do it.

**Routing (run this before any work):**

```
User says "do X"
  └─ Search 10 Projects/ for a related active project
       ├─ FOUND    → add a task to it, log in its Activity Log, do the work
       └─ NOT FOUND
            └─ Search 20 Areas/ for a related area
                 ├─ FOUND → log there, do the work
                 └─ NOT FOUND
                      ├─ one-off small task?     → log in the nearest area / journal
                      ├─ recurring responsibility? → create an area in 20 Areas/
                      └─ otherwise                → create a project in 10 Projects/
```

**Search first, always.** Search `10 Projects/` and `20 Areas/` for related keywords before creating anything. Duplicate projects split context and cause confusion.

## Why this matters: compaction survival

When the conversation compacts, chat history is gone. The project file is the recovery point. A fresh agent reading it must learn: the goal, what's been done, what was decided, the current state, and what's next. So capture as you go — user instructions into the Activity Log **before** you execute, decisions into the Decisions Log, current-state changes into the top of the index. If any of that is missing, the file has failed its job.

## A project is a folder of small, linked files (from day one)

Never a single wall-of-text file. Every project is a **folder** whose main file is a slim, scannable **index**, and whose detail lives in its own linked topic files — the same idea as the `llm-wiki` skill.

```
10 Projects/
  My New Project/
    index.md            # slim INDEX (< 200 lines): what it is + outcome + what's done + pointers
    Activity_Log.md     # chronological, append-only — created with the project
    Decisions_Log.md    # decisions, latest first — created with the project
    # then, as real content appears:
    Implementation_Tasks.md, Architecture.md, Open_Questions.md, Research_X.md, screenshots/ ...
```

`Activity_Log.md` and `Decisions_Log.md` are **mandatory from creation** — don't wait for them to grow. The index never contains an inline log; it only points to these files with `[[wikilinks]]`.

### The index (keep it under ~200 lines)

An agile card plus a map. Order matters — agents read the first screenful:

1. Frontmatter — `status`, `tags`, `outcome`, `related`
2. **Outcome** — one or two sentences on what success looks like
3. **Success Criteria** — checkboxes that define "done"
4. **Related Projects** — `[[wikilinks]]` with a one-line reason for each
5. **Current State / TL;DR** — where the project is today (prose, updated in place — not a log)
6. **Support Materials index** — a table linking every topic file in the folder

If the index drifts past ~200 lines, a topic file is missing — extract it. Move log content verbatim (logs are immutable), replace with a one-line pointer, done.

## Tasks: their own file, in execution order

Tasks live in `Implementation_Tasks.md` (only a trivial ≤5-task project keeps them inline). Order them **chronologically by execution sequence**, not grouped by category — dependencies are handled by ordering (if B needs A, A comes first). Group into numbered phases and work top to bottom, checking off as you go.

```markdown
### 1. Setup / Prerequisites
- [ ] First thing
### 2. Phase two (needs setup)
- [ ] Next thing
```

## Capture before executing; logs are immutable

- **Capture first.** Write the user's instruction into the Activity Log **before** you do the work, so an interruption never loses it. Capture your own substantive output too (a design, a table, a plan) — as a named section or its own topic file, with a one-line pointer from the log.
- **Logs are append-only.** Never edit or delete a past log or decision entry. If something was wrong or reversed, add a new correction entry. The top-level sections (Current State, Architecture) are the mutable present; the logs are the immutable past. Both are kept.

## Link everything (bare wikilinks)

Cross-reference with Obsidian `[[wikilinks]]`, never wrapped in backticks (backticks kill the link and the graph edge). Use `[[file]]` to link, `![[image.png]]` to embed inline. When you create or update a project, search the other PARA folders for genuinely related work and add it to the `related:` frontmatter and a **Related Projects** table with a one-line reason each — and add the reciprocal backlink on the target so traversal works both ways.

## Lifecycle: status change = physical move

`10 Projects/` holds **active work only** (plus the two subfolders below). When a project's status changes, move the whole folder to match — updating frontmatter without moving is a bug (stale scans keep treating it as active).

| Status | Lives in |
|---|---|
| active | `10 Projects/` |
| monitoring (shipped, tracking results) | `10 Projects/Monitoring/` |
| needs-verification (agent done, awaiting your check) | `10 Projects/Needs Verification/` |
| completed | `40 Archives/Projects/Completed/` |
| backlog | `40 Archives/Projects/Backlog/` |
| someday | `40 Archives/Projects/Someday/` |
| on-hold | `40 Archives/Projects/On Hold/` |
| failed | `40 Archives/Projects/Failed/` |

`Monitoring/` and `Needs Verification/` stay under `10 Projects/` on purpose — still active, just in a specific state. Everything terminal moves to `40 Archives/`. Move the entire folder, not just the index.

## Dev projects: keep a Commit Log

Any project that changes code keeps a Commit Log table in the index — the bridge between decisions and actual changes. Log the short SHA, date, and description immediately after each commit; add reverts as new rows, never delete.

```markdown
## Commit Log
| SHA | Date | Description |
|-----|------|-------------|
| a1b2c3d | 2026-01-15 | Add input validation to the signup form |
```

## Keep the whole file current, then verify

After any real work session: update the Activity Log **and** review the top sections — does Current State still match reality? Are Success Criteria checkboxes current? Did a decision make an earlier section stale? Then re-read the whole index once for consistency: every edit has a blast radius (a changed priority touches the summary, the tables, and any file that references it) — cover it. If you find a mistake, fix every instance of it in this file and in related files, not just the first.

## Self-correction

When the user corrects how projects are managed, follow the `self-learning` skill: record the lesson so it never repeats, and update this workflow if the rule is general.
