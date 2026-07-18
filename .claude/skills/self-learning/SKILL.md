---
name: self-learning
description: How this workspace improves itself over time. Load when a session ends, when a mistake repeats, when the same task shape appears more than twice, or when reviewing what the system has learned. Defines the graduation ladder from observation to skill.
---

# Self-Learning

The system gets better by turning experience into files. Lessons climb a ladder; each rung is a different kind of file.

## The graduation ladder

1. **Observation.** Something happened worth noting (a fix, a preference, a surprise). Record it where it happened: project activity log or journal.
2. **Pattern.** The same observation shows up two or three times. Promote it to a note in `30 Resources/Lessons.md` (create on first use): one line per lesson, what happened, what to do instead.
3. **Rule.** The pattern is stable and changes behavior. Promote it into the file that governs the behavior: `CLAUDE.md` for session-wide rules, the relevant skill for workflow rules. Delete or link the lessons entry so there is one source of truth.
4. **Skill.** The pattern is a whole repeatable workflow, not just a rule. Create a new skill folder in `.claude/skills/<name>/SKILL.md`: a name, a description saying exactly when to load it, and the steps. Write it in plain language, portable, no tool names hardcoded.

Never skip rungs upward without evidence. One occurrence is an anecdote, not a rule.

## Session-end review

At the natural end of a working session, spend one pass asking:

- Did the user correct me? Each correction must already be a guardrail (see `memory-sync`). Verify it landed.
- Did I do the same multi-step thing for the second or third time? Candidate for a skill.
- Did anything surprise me about the tools, the vault, or the user? Record it.
- Is anything in `Lessons.md` ready to graduate up the ladder?

## What NOT to capture

- One-off trivia with no future value.
- Anything already obvious from the files themselves (structure, history).
- Secrets or credentials in plain text.
- Rules the user explicitly revoked. Delete revoked rules everywhere; a dead rule that still fires is worse than no rule.

## Consolidation

When `Lessons.md` grows past roughly thirty entries, consolidate: merge duplicates, graduate the stable ones, delete the stale ones. A short accurate memory beats a long noisy one.
