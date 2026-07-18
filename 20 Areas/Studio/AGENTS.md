# Studio

Your local dashboards. Each app is its own self-contained folder:

```
Studio/
  Mission_Control/   index.html + mission_control_data.js + engine/
  <Add-on app>/      index.html + <app>_data.js + engine/
```

An app folder holds everything it needs: the HTML page, its `*_data.js` data file (the store, read on load, no server, no database), and an `engine/` folder for any scripts it uses. Open an app by opening its `index.html` in a browser.

**Mission Control** ships with the starter kit. It is your cockpit over the whole workspace.

**Adding a system you unlocked:** drop its folder in here, and copy its skills into `.claude/skills/`. That is the whole install. Remove it by deleting the folder and its skills.
