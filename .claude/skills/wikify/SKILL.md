---
name: wikify
description: "Turn the current workspace into a maintained LLM wiki in one pass. Run it (or say /wikify) when you want your files wikified: it surveys what you have, stands up the master WIKI.md + master log + sub-wikis (operational SOPs, resources/reference, and any personal-takes wiki), then sweeps existing files into small interlinked CONCEPT pages under topic folders, builds the indexes, and links everything so nothing is orphaned. Non-destructive and git-safe: it distills content into pages and commits as it goes. LOAD or fire the slash command on 'wikify my stuff', 'wikify my vault/workspace/notes', 'set up my second brain', 'turn my notes into a wiki', 'organize this into a wiki', 'make my files a wiki'. Uses the llm-wiki skill for the method and rules."
allowed-tools: Read, Edit, Write, Grep, Glob, Bash
disable-model-invocation: false
user-invocable: true
---

# Wikify

The runnable "do it to my stuff" command for the LLM-wiki pattern. `llm-wiki` is the method (structure + rules); this skill executes it over the CURRENT workspace.

**First, load the `llm-wiki` skill and follow its rules:** one concept per page, federated master + sub-wikis, `raw/<topic>/` sources + `<topic>/<concept>.md` pages, `index.md` + `log.md` per wiki, master `WIKI.md` + master `log.md`, projects = execution (findability only), read-map-first. Then run the workflow below.

## Guardrails (read first)

- **Non-destructive and git-safe.** Never delete content. When you split a big file into concept pages, the pages hold the content; replace the original with a short pointer to them OR archive the original, and COMMIT after each batch so every step is recoverable. If the workspace is not a git repo, offer to `git init` first.
- **Survey before touching anything.** Do not impose a structure blind. Read what is already here and map it first.
- **Batches, not a big bang.** Work in reviewable batches (skeleton first, then the biggest and most-referenced files), reporting after each. Stop and ask if a move looks destructive or ambiguous.

## Workflow

1. **Survey.** Glob the workspace. Note the folder layout (PARA or otherwise), the biggest and most-referenced markdown files (theme buckets that hide many concepts), any existing wiki / brain / resources / index, the active projects, and existing `[[links]]`. Summarize what you found and the plan: which wikis, and which files to split first.
2. **Skeleton.** Create the master `WIKI.md` (the map) and master `log.md` (global timeline) at the root. Stand up each sub-wiki with an `index.md` + `log.md` + `raw/`:
   - Operational wiki (SOPs and how-you-operate), e.g. under your system/ops folder.
   - Resources wiki (external reference), e.g. under your resources folder.
   - A personal takes / brain wiki, if you keep one.
   Point the master at each.
3. **Sweep into concept pages.** For each big theme file, split it into one small concept page per concept, under a topic folder, named for the concept, interlinked with `[[wikilinks]]`. Move immutable sources into the right `raw/<topic>/`. Add every page to the correct `index.md`, and append to that wiki's `log.md`.
4. **Index projects for findability, do NOT wikify their internals.** Projects stay execution units. List each active project in the master `WIKI.md` (link + one-line hook), interlink a project to the concepts it uses, and leave its outputs and Activity Log in place (the Activity Log is its log and feeds the master log).
5. **Link and de-orphan.** Make sure every page is reachable from an index or another page. Add the missing cross-references. An orphan page is a bug.
6. **Commit and report.** Commit the batch. Report: wikis created, files split, pages and links added, orphans fixed, and what to review. Continue to the next batch or stop.

## After wikifying

Day-to-day maintenance is the `llm-wiki` skill's Ingest / Query / Lint: new material enters through the inbox and gets ingested into concept pages; every task starts by reading the map and following the links (the anti-forget habit). Re-run `/wikify` any time to sweep newly accumulated files into the wiki.
