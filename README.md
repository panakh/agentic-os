# Agentic OS

Your own AI operating system, running in Claude Code. A structured workspace, the skills that make an agent genuinely useful day to day, and a local dashboard over all of it. Clone it, open it in Claude Code, and you have an agent that captures what you tell it, keeps your projects straight, and learns from your corrections.

## Get started

1. Clone it (or download the ZIP):
   ```
   git clone https://github.com/panakh/agentic-os.git
   ```
2. Open the folder in Claude Code:
   ```
   cd agentic-os
   claude
   ```
3. Claude reads `CLAUDE.md` and loads the protocol skills. Tell it what you are working on. It files everything into the workspace for you.

## What is inside

- **A workspace that stays organized.** PARA folders (`00 Inbox`, `10 Projects`, `20 Areas`, `30 Resources`, `40 Archives`, `90 System`, `Journal`). Everything the agent records has a home, so nothing gets lost between sessions.
- **The skills that make it agentic on day one:**
  - `agent-protocol`, how work gets captured and recorded
  - `memory-sync`, so nothing you say gets forgotten
  - `self-learning`, so corrections become permanent rules
  - `llm-wiki`, turns your files into a maintained knowledge wiki: a master `WIKI.md` over sub-wikis (your SOPs, and your reference/research)
  - `wikify`, the runnable version: say `/wikify` (or "wikify my stuff") and your agent sets the whole wiki up from your existing files
- **Mission Control**, a local dashboard. A cockpit over your projects, goals, and system, read live from a data file your agent keeps current. No server, no accounts, nothing leaves your machine.

## Open the dashboard

Open `20 Areas/Studio/Mission_Control/index.html` in any browser. It ships with example data so you can see the shape. Then ask your agent, "refresh Mission Control from my workspace," and it rewrites the data file with your real projects. The `.js` file on disk is the store: no database, no localStorage, nothing to sync.

## Grow it

This is the starter kit. Bigger systems (a content engine, a lead-generation pipeline, and more) arrive as add-ons. An add-on is one folder you copy into `20 Areas/Studio/`, plus its skills copied into `.claude/skills/`. That is the whole install. New systems are released to the community as new videos ship.

## Community

Built by [Hashin Panakkaparambil](https://github.com/panakh). Get the add-on systems, ask questions, and share what you build with your Agentic OS: [AI Makers on Skool](https://www.skool.com/ai-makers-4434).

MIT licensed. Yours to fork and make your own.
