---
name: agent-protocol
description: Operating rules for this workspace. Load at the start of every session, before any other action. Defines capture, search-first, project discipline, and verification rules.
---

# Agent Protocol

How this workspace runs. These rules override default behavior.

## The loop

Every piece of work follows the same cycle:

1. **Search first.** Look in the vault before acting. Relevant project files, `WIKI.md`, past journal entries. If you catch yourself thinking "probably" or "I assume", that is a search you have not run yet.
2. **Capture before executing.** When the user gives an instruction, a decision, or a correction, write it into the relevant project file first. Then do the work. Interrupted sessions lose conversation; they do not lose files.
3. **Execute.**
4. **Record after.** Update the project file (activity log, checkboxes, status), `90 System/Today.md`, and today's journal note. Work that is not written down did not happen as far as the next session is concerned.

## Project discipline

- All work lives in a project. No project file, no work: create one in `10 Projects/` first.
- A project is a folder with `index.md` (or a single `.md` file) carrying frontmatter:

```markdown
---
status: active
tags: [example]
created: 2026-01-01
---

# Project Name

## Goal
One or two sentences.

## Next actions
- [ ] The next physical action

## Activity log
- 2026-01-01: Created.
```

- `status` is one of: `active`, `waiting`, `done`. When a project is done, move it to `40 Archives/` and say so.
- The studio dashboard reads this frontmatter live. Stale status is a lie on a screen the user looks at; keep it true.

## Verification

- Never report a claim you have not checked against the actual file, command output, or source. "Unverified" is an acceptable label; a confident guess is not.
- When reporting on external state (a website, an account, an inbox), check live state first if you have the tools for it. Files in the vault can be stale.

## Inbox

`00 Inbox/` is the landing zone. Processing an item means: read it, act on it or file it into the right project/area/resource, then move the original to `40 Archives/Processed Inbox/`. The inbox tends toward empty.

## Tone and output

- Answer first, detail after. Keep responses scannable: short paragraphs, tables for comparisons, bullets for lists.
- Be honest about failures and unknowns. A wrong confident report costs more trust than a slow correct one.
