// Everything personal lives here, so the pages stay generic.
export const site = {
  name: "", // TODO: your name for the header; the tagline leads until it's set
  tagline: "Build the bridge you wished you'd had.",
  intro:
    "CRM analyst in London and Computer Science graduate. I build small, honest tools for the problems I actually have, starting with my own recovery.",
  links: [{ label: "GitHub", href: "https://github.com/tonyfromvietnam" }],
};

export const projects = [
  {
    slug: "chinh",
    name: "CHINH",
    kicker: "Recovery dashboard",
    summary:
      "Morning data from my strap becomes a recovery score, clear directions and an hour-by-hour plan, scored against my own 30-day baselines.",
    href: "https://tonyfromvietnam.github.io/chinh-recovery/",
    repo: "https://github.com/tonyfromvietnam/chinh-recovery",
    stack: ["React", "Tailwind", "Apple Health", "iOS Shortcuts"],
    steps: [
      { title: "Sync", text: "Helio Strap → Zepp → Apple Health. One Shortcut sends last night's HRV, resting HR and sleep." },
      { title: "Score", text: "Sleep 35% · HRV & RHR 35% · Soreness 20% · Energy 10%, against my own rolling baselines." },
      { title: "Direct", text: "Every direction says what to do and the number behind it, then the day's plan rewrites itself." },
    ],
    privacy: "Health data never leaves the phone. No server, no account.",
  },
];
