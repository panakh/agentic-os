# Master Log

Global append-only timeline across all wikis and projects. One line per significant event, consistent prefix so it is greppable:

`## [YYYY-MM-DD] event | detail`

Each wiki and each project also keeps its own local log (a Project Activity Log is that project execution timeline); this is the cross-cutting view of all of them. The `llm-wiki` skill keeps it current.

## [start] repo initialised
