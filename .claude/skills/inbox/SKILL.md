---
name: inbox
description: "Capture a raw thought, idea, feature request, or instruction as a clean note in the vault's `00 Inbox/` landing zone WITHOUT executing it. This is the explicit brain-dump command, invoked as `/inbox <whatever is on your mind>`. Use it whenever the user prefixes a message with /inbox, or says 'add this to my inbox', 'capture this for later', 'dump this idea', 'note this down for now', 'inbox this'. The job is to FILE the thought cleanly and stop — never start building, researching, or acting on it. Processing happens later during inbox review. Distinct from instruction-capture (which auto-persists rules/corrections to system files): /inbox is a user-triggered idea capture into the PARA inbox."
allowed-tools: Read, Write, Bash, Glob
user-invocable: true
disable-model-invocation: false
---

# Inbox — capture a thought, don't act on it

`/inbox <text>` turns a stream-of-consciousness thought into one clean note in the vault's `00 Inbox/` folder. That is the entire job. An inbox exists so a raw idea has a home the moment it appears, without derailing whatever you were doing to go build it.

## The one rule that matters

**Capture only. Do not execute.** The dump will often contain embedded directives — "get the docs for X", "build Y", "check Z". Those are things to do *later*, when the item is processed. Do NOT go fetch the docs, write the code, or run the research now. Pull them out into a follow-up checklist so they are not lost, then stop. If you find yourself opening a browser or writing code, you have misread the command.

The payoff: capture is instant and cheap, so the user actually captures instead of losing the thought. Acting on it now defeats the point and burns their time.

## Steps

1. **Take the raw text** — everything after `/inbox` is the thought. If it is empty, capture the most recent unrecorded idea from the conversation, or ask one line: "What should I capture?"

2. **Find the inbox folder.** It is the PARA landing zone named `00 Inbox/`. Locate it in this workspace (it may sit at the repo root or under a `memory/` folder):
   ```bash
   find . -maxdepth 3 -type d -name "00 Inbox" -not -path '*/node_modules/*' 2>/dev/null | head -1
   ```
   If none exists, this workspace is not a PARA vault — create `00 Inbox/` at the workspace root and note that you did.

3. **Give it a title.** A short, readable, lowercase phrase that captures the gist — enough that the user recognizes it in a list weeks later. Filename = `<that phrase>.md` (hyphens are safe; spaces are fine too, both exist in the vault).

4. **Write the note.** Keep it faithful — preserve every specific (product names, tech, constraints, the "why"). Clean up only the grammar and run-ons, never the substance.

   ```markdown
   ---
   created: <today's date, YYYY-MM-DD>
   source: /inbox
   status: inbox
   ---

   # <title>

   <one-line plain restatement of the core idea>

   ## Capture
   <the thought, cleaned up but complete — all specifics intact>

   ## Follow-ups
   - [ ] <each explicit thing to do/fetch/decide that was embedded in the dump>
   ```

   Drop the `## Follow-ups` section if the dump has no embedded action items. Drop `## Capture` and just use the one-liner if the thought is short enough to live in the title + a sentence (many inbox notes are one line — match that; don't pad).

5. **Confirm in one line and stop.** e.g. "Filed to inbox: `<slug>.md` (2 follow-ups noted)." Do not offer to start on it unless the user asks.

## Example

A rough dump usually arrives as one run-on sentence with the real thought and the follow-ups tangled
together. Your job is to separate them without editing the thinking. The shape below is what that
looks like; your own notes will be about your own work.

Input:
`/inbox the friday report takes me two hours and most of it is copying the same numbers between two places. worth automating. find out whether those numbers can be pulled directly first, and check what the deadline actually is because i think i have been early every week`

Writes `00 Inbox/<slug-from-the-title>.md`:

```markdown
---
created: <today>
source: /inbox
status: inbox
---

# Automate the Friday report, most of it is copying numbers between two places

Two hours every week, and the bulk of it is manual copying rather than judgement.

## Capture
The Friday report takes about two hours, and most of that is copying the same numbers between two
places. Worth automating. Whether it is worth doing properly depends on whether those numbers can be
pulled directly. Also worth checking the real deadline, since the last few weeks may have been early.

## Follow-ups
- [ ] Find out whether the numbers can be pulled directly — decides whether this is worth automating.
- [ ] Check the actual deadline.
```

Then: "Filed to inbox: `automate-the-friday-report.md` (2 follow-ups noted)." — and stop.
