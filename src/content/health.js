// A snapshot from CHINH. The app keeps health data on the phone, so this file is
// updated by hand (or by a Shortcut export) rather than read live.
// example: true labels everything on the page as example data.
export const health = {
  example: true,
  updated: "2026-10-26",
  today: { score: 82, day: "High Output Day" },
  // Oldest first; the last entry is today
  last30: [
    64, 71, 58, 66, 74, 79, 69, 52, 61, 70, 77, 81, 73, 68, 59,
    63, 72, 78, 84, 76, 70, 66, 55, 62, 71, 79, 83, 80, 74, 82,
  ],
  metrics: [
    { label: "HRV", unit: "ms", tone: "data", week: [64, 69, 71, 66, 73, 75, 78] },
    { label: "Resting HR", unit: "bpm", tone: "data", week: [53, 52, 51, 52, 50, 49, 48] },
    { label: "Sleep", unit: "h", tone: "amber", week: [6.4, 7.1, 6.8, 7.5, 6.9, 7.8, 7.2] },
  ],
};
