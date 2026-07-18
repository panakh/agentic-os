/* =============================================================================
   MISSION CONTROL - DATA SIDECAR  (window.MC_DATA)   [EXAMPLE DATA]

   This is a COMPLETE WORKED EXAMPLE. index.html reads window.MC_DATA and renders
   it - no data lives in the page, and nothing is stored in localStorage. This .js
   file on disk IS the store. Edit it (or have your agent edit it) to reflect YOUR
   own projects, goals, and funnel.

   HOW YOUR AGENT REGENERATES IT - re-scan your workspace:
     1. WINDOW    - your current planning cycle (e.g. a 12-week block): start,
                    end = start + N days, dayOf = days elapsed + 1.
     2. NOW       - the few most important next-actions right now, one per lane.
     3. GOALS     - read your goal files; pull target/deadline + baseline/done.
                    Never fabricate progress; unknown baseline = baseline:null.
     4. KANBAN    - scan your active projects, bucket by lifecycle stage. Each
                    card = name + focus + the next concrete action.
     5. ENGINE    - your system map: the spine (how value flows to revenue/impact)
                    + feeders (which area feeds which spine node).
     6. AREAS     - ongoing responsibilities with no end date.
     7. DASHBOARDS- other .html apps you have added. Paid add-on systems appear
                    here once you copy their folder in.
   Paths are relative to this folder and URL-encoded (spaces = %20).
   Bump meta.version so index.html's ?v= cache-bust picks up the new file.
   ============================================================================= */
window.MC_DATA = {
  meta: {
    version: "1.0",
    generated: "your last scan",
    vault: "my agentic os",
    today: "",
    tz: "your timezone",
    status: "ALL SYSTEMS NOMINAL",
    window: { label: "Planning Cycle · Example", start: "", end: "", days: 84, dayOf: 1, weeks: 12, weekOf: 1 },
    stats: [
      { label: "Active projects", value: "3", note: "example - your status: active files" },
      { label: "Tracked goals", value: "1", note: "example - your goal files" },
      { label: "Kanban cards", value: "4", note: "example - active projects with a live next-action" },
      { label: "Inbox", value: "0", note: "notes waiting to be filed" }
    ]
  },

  /* NOW: the few things that matter most right now. One per lane, pulled honestly
     from the hottest project in it. Replace with yours. */
  now: [
    { block: "BUILD", accent: "gold", project: "Your current build",
      focus: "The one thing you are making this week.",
      action: "The very next concrete step to move it forward.",
      href: "../../../10%20Projects/Welcome_Project/index.md" },
    { block: "PROMOTE", accent: "hot", project: "Your audience play",
      focus: "How people discover you - the channel you are actually running.",
      action: "The next post, video, or share to ship.",
      href: "../../../10%20Projects/Welcome_Project/index.md" },
    { block: "DELIVER", accent: "cyan", project: "Your offer",
      focus: "What people can get from you today.",
      action: "The next thing to deliver or improve for a customer.",
      href: "../../../10%20Projects/Welcome_Project/index.md" }
  ],

  /* GOALS: your real goal files. Keep baselines honest - never invent progress. */
  goals: [
    {
      name: "Your first measurable goal",
      product: "Example",
      unit: "done",
      baseline: 0, baselineVerified: true,
      target: 3, done: 0,
      deadline: "",
      metric: "State the goal as a number with a deadline. Edit this to your own.",
      note: "Example goal. Replace with a real one; set done from real progress only.",
      href: "../../../05%20Goals/example-goal.md"
    }
  ],

  /* KANBAN: your active projects, bucketed by lifecycle stage. */
  kanban: [
    { key: "now", title: "Now · Focus", tone: "hot",
      hint: "this week", cards: [
      { name: "Welcome Project", tag: "example",
        focus: "The example project that ships with your Agentic OS. Shows the file format.",
        next: "Open it, then create your first real project alongside it.",
        href: "../../../10%20Projects/Welcome_Project/index.md" },
      { name: "Your second project", tag: "example",
        focus: "Whatever you are actively working on.",
        next: "Add its next concrete action here.",
        href: "../../../10%20Projects/Welcome_Project/index.md" }
    ] },
    { key: "content", title: "Content & Audience", tone: "cyan",
      hint: "the discovery engine", cards: [
      { name: "Your content project", tag: "example",
        focus: "How you show up publicly - video, writing, whatever your channel is.",
        next: "Queue the next piece.",
        href: "../../../10%20Projects/Welcome_Project/index.md" }
    ] },
    { key: "verify", title: "Shipped · Verify", tone: "good",
      hint: "landed - check it worked", cards: [
      { name: "Something you shipped", tag: "example",
        focus: "Work that is done but still worth confirming landed.",
        next: "Verify the result, then archive it.",
        href: "../../../10%20Projects/Welcome_Project/index.md" }
    ] }
  ],

  /* ENGINE: your system map. spine = how value flows toward revenue/impact;
     feeders = which area feeds which spine node. This is an example funnel. */
  engine: {
    spine: [
      { id: "content",  label: "Content",   sub: "how people find you", href: null },
      { id: "audience", label: "Audience",  sub: "attention + trust",   href: null },
      { id: "community",label: "Community", sub: "where they gather",   href: null },
      { id: "offer",    label: "Offer",     sub: "what they buy",       href: null }
    ],
    feeders: [
      { label: "Content Creation", sub: "your publishing cadence", into: "content", tone: "ongoing", href: null },
      { label: "Distribution",     sub: "quick shares",           into: "content", tone: "ongoing", href: null },
      { label: "Product / Offer",  sub: "what you sell",          into: "offer",   tone: "active",  href: null }
    ]
  },

  /* AREAS: ongoing responsibilities from your 20 Areas/ files. */
  areas: [
    { name: "Content Creation", tag: "ongoing",
      focus: "Your regular publishing - the top of the funnel.",
      href: null },
    { name: "Product / Offer", tag: "ongoing",
      focus: "What you sell and how you deliver it.",
      href: null }
  ],

  /* DASHBOARDS: other .html apps you have added. Paid add-on systems (Lead Studio,
     Content Leaderboard, ...) appear here once you copy their folder into Studio. */
  dashboards: []
};
