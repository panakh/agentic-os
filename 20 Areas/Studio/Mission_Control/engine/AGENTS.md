# Engine

Deterministic, repeatable data jobs for the Studio dashboards live here as small scripts (the "repository functions"). The idea: your agent should spend its thinking on judgement (which lead to chase, what to post, what to do next), not on rewriting the same fetch-and-parse code every time. So the mechanical parts (harvest, enrich, send, parse, write the sidecar) become scripts it runs.

The rule of thumb:

- **Script = the repeated mechanical work.** It reads and writes the dashboard's `*_data.js` sidecar directly.
- **Agent = the judgement.** It decides how to call the script, then makes sure the dashboard data ended up updated.
- **No drift.** If a script does something with a real side effect (sends a message, publishes a post), it records that in the same run, so the dashboard always reflects reality.

The starter kit ships with Mission Control, which needs no engine scripts (your agent writes its data file directly). Add-on systems you unlock (a lead pipeline, a content leaderboard) drop their engine scripts in here.
