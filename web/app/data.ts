export type Build = {
  name: string;
  /** null for in-house work with nothing public to link to. */
  href: string | null;
  year: string;
  what: string;
  stack: string[];
  status: string;
  /** Shipped work reads in --live; anything unshipped reads in --lab. */
  shipped: boolean;
};

export const builds: Build[] = [
  {
    name: "What's Still Open Sydney",
    href: "https://github.com/donaldchunggit/WhatStillOpenSydney",
    year: "2026 · consumer",
    what: "Finds the venues open around you right now, counts down to last call, and plans a whole night in one tap.",
    stack: ["Next.js", "TypeScript", "Google Places"],
    status: "LIVE",
    shipped: true,
  },
  {
    name: "Snap Ops",
    href: "https://github.com/donaldchunggit/stockkeephelper",
    year: "2026 · internal tool",
    what: "Runs inventory, orders and low-stock alerts for a working retail business. It replaced the spreadsheets, and the staff use it daily.",
    stack: ["Next.js", "Supabase", "Express"],
    status: "IN PROD",
    shipped: true,
  },
  {
    name: "ICP Lead Scraper",
    href: null,
    year: "2026 · in-house",
    what: "Finds and enriches ideal-customer accounts for the growth team, scraping and qualifying them with Firecrawl. It runs the top of the funnel at Habeas.",
    stack: ["Firecrawl", "TypeScript", "Node.js"],
    status: "IN HOUSE",
    shipped: true,
  },
  {
    name: "SEO Cooker",
    href: null,
    year: "2026 · in-house",
    what: "Generates the SEO and GEO content pipeline end to end: briefs, drafts and the queue that ships them. It feeds the growth cycles I own.",
    stack: ["TypeScript", "Next.js", "Claude"],
    status: "IN HOUSE",
    shipped: true,
  },
  {
    name: "ecocompass",
    href: "https://github.com/cw-lynne/csesoc-hackathon-2026",
    year: "2026 · CSESoc Hackathon",
    what: "Takes a bill of materials and returns lower-carbon swaps per line, the requirement each rejected swap failed, a repairability score with design fixes, and a sourced PDF.",
    stack: ["React", "FastAPI", "Claude"],
    status: "SHIPPED",
    shipped: true,
  },
  {
    name: "Wingman",
    href: "https://github.com/chunyin7/wingman",
    year: "2026 · Unihack",
    what: "A rehearsal room for social anxiety. Scenario chat, voice practice, and streaks that get you to come back tomorrow.",
    stack: ["Next.js", "OpenAI", "Supabase"],
    status: "SHIPPED",
    shipped: true,
  },
  {
    name: "FEA Destroyer",
    href: "https://github.com/donaldchunggit/FEAdestroyer",
    year: "2025 · research",
    what: "Reads the geometry of a 2D truss bridge and predicts its stress and deflection without running the solver.",
    stack: ["Python", "NumPy", "FEM"],
    status: "IN LAB",
    shipped: false,
  },
  {
    name: "Quiz Platform API",
    href: "https://github.com/donaldchunggit",
    year: "2025 · backend",
    what: "A Kahoot-shaped REST backend built to production manners: auth, sessions, full CRUD, and tests that actually run.",
    stack: ["TypeScript", "Node.js", "Express"],
    status: "SHIPPED",
    shipped: true,
  },
];

export const roles = [
  {
    role: "Lead Growth Engineer & Head of GTM Strategy",
    org: "Habeas · Growth cycles, SEO & GEO content",
    when: "2026 – now",
  },
  {
    role: "Manager & Lead Sales",
    org: "Snap Wireless · Sydney",
    when: "Nov 2025 – Feb 2026",
  },
  { role: "Founder", org: "Ruggy Ducky Studios · Sydney", when: "Feb 2025 – now" },
  {
    role: "Physics, Maths & Biology Tutor",
    org: "Tuita Tutoring · Sydney",
    when: "Jan 2025 – Jan 2026",
  },
  {
    role: "Photobooth Assistant",
    org: "Happy Cap Studios · Sydney",
    when: "Sep 2024 – now",
  },
];

export const education = [
  {
    role: "Bachelor of Computer Engineering (Honours)",
    org: "UNSW · HD in Information Systems · Distinctions in Data Structures & Algorithms and Backend Programming",
    when: "2024 – 2028",
  },
];

export const ledger = [
  {
    n: "110k",
    l: "Monthly viewers at Ruggy Ducky Studios, grown from zero while directing a team of artists.",
  },
  {
    n: "$100k",
    l: "Revenue led in my first two months at Snap Wireless, before I built their ops tooling.",
  },
  {
    n: "40%",
    l: "Average grade improvement across the students I tutored at Tuita, in physics, maths and biology.",
  },
];

export const stack = [
  { k: "Languages", v: "TypeScript, Python, C, JavaScript, Assembly" },
  { k: "Frontend", v: "Next.js, React, HTML & CSS, interface design" },
  { k: "Backend", v: "Node.js, Express, REST APIs, Supabase, SQLite, Git, Linux" },
  {
    k: "AI",
    v: "Cursor, OpenClaw, LangChain, all frontier models, vision models, self-hosted GLM, AI-native building",
  },
];
