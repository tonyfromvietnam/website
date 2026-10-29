import { site, projects, socials, media, profile, youtubeChannelId } from "@/content/site";
import { liveHealth } from "@/lib/stats";
import { latestYouTube } from "@/lib/youtube";
import { tiktokCards } from "@/lib/social";
import Effects from "@/components/Effects";
import DotGrid from "@/components/DotGrid";
import Heartbeat from "@/components/Heartbeat";
import Clock from "@/components/Clock";
import YouTubePlayer from "@/components/YouTubePlayer";
import TikTokPlayer from "@/components/TikTokPlayer";
import ThemeSwitch from "@/components/ThemeSwitch";
import Ribbon from "@/components/Ribbon";

const Eyebrow = ({ children, className = "text-muted", ...rest }) => (
  <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${className}`} {...rest}>{children}</p>
);
const TONE = { data: "text-data", amber: "text-amber" };
const STROKE = { data: "var(--color-data)", amber: "var(--color-amber)" };
const primary = "inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-mint px-5 font-semibold text-mint-deep shadow-[0_8px_24px_-10px_var(--color-mint)] transition hover:-translate-y-px hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint";
const secondary = "inline-flex min-h-11 items-center rounded-[4px] border border-edge bg-paper/[0.03] px-5 font-semibold text-paper transition hover:-translate-y-px hover:border-mint/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint";

// One bento tile: reveal on scroll, cursor spotlight, border beam and tilt on hover, staggered by grid position
function Tile({ className = "", delay = 0, children, as: Tag = "div", ...rest }) {
  return (
    <Tag data-reveal data-spot style={{ "--delay": `${delay * 70}ms` }}
      className={`tile overflow-hidden ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

// Stroke icons, drawn on a 24px grid
const ICONS = {
  youtube: <><rect x="2.5" y="5" width="19" height="14" rx="4" /><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" /></>,
  tiktok: <><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.4 2.6 2.2 4.4 5 4.6" /></>,
  threads: <><path d="M7.5 6.5h9a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H12l-4 3v-3h-.5a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3z" /></>,
  github: <><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.4 11.4 0 0 0-6 0C6.7 2.6 5.7 2.9 5.7 2.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.3 9.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" /></>,
  sync: <><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.6M20 4v4.6h-4.6" /><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.4M4 20v-4.6h4.6" /></>,
  score: <><path d="M4 16a8 8 0 1 1 16 0" /><path d="M12 16l4-5" /></>,
  direct: <><path d="M5 12h13M13 6l6 6-6 6" /></>,
  heart: <><path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z" /></>,
  reply: <><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" /></>,
  out: <><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
};
const Icon = ({ name, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[name]}</svg>
);

// Score ring inside a dial of 60 ticks; ticks up to the score light up one after another
function Ring({ score, size = 220, stroke = 12 }) {
  const ticks = 60, outer = size / 2 - 1, r = outer - 16 - stroke / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" aria-hidden="true">
        {Array.from({ length: ticks }, (_, i) => {
          const a = (i / ticks) * 2 * Math.PI, long = i % 5 === 0, inner = outer - (long ? 9 : 5);
          return (
            <line key={i} className={`tick ${i / ticks < score / 100 ? "on" : ""}`} style={{ "--i": i }}
              x1={size / 2 + Math.cos(a) * inner} y1={size / 2 + Math.sin(a) * inner}
              x2={size / 2 + Math.cos(a) * outer} y2={size / 2 + Math.sin(a) * outer}
              stroke="var(--color-mint)" strokeWidth={long ? 1.6 : 1} />
          );
        })}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-edge)" strokeWidth={stroke} />
        <circle className="arc" cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-mint)" strokeWidth={stroke}
          strokeLinecap="butt" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)}
          style={{ "--full": c, "--off": c * (1 - score / 100) }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-6xl font-medium tabular-nums text-paper" data-count={score}>{score}</span>
        <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">% recovered</span>
      </div>
    </div>
  );
}

function Spark({ values, tone }) {
  const w = 120, h = 36, lo = Math.min(...values), hi = Math.max(...values), span = hi - lo || 1;
  const d = values.map((v, i) => `${i ? "L" : "M"}${(i / (values.length - 1)) * w},${h - 4 - ((v - lo) / span) * (h - 8)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-full" preserveAspectRatio="none" aria-hidden="true">
      <path className="spark" d={d} pathLength="1" fill="none" stroke={STROKE[tone]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// Bars that rise from the baseline, the last (today) in full colour
function Bars({ values, tone }) {
  const hi = Math.max(...values);
  return (
    <div className="flex h-9 items-end gap-1" aria-hidden="true">
      {values.map((v, i) => (
        <span key={i} className={`bar flex-1 ${tone === "amber" ? "bg-amber" : "bg-data"}`}
          style={{ "--i": i, height: `${(v / hi) * 100}%`, opacity: i === values.length - 1 ? 1 : 0.35 }} />
      ))}
    </div>
  );
}

const SocialLinks =({ className = "" }) => (
  <ul className={`flex flex-wrap gap-2 ${className}`}>
    {socials.filter((s) => s.href).map((s) => (
      <li key={s.platform}>
        <a href={s.href} aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-[4px] border border-edge bg-paper/[0.03] text-paper transition hover:-translate-y-0.5 hover:border-mint/60 hover:text-mint">
          <Icon name={s.platform} />
        </a>
      </li>
    ))}
  </ul>
);

function ThreadsCard({ post, delay }) {
  const when = new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return (
    <Tile as="a" href={post.url} delay={delay}
      className="group flex flex-col gap-4 p-5 hover:border-mint/40 focus-visible:outline-2 focus-visible:outline-mint col-span-2 sm:col-span-1 lg:col-span-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-mint to-data font-display text-sm font-bold text-mint-deep">{profile.initials}</span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate font-semibold text-paper">{profile.display}</span>
          <span className="block truncate font-mono text-xs text-muted">@{profile.threads} · {when}</span>
        </span>
        <Icon name="threads" className="h-5 w-5 text-muted transition group-hover:text-paper" />
      </div>
      <p lang="vi" className="line-clamp-5 whitespace-pre-line text-[15px] leading-relaxed text-body">{post.text}</p>
      <div className="mt-auto flex items-center gap-5 font-mono text-xs text-muted">
        <span className="flex items-center gap-1.5"><Icon name="heart" className="h-4 w-4" />{post.likes}</span>
        <span className="flex items-center gap-1.5"><Icon name="reply" className="h-4 w-4" />{post.replies}</span>
        <span className="ml-auto flex items-center gap-1 text-mint opacity-0 transition group-hover:opacity-100">Read on Threads<Icon name="out" className="h-3.5 w-3.5" /></span>
      </div>
    </Tile>
  );
}

export default async function Home() {
  const brand = site.shortName || site.name || "Build the bridge";
  const [p] = projects;
  // Live from CHINH when it's switched on, otherwise the example numbers in content/health.js
  const { today, last30, metrics, example, updated, avg30 } = await liveHealth();
  const scored = last30.filter((s) => s != null);
  const avg = avg30 ?? Math.round(scored.reduce((a, b) => a + b, 0) / Math.max(1, scored.length));
  const updatedLabel = updated && new Date(`${updated}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/London" });
  // A pinned video wins; otherwise show the channel's newest upload
  const pinned = media.youtube.filter((v) => v.id);
  const [video] = pinned.length ? pinned : await latestYouTube(youtubeChannelId);
  const tiktoks = await tiktokCards(media.tiktok.filter((v) => v.id), profile.tiktok);
  const steps = [["sync", p.steps[0]], ["score", p.steps[1]], ["direct", p.steps[2]]];

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <DotGrid />
      <Effects />
      <Ribbon active="home" name={brand}>
        <a href="#work" className="hidden min-h-11 items-center text-muted hover:text-paper lg:inline-flex">Built</a>
        <a href="#recent" className="hidden min-h-11 items-center text-muted hover:text-paper lg:inline-flex">Recently</a>
        <ThemeSwitch fallback={site.theme || "sand"} />
        <a href={site.contact} className="hidden min-h-11 items-center rounded-[4px] bg-paper px-4 font-semibold text-night transition hover:bg-mint sm:inline-flex">Connect</a>
      </Ribbon>

      <main id="top" className="gutter mx-auto max-w-6xl py-8 sm:py-12">
        <div className="grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">

          {/* Intro */}
          <Tile className="relative flex flex-col justify-between gap-10 p-7 col-span-2 sm:p-10 lg:col-span-8 lg:row-span-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint/70" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" /></span>
              <Eyebrow className="text-mint" data-scramble="">{site.name}</Eyebrow>
            </div>
            <div>
              <h1 className="max-w-2xl font-display text-[44px] font-bold leading-[1] tracking-[-0.045em] text-paper sm:text-6xl lg:text-[76px]" aria-label={site.tagline}>
                {site.tagline.split(" ").map((w, i, all) => (
                  <span key={i} aria-hidden="true" className={`word ${i === all.length - 1 ? "text-mint" : ""}`} style={{ "--i": i }}>{w}{i < all.length - 1 ? " " : ""}</span>
                ))}
              </h1>
              <p className="mt-5 max-w-lg text-lg text-body">{site.oneLiner}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#work" className={primary}>See what I've built</a>
              <SocialLinks />
            </div>
          </Tile>

          {/* Recovery */}
          <Tile id="body" delay={1} className="flex scroll-mt-24 flex-col items-center justify-center gap-5 p-7 col-span-2 lg:col-span-4 lg:row-span-2">
            <Eyebrow>{example ? "Recovery · example" : `Recovery · ${updatedLabel}`}</Eyebrow>
            <Ring score={today.score} />
            <span className="rounded-[3px] border border-mint/30 bg-mint/[0.06] px-2.5 py-1 font-mono text-xs uppercase tracking-[0.1em] text-mint">{today.day}</span>
          </Tile>

          {/* Vitals */}
          {metrics.map((m, i) => {
            // Live data is a 7-day average (never one day's reading); the example shows its last day
            const now = m.now ?? m.week.at(-1);
            return (
              <Tile key={m.key} delay={2 + i} className="p-5 lg:col-span-3">
                <Eyebrow>{m.label}{example ? "" : " · 7-day avg"}</Eyebrow>
                <p className={`mt-2 font-mono text-3xl tabular-nums sm:text-4xl ${TONE[m.tone]}`}>
                  <span data-count={now}>{now}</span><span className="ml-1 text-sm text-muted">{m.unit}</span>
                </p>
                <div className="mt-3">
                  {m.key === "rhr" ? <Heartbeat bpm={Math.round(now)} />
                    : m.key === "sleep" ? <Bars values={m.week} tone={m.tone} />
                    : <Spark values={m.week} tone={m.tone} />}
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {m.key === "rhr" ? `Beating at ${Math.round(now)} bpm` : "7 days"}
                  {m.change != null && m.change !== 0 ? ` · ${m.change > 0 ? "+" : "−"}${Math.abs(m.change)} vs last week` : ""}
                </p>
              </Tile>
            );
          })}
          <Tile delay={5} className="flex flex-col justify-between p-5 lg:col-span-3">
            <Eyebrow>Local time</Eyebrow>
            <div className="mt-4"><Clock /></div>
          </Tile>

          {/* Build */}
          <Tile as="article" id="work" delay={0} className="flex scroll-mt-24 flex-col gap-7 p-7 col-span-2 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Eyebrow className="text-mint">Built · {p.kicker}</Eyebrow>
                <h2 className="mt-2 font-display text-6xl font-extrabold tracking-[-0.04em] text-paper">{p.name}</h2>
              </div>
              <ul className="flex flex-wrap gap-2 sm:max-w-[16rem] sm:justify-end">
                {p.stack.map((t) => <li key={t} className="rounded-[3px] border border-data/25 px-2.5 py-1 font-mono text-xs text-data">{t}</li>)}
              </ul>
            </div>
            <ol className="grid grid-cols-3 gap-3">
              {steps.map(([icon, s], i) => (
                <li key={s.title} title={s.text} className="flex flex-col items-center gap-2 rounded-[4px] border border-edge bg-cell px-3 py-5 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-mint/10 text-mint"><Icon name={icon} className="h-5 w-5" /></span>
                  <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                  <span className="font-display text-sm font-bold text-paper sm:text-base">{s.title}</span>
                </li>
              ))}
            </ol>
            <div className="mt-auto flex flex-wrap items-center gap-3">
              <a href={p.href} className={primary}>Open the app</a>
              <a href={p.repo} className={secondary}>See how it's built</a>
              <span className="font-mono text-[11px] text-muted">{p.privacy}</span>
            </div>
          </Tile>

          {/* 30 days */}
          <Tile delay={1} className="flex flex-col p-6 col-span-2 lg:col-span-5">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow>Recovery · 30 days</Eyebrow>
              <p className="font-mono text-sm text-paper">avg <span data-count={avg}>{avg}</span>%</p>
            </div>
            <ol className="mt-5 grid grid-cols-10 gap-1.5" aria-label={`Daily recovery for 30 days, average ${avg}%`}>
              {last30.map((s, i) => (
                <li key={i} title={`${i === last30.length - 1 ? "Today" : `${last30.length - 1 - i} days ago`}: ${s == null ? "no data" : `${s}%`}`}
                  className={`cell aspect-square rounded-[2px] hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-mint ${s == null ? "border border-dashed border-edge bg-transparent" : "bg-mint"}`}
                  style={{ "--i": i, "--o": s == null ? 1 : 0.12 + Math.max(0, (s - 45) / 45) * 0.88 }}>
                  <span className="sr-only">{s == null ? "no data" : `${s}%`}</span>
                </li>
              ))}
            </ol>
            <p className="mt-auto pt-5 font-mono text-[11px] text-muted">{example ? "Example data" : `Live · updated ${updatedLabel}`} · via CHINH</p>
          </Tile>

          {/* YouTube */}
          {video && (
            <Tile id="recent" delay={0} className="scroll-mt-24 col-span-2 lg:col-span-8 lg:row-span-2 lg:flex">
              <YouTubePlayer id={video.id} title={video.title} channel={`@${profile.youtube}`} />
            </Tile>
          )}

          {/* Threads */}
          {media.threads.filter((t) => t.url).map((t, i) => (
            <ThreadsCard key={t.url} post={t} delay={1 + i} />
          ))}

          {/* TikTok: a header strip, then a swipeable row on phones and four up on desktop */}
          <section aria-label="TikTok" className="col-span-2 lg:col-span-12">
            <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4" data-reveal>
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-paper">TikTok</h2>
                <span className="font-mono text-xs text-muted">@{profile.tiktok}</span>
              </div>
              {socials.find((s) => s.platform === "tiktok")?.href && (
                <a href={socials.find((s) => s.platform === "tiktok").href} className={`${secondary} min-h-10 px-4 text-sm`}>Follow</a>
              )}
            </div>
            <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
              {tiktoks.map((v, i) => (
                <li key={v.id} data-reveal className="w-[64%] shrink-0 snap-start sm:w-auto" style={{ "--delay": `${i * 70}ms` }}>
                  <TikTokPlayer item={v} handle={profile.tiktok} index={i + 1} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="gutter mx-auto flex max-w-6xl flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-paper sm:text-[26px]">{site.tagline}</p>
            <SocialLinks className="mt-5" />
          </div>
          <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} {brand} · London</p>
        </div>
      </footer>
    </div>
  );
}
