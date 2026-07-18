# The LLM Wiki pattern (background)

A concise summary of the pattern this skill implements. It builds on the public "LLM wiki" idea popularized by Andrej Karpathy (compile knowledge into a maintained wiki instead of retrieving raw chunks each query). The concept-granular layout, the federated master/sub-wiki model, the operational-vs-skills split, and the inbox-as-intake flow below are our own design.

## Concept-granular structure (the concrete layout)

```
<wiki-root>/
  index.md                          global table of contents
  log.md                            append-only operation log
  raw/<topic>/YYYY-MM-DD-source.md  immutable source material
  <topic>/<concept-name>.md         compiled concept pages (one concept each)
```

The rule that makes it work: **one concept per page.** Pages are small, named for a single concept (lowercase-hyphenated), grouped in topic folders, and interlinked with `[[wikilinks]]`. A source is immutable and lives in `raw/`; the agent compiles it into (or updates) the relevant concept pages during ingest. Never dump multiple concepts into one big theme file: that hides the concepts and they never get cross-linked. Compilation happens at ingest, not at query time, and cross-references strengthen as new sources arrive.

## The shift away from plain RAG

Ordinary RAG uploads documents and retrieves chunks at query time. The model rediscovers knowledge from scratch on every question; nothing accumulates. The LLM-wiki pattern is different: the agent **incrementally builds and maintains a persistent, interlinked markdown wiki that sits between you and the raw sources**. Knowledge is compiled once and kept current, not re-derived each query. The wiki is a compounding artifact: cross-references already exist, contradictions already flagged, synthesis already reflects everything read.

You curate sources, direct analysis, and ask questions. The agent does the summarizing, cross-referencing, filing, and consistency bookkeeping that makes a knowledge base actually useful over time. The editor (Obsidian, an IDE, anything) is where you browse; the agent is the author; the wiki is the artifact.

## Three layers

1. **Raw sources** - the immutable collection of originals (articles, papers, transcripts, images, data). The agent reads them, never edits them. Source of truth.
2. **The wiki** - agent-written markdown: summaries, entity pages, concept pages, comparisons, an overview, a synthesis. The agent owns this layer entirely.
3. **The schema** - the config that tells the agent how the wiki is structured and what workflows to follow (for this skill, the SKILL.md plus the master `WIKI.md`). This is what makes the agent a disciplined maintainer rather than a generic chatbot. Co-evolve it as you learn what works.

## Two navigation files per wiki

- **`index.md`** - content-oriented catalog: every page, one line each (link + one-line summary + optional metadata), by category. The agent reads it first to find relevant pages, then drills in. Works well at moderate scale (hundreds of pages) with no embedding infrastructure.
- **`log.md`** - chronological, append-only. Consistent prefixes make it greppable, e.g. `## [2026-04-02] ingest | Article Title`. Gives a timeline of the wiki's evolution.

## Three operations

- **Ingest** - process a new source: read it, write/update pages (one source often touches many), update `index.md`, append to `log.md`.
- **Query** - read the index, read relevant pages, synthesize with citations, and file the good answer back as a new page so explorations compound too.
- **Lint** - periodically health-check: contradictions, stale claims, orphan pages, missing pages, missing cross-references, gaps to fill. Keeps the wiki healthy as it grows.

## Why it works

Maintenance, not reading, is what kills human wikis: the bookkeeping grows faster than the value. An agent does not get bored, does not forget a cross-reference, and can touch many files in one pass, so maintenance cost approaches zero and the wiki stays current. Related in spirit to Vannevar Bush's Memex (1945): a private, actively curated store where the links between documents are as valuable as the documents. Bush could not solve who does the maintenance. The agent does.

## Optional tooling

At small scale the `index.md` is enough to navigate. As a wiki grows you may add a local markdown search tool the agent can shell out to. Frontmatter (tags, dates, source counts) enables dynamic queries if your editor supports them. Everything is optional and modular: adopt what helps, ignore what does not.
