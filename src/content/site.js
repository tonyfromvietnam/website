// Everything personal lives here, so the pages stay generic.
export const site = {
  name: "Duy Chinh (Tony) Dinh",
  shortName: "Tony Dinh",
  tagline: "Build the bridge you wished you'd had.",
  intro:
    "CRM analyst in London and Computer Science graduate. I build small, honest tools for the problems I actually have, starting with my own recovery.",
  // Colour theme visitors see first: "sand" | "linen" | "espresso" | "night" (they can switch in the header)
  theme: "sand",
  oneLiner:"CRM analyst · CS graduate · London. I build tools for my own problems.",
  links: [{ label: "GitHub", href: "https://github.com/tonyfromvietnam" }],
  contact: "https://github.com/tonyfromvietnam", // swap for email or LinkedIn
};

// Profile links: an empty href shows as a dashed "add link" chip until filled in
export const socials = [
  { platform: "youtube", label: "YouTube", href: "https://www.youtube.com/@DuyChinhDinh" },
  { platform: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@duychinhdinh" },
  { platform: "threads", label: "Threads", href: "https://www.threads.com/@duychinhdinhh" },
  { platform: "github", label: "GitHub", href: "https://github.com/tonyfromvietnam" },
];

// @DuyChinhDinh. With no pinned video below, the newest upload comes from the public feed hourly
export const youtubeChannelId = "UCgY4LkpXig7NgdzH6zGgCqg";

// Pinned posts, newest first. Everything shows in the site's own cards; the players load only on tap.
// TikTok: caption is optional (TikTok's own caption fills in when blank); likes are copied by hand.
// Threads has no public API for post text, so text, date and counts are copied by hand.
export const media = {
  youtube: [{ id: "J9Wb7HvOiLo", title: "DU HỌC ANH - SVUK CUP 2022 | Bradford" }],
  tiktok: [
    { id: "7140951295875157253", caption: "“Một ngày” làm thêm của du học sinh Anh Quốc", likes: "391" },
    { id: "7183247798597340422", caption: "Phòng trọ của du học sinh Anh Quốc", likes: "233" },
    { id: "7249487584005475611", caption: "", likes: "" },
    { id: "7258577600979717403", caption: "", likes: "" },
  ],
  threads: [
    {
      url: "https://www.threads.com/@duychinhdinhh/post/Der2hopjCeM",
      date: "2026-10-20", likes: "1.2K", replies: "42",
      text: "Có ai mới sang UK mà thắc mắc tại sao cái máy giặt luôn nằm trong nhà bếp không?\nĐang xào nấu thơm lừng thì nghe tiếng máy giặt vắt quần áo rung cả sàn.\nTư duy thiết kế của tư bản khó hiểu thật sự =))",
    },
    {
      url: "https://www.threads.com/@duychinhdinhh/post/DeSGk5dCXgI",
      date: "2026-10-09", likes: "88", replies: "2",
      text: "Hồi mới sang UK du học, rồi bắt đầu đi làm - mình thỉnh thoảng bị FOMO.\nThấy bạn bè check-in ăn hàng, du lịch châu Âu suốt, cũng chạnh lòng.\nNhưng ở London đủ lâu, đóng tiền nhà vài năm, mình nhận ra: Hạnh phúc không phải là mua đồ hiệu - mà là thẻ cuối tháng vẫn còn dư tiền, đi siêu thị nhặt đồ không cần nhìn giá.",
    },
  ],
};

export const profile = { display: "Đinh Duy Chính", initials: "DC", threads: "duychinhdinhh", tiktok: "duychinhdinh", youtube: "DuyChinhDinh" };

export const projects = [
  {
    slug: "chinh",
    name: "CHINH",
    kicker: "Recovery dashboard",
    summary:
      "Morning data from my strap becomes a recovery score, clear directions and an hour-by-hour plan, scored against my own 30-day baselines.",
    href: "/chinh-recovery",
    repo: "https://github.com/tonyfromvietnam/chinh-recovery",
    stack: ["React", "Tailwind", "Apple Health", "iOS Shortcuts"],
    steps: [
      { title: "Sync", text: "Helio Strap → Zepp → Apple Health. One Shortcut sends last night's HRV, resting HR and sleep." },
      { title: "Score", text: "Sleep 35% · HRV & RHR 35% · Soreness 20% · Energy 10%, against my own rolling baselines." },
      { title: "Direct", text: "Every direction says what to do and the number behind it, then the day's plan rewrites itself." },
    ],
    privacy: "Health data never leaves the phone. No server, no account.",
    // Illustrative numbers for the preview card, not live data
    preview: { score: 82, day: "High Output Day", metrics: [
      { label: "HRV", value: "78", unit: "ms", tone: "data" },
      { label: "Resting HR", value: "48", unit: "bpm", tone: "data" },
      { label: "Sleep", value: "7.2", unit: "h", tone: "amber" },
    ] },
  },
];
