import { health as example } from "@/content/health";

// CHINH's public summary (chinh-recovery repo, api/stats.js): score, day type, 30 daily scores, and
// HRV / resting HR / sleep as 7-day averages only. Refreshed every 15 minutes; until it's switched on
// (PUBLIC_STATS=on in CHINH's Vercel project), or if it fails, the page keeps the example data.
const STATS_URL = process.env.CHINH_STATS_URL || "https://chinh-recovery.vercel.app/api/stats"; // override for local testing
const TRENDS = [
  { key: "hrv", label: "HRV", tone: "data" },
  { key: "rhr", label: "Resting HR", tone: "data" },
  { key: "sleep", label: "Sleep", tone: "amber" },
];

export async function liveHealth() {
  try {
    const res = await fetch(STATS_URL, { next: { revalidate: 900 } });
    if (!res.ok) return example;
    const s = await res.json();
    const trends = TRENDS.map((t) => ({ ...t, ...s.trends?.[t.key] }));
    if (!s?.today || !Array.isArray(s.last30) || trends.some((t) => t.avg7 == null)) return example;
    return {
      example: false,
      updated: s.updated,
      today: s.today,
      last30: s.last30,
      avg30: s.avg30,
      metrics: trends.map((t) => ({ key: t.key, label: t.label, unit: t.unit, tone: t.tone, now: t.avg7, change: t.change,
        week: t.week.filter((v) => v != null) })),
    };
  } catch {
    return example;
  }
}
