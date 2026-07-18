---
name: llm-wiki
description: >-
  Wikify your workspace: build and maintain a living, interlinked markdown
  knowledge base of small CONCEPT pages that the agent writes and keeps current,
  so knowledge is compiled once and easily obtained instead of re-derived every
  query. Use when setting up or maintaining a second brain / knowledge wiki, when
  "wikifying" the operating folders, when ingesting a source (article, paper,
  transcript, brain-dump) into durable concept pages, when writing or updating
  SOPs and custom operating instructions, when answering a question that should
  be filed back as a page, or when health-checking (linting) the wiki. Runs a
  FEDERATED model: a MASTER index (WIKI.md) that points to sub-wikis, each a set
  of one-concept-per-page files under topic folders, with immutable raw sources,
  its own index.md, and an append-only log.md. Sub-wikis: an OPERATIONAL wiki
  (SOPs + custom "how we do X", complementary to skills) and a RESOURCES wiki
  (external reference). TRIGGER: 'wikify', 'set up my second brain', 'llm wiki',
  'build a knowledge wiki', 'ingest this source', 'add an SOP', 'operational
  wiki', 'resources wiki', 'master wiki', 'lint the wiki', 'file this back'.
---

# LLM Wiki

Turn your workspace into a knowledge base the agent maintains for you. Instead of the agent re-reading raw files and re-deriving the answer every query (plain RAG), it **compiles knowledge once into small interlinked concept pages and keeps them current**. Cross-references are already there, contradictions already flagged, synthesis already reflects everything read. You curate sources and ask questions; the agent does the bookkeeping.

You (rarely) write the wiki. The agent writes and maintains it. Background: `references/llm-wiki-pattern.md`.

## The one rule that matters most: ONE CONCEPT PER PAGE

The wiki is **interlinks of concepts, not big files with everything dumped in one place.** Each page covers a single concept, named for that concept, and stays small. When a source or a note spans several concepts, split it into several concept pages and link them, never one long theme-dump.

Bad (a theme bucket): `ai-systems.md` holding "runs-itself", "agent-vs-chatbot", "loops", "files-over-vectors" in one 60-line file.
Good (concept pages): `ai-systems/company-that-runs-itself.md`, `ai-systems/agent-vs-chatbot.md`, `ai-systems/loop-engineering.md`, `ai-systems/files-over-vectors.md`, each small, each `[[linking]]` to the others.

Small concept pages are what make the wiki searchable, linkable, and non-redundant. A big file hides its concepts and never gets cross-linked.

## Layout of one wiki

```
<wiki-root>/
  index.md                          global table of contents (grouped by topic)
  log.md                            append-only operation log
  raw/<topic>/YYYY-MM-DD-source.md  immutable source material (never edited)
  <topic>/<concept-name>.md         compiled concept pages (one concept each)
```

- `raw/` holds the **immutable** originals the agent reads but never edits (articles, transcripts, brain-dumps). Date-prefixed under a topic folder.
- `<topic>/<concept-name>.md` are the **compiled** pages the agent owns. Lowercase-hyphenated concept names, grouped in topic folders.
- `index.md` lists every concept page, one line each (`[[topic/concept-name]] - one-line summary`), grouped by topic. Read it first.
- `log.md` is append-only, one line per event with a greppable prefix: `## [YYYY-MM-DD] ingest | Title`.

## Federated: one master, many wikis, one master log

```
WIKI.md                 MASTER index - points to every wiki + active project + Key facts
log.md                  MASTER log - global append-only timeline (cross-cutting chronology)
├─ Operational wiki     your SOPs + custom "how WE do X"    (e.g. 90 System/Operations/)
├─ Resources wiki       external reference / research       (e.g. 30 Resources/)
└─ Projects             active work - EXECUTION, indexed for findability (e.g. 10 Projects/)
```

- **Master wiki (`WIKI.md`, root)** is the one map: a link + one-line hook per knowledge wiki and per active project, plus durable "Key facts". Read it FIRST. It holds no concept content; it points to each `index.md`.
- **Master log (`log.md`, root)** is the global timeline: an append-only, cross-cutting record of significant events across all wikis and projects, so the chronological view is never lost even though each wiki and each project also keeps its own local log. One line per event, consistent prefix `## [YYYY-MM-DD] ...`.
- Each **knowledge wiki** (operational, resources) uses the concept-page layout above (its own `index.md`, `log.md`, `raw/`, topic folders). Separate indexes, not one over everything.
- Add more knowledge wikis the same way (a personal "takes / brain" wiki, a per-client wiki). The master always points to them.

## Start every task by reading the map (so related files are never forgotten)

The failure a wiki exists to prevent is working from memory and missing a related file. So the first move on ANY task is NOT to start doing it:

1. Read the master `WIKI.md`.
2. Read the `index.md` of the wiki (or the project) the task touches.
3. Follow the `[[wikilinks]]` from there to the related concept pages, and skim the relevant `log.md` for recent history.

Structure makes related files reachable; this rule makes the agent reach for them. A page with no inbound links is invisible in practice, so Lint treats orphans as bugs: every page must be reachable from an index or another page.

## Operational wiki vs skills (complementary, not competing)

| | Skill | Operational wiki concept page |
|---|---|---|
| What | a reusable, portable procedure | your custom SOP / local knowledge |
| Scope | general, works for anyone | specific to how YOU operate |
| Lives in | `.claude/skills/` | the operational wiki |
| Example | "how to publish a post" (steps) | "our posting times, our accounts, our voice rules" |

A skill is the general procedure everyone gets; an operational concept page is your customization the skill points into. "How do WE do X here" should be a quick concept page, not buried chat memory and not a fork of the skill.

## Projects are execution, not a knowledge wiki

A project is an EXECUTION mechanism: tasks, decisions, an Activity Log, and outputs. Do not turn it into a pile of concept pages. Wikify projects for FINDABILITY only:

- The master `WIKI.md` lists each active project (link + one-line hook) so the agent finds it.
- A project's `index.md` interlinks (`[[...]]`) to the wiki concepts it uses; its **Activity Log is its execution timeline** (and feeds the master `log.md`).
- Durable, reusable knowledge distills OUT of the project INTO the operational or resources wiki as a concept page that LINKS BACK to the project. Knowledge is cross-cutting; the project is the action home.
- **Outputs** a project produces (drafts, renders, reports, code) **stay in the project folder** under `10 Projects/`. The wiki may `[[link]]` to an output; it never absorbs it.

## Capture: the inbox is the front door

`00 Inbox/` is the universal intake, PARA/GTD style: chuck anything in (a thought, a link, a strategy note, an operational insight, a pasted article) without deciding where it belongs. Nothing is sorted at capture time. Processing an inbox item IS the Ingest step below: the agent reads it and routes it to the right place. A durable source worth re-citing lands in the target wiki's `raw/<topic>/`; a quick thought just distills into a concept page and the original inbox note is archived (e.g. `40 Archives/Processed Inbox/`). So the inbox is the shared raw intake; each wiki's `raw/` holds the keep-worthy sources after routing.

## Operations

- **Ingest** (= process an inbox item, or a source dropped straight into a wiki). If it is a durable source, put it in `raw/<topic>/YYYY-MM-DD-*.md` (immutable). Read it, identify the distinct concepts in it, and for each write or update a small concept page under `<topic>/`. Link related concepts with `[[wikilinks]]`. Update the sub-wiki `index.md` (add a line per new page) and append to its `log.md`. Note where new information supersedes an old claim (edit that concept page, do not fork it). One source often touches several concept pages.
- **Query.** Read the master, then the relevant sub-wiki `index.md`, then the concept pages it points to. Answer with citations back to `raw/`. **File a good answer back** as a new concept page if it is durable, so explorations compound too.
- **Lint** (periodic). Scan for: theme-dumps that should be split into concept pages, contradictions between pages, stale claims a newer source superseded, orphan pages with no inbound links, concepts mentioned but lacking a page, missing cross-references, index entries that no longer resolve. Fix or flag; suggest the next questions or sources.

## Wikify an existing workspace (first run)

1. Create `WIKI.md` at the root as the master map.
2. Stand up each sub-wiki (operational, resources) with an `index.md` + `log.md` + a `raw/` folder.
3. Sweep existing files. For any theme-bucket file, split it into one concept page per concept under a topic folder, and interlink them. File external reference into the resources wiki, operating knowledge into the operational wiki. Add every page to the right `index.md` and point the master at each sub-wiki.
4. From then on every new source or note goes through Ingest, one concept per page.

## Why it works

The tedious part of a knowledge base is the bookkeeping, not the reading: keeping summaries current, linking concepts, flagging contradictions across many pages. Humans abandon wikis because maintenance grows faster than value. The agent does not get bored and can touch many pages in one pass, so maintenance cost approaches zero and the wiki stays current. Your job: curate sources, direct the analysis, ask good questions. The agent's job: everything else.

## Notes
- Plain markdown in a git repo: version history and diffing for free.
- This skill maintains the wiki; it does not replace your project or area files. Project outputs stay in projects; the master wiki points at everything.
- Full pattern + attribution: `references/llm-wiki-pattern.md`.
