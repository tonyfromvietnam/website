import { site, projects, socials, media, youtubeChannelId } from "@/content/site";
import { health } from "@/content/health";
import { latestYouTube } from "@/lib/youtube";
import Effects from "@/components/Effects";
import Embed from "@/components/Embed";

const Eyebrow = ({ children, className = "text-muted", ...rest }) => (
  <p className={`font-mono text-xs uppercase tracking-[0.14em] ${className}`} {...rest}>{children}</p>
);
const TONE = { data: "text-data", amber: "text-amber" };
const STROKE = { data: "var(--color-data)", amber: "var(--color-amber)" };
const card = "rounded-[var(--radius-card)] border border-edge bg-surface";
const primary = "inline-flex min-h-11 items-center rounded-lg bg-mint px-5 font-semibold text-mint-deep transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint";
const secondary = "inline-flex min-h-11 items-center rounded-lg border border-[#2a3744] px-5 font-semibold text-paper transition hover:border-mint/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint";

// Stroke icons, drawn on a 24px grid
const ICONS = {
  youtube: <><rect x="2.5" y="5" width="19" height="14" rx="4" /><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" /></>,
  tiktok: <><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.4 2.6 2.2 4.4 5 4.6" /></>,
  threads: <><path d="M7.5 6.5h9a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H12l-4 3v-3h-.5a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3z" /></>,
  github: <><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.4 11.4 0 0 0-6 0C6.7 2.6 5.7 2.9 5.7 2.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.3 9.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" /></>,
  sync: <><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.6M20 4v4.6h-4.6" /><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.4M4 20v-4.6h4.6" /></>,
  score: <><path d="M4 16a8 8 0 1 1 16 0" /><path d="M12 16l4-5" /></>,
  direct: <><path d="M5 12h13M13 6l6 6-6 6" /></>,
};
const Icon = ({ name, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[name]}</svg>
);

function Ring({ score, size = 200, stroke = 14 }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-edge)" strokeWidth={stroke} />
        <circle className="arc" cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-mint)" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)}
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

function Health() {
  const { today, last30, metrics, example, updated } = health;
  const avg = Math.round(last30.reduce((a, b) => a + b, 0) / last30.length);
  return (
    <section id="body" aria-label="Health" className="gutter mx-auto max-w-6xl scroll-mt-16 py-20 sm:py-24">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-paper sm:text-5xl" data-reveal>Body, today</h2>
        <Eyebrow>{example ? "Example data" : `Updated ${updated}`} · via CHINH</Eyebrow>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className={`${card} flex flex-col items-center justify-center gap-5 p-8`} data-reveal data-spot>
          <Ring score={today.score} />
          <span className="rounded-full border border-mint/30 px-3 py-1 font-mono text-xs text-mint">{today.day}</span>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((m, i) => {
              const now = m.week.at(-1);
              return (
                <div key={m.label} className={`${card} p-5`} data-reveal data-spot style={{ "--delay": `${i * 90}ms` }}>
                  <Eyebrow className="text-[11px] text-muted">{m.label}</Eyebrow>
                  <p className={`mt-2 font-mono text-4xl tabular-nums ${TONE[m.tone]}`}>
                    <span data-count={now}>{now}</span><span className="ml-1 text-sm text-muted">{m.unit}</span>
                  </p>
                  <div className="mt-3"><Spark values={m.week} tone={m.tone} /></div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">7 days</p>
                </div>
              );
            })}
          </div>

          <div className={`${card} p-5`} data-reveal data-spot style={{ "--delay": "270ms" }}>
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow className="text-[11px] text-muted">Recovery · 30 days</Eyebrow>
              <p className="font-mono text-sm text-paper">avg <span data-count={avg}>{avg}</span>%</p>
            </div>
            <ol className="mt-4 grid grid-cols-10 gap-1.5 sm:grid-cols-15" aria-label={`Daily recovery for 30 days, average ${avg}%`}>
              {last30.map((s, i) => (
                <li key={i} title={`${30 - i === 1 ? "Today" : `${30 - i - 1} days ago`}: ${s}%`}
                  className="aspect-square rounded-[4px] bg-mint transition hover:scale-110"
                  style={{ opacity: 0.12 + Math.max(0, (s - 45) / 45) * 0.88 }}>
                  <span className="sr-only">{s}%</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work({ p }) {
  const steps = [["sync", p.steps[0]], ["score", p.steps[1]], ["direct", p.steps[2]]];
  return (
    <section id="work" aria-label="Work" className="scroll-mt-16 border-t border-line">
      <div className="gutter mx-auto max-w-6xl py-20 sm:py-24">
        <h2 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-paper sm:text-5xl" data-reveal>Built</h2>
        <article id={p.slug} className={`${card} mt-10 grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center`} data-reveal data-spot>
          <div className="min-w-0">
            <Eyebrow className="text-mint">{p.kicker}</Eyebrow>
            <h3 className="mt-3 font-display text-6xl font-extrabold tracking-[-0.04em] text-paper sm:text-7xl">{p.name}</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="rounded-md border border-data/25 px-2.5 py-1 font-mono text-xs text-data">{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={p.href} className={primary}>Open the app</a>
              <a href={p.repo} className={secondary}>See how it's built</a>
            </div>
          </div>
          <ol className="grid grid-cols-3 gap-3 sm:gap-4">
            {steps.map(([icon, s], i) => (
              <li key={s.title} title={s.text} className="flex flex-col items-center gap-3 rounded-xl border border-edge bg-cell px-4 py-6 text-center sm:px-7">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mint/10 text-mint"><Icon name={icon} className="h-6 w-6" /></span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <span className="font-display text-base font-bold text-paper">{s.title}</span>
              </li>
            ))}
          </ol>
        </article>
        <p className="mt-4 font-mono text-xs text-muted">{p.privacy}</p>
      </div>
    </section>
  );
}

const Placeholder = ({ platform, className = "" }) => (
  <div className={`${className} flex flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-dashed border-[#2a3744] text-muted`}>
    <Icon name={platform} className="h-7 w-7" />
    <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Add in site.js</span>
  </div>
);

function Feed({ youtube }) {
  const [video] = youtube;
  return (
    <section id="recent" aria-label="Recent posts" className="scroll-mt-16 border-t border-line">
      <div className="gutter mx-auto max-w-6xl py-20 sm:py-24">
        <h2 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-paper sm:text-5xl" data-reveal>Recently</h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div data-reveal>
            {video?.id ? (
              <Embed platform="youtube" item={video} label={`YouTube video: ${video.title}`} className="relative block aspect-video w-full overflow-hidden rounded-[var(--radius-card)] border border-edge">
                <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                <span className="absolute inset-0 grid place-items-center bg-night/30">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-mint text-mint-deep transition group-hover:scale-110"><Icon name="youtube" className="h-7 w-7" /></span>
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-4 font-semibold text-paper">{video.title}</span>
              </Embed>
            ) : <Placeholder platform="youtube" className="aspect-video w-full" />}
          </div>

          <div className="grid gap-4">
            {media.threads.map((t, i) => (
              <div key={i} data-reveal style={{ "--delay": `${(i + 1) * 90}ms` }}>
                {t.url ? (
                  <Embed platform="threads" item={t} label={`Threads post: ${t.text}`} className={`${card} flex h-full min-h-36 w-full flex-col justify-between gap-4 p-5`}>
                    <span className="flex items-center gap-2 text-muted"><Icon name="threads" /><span className="font-mono text-xs uppercase tracking-[0.14em]">Threads</span></span>
                    <span className="line-clamp-3 text-lg font-medium text-paper">{t.text}</span>
                  </Embed>
                ) : <Placeholder platform="threads" className="h-full min-h-36" />}
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {media.tiktok.map((v, i) => (
            <li key={i} data-reveal style={{ "--delay": `${i * 90}ms` }}>
              {v.id ? (
                <Embed platform="tiktok" item={v} label={`TikTok video: ${v.title}`} className={`${card} relative grid aspect-[9/16] w-full place-items-center overflow-hidden`}>
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-paper/10 text-paper transition group-hover:scale-110 group-hover:bg-mint group-hover:text-mint-deep"><Icon name="tiktok" className="h-6 w-6" /></span>
                  <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-paper">{v.title}</span>
                </Embed>
              ) : <Placeholder platform="tiktok" className="aspect-[9/16] w-full" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const Socials = ({ className = "" }) => (
  <ul className={`flex flex-wrap gap-2 ${className}`}>
    {socials.map((s) => (
      <li key={s.platform}>
        {s.href ? (
          <a href={s.href} aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-lg border border-[#2a3744] text-paper transition hover:-translate-y-0.5 hover:border-mint/60 hover:text-mint">
            <Icon name={s.platform} />
          </a>
        ) : (
          <span title={`Add your ${s.label} link in site.js`} className="grid h-11 w-11 place-items-center rounded-lg border border-dashed border-[#2a3744] text-muted">
            <Icon name={s.platform} /><span className="sr-only">{s.label} (link not set)</span>
          </span>
        )}
      </li>
    ))}
  </ul>
);

export default async function Home() {
  const brand = site.shortName || site.name || "Build the bridge";
  const [lead] = projects;
  // A pinned video wins; otherwise show the channel's newest upload
  const pinned = media.youtube.filter((v) => v.id);
  const youtube = pinned.length ? pinned : await latestYouTube(youtubeChannelId);
  return (
    <div className="min-h-screen overflow-x-clip bg-night">
      <Effects />
      <header className="sticky top-0 z-20 border-b border-line bg-night/85 backdrop-blur-md">
        <nav className="gutter mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2.5 font-display text-[15px] font-bold text-paper">
            <span className="h-2 w-2 rounded-[2px] bg-mint" aria-hidden="true" />
            {brand}
          </a>
          <div className="flex items-center gap-5 text-sm font-medium">
            <a href="#body" className="hidden min-h-11 items-center text-muted hover:text-paper sm:inline-flex">Body</a>
            <a href="#work" className="hidden min-h-11 items-center text-muted hover:text-paper sm:inline-flex">Built</a>
            <a href="#recent" className="inline-flex min-h-11 items-center text-muted hover:text-paper">Recently</a>
            <a href={site.contact} className="inline-flex min-h-11 items-center rounded-lg bg-paper px-4 text-night hover:bg-white">Connect</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="gutter mx-auto max-w-6xl py-20 sm:py-28">
          <Eyebrow data-scramble="">{site.name}</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-paper sm:text-7xl lg:text-[96px]" data-reveal>
            {site.tagline.replace(/had\.$/, "")}<span className="text-mint">had.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-body" data-reveal style={{ "--delay": "120ms" }}>{site.oneLiner}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4" data-reveal style={{ "--delay": "220ms" }}>
            <a href="#work" className={primary}>See what I've built</a>
            <Socials />
          </div>
        </section>

        <Health />
        {lead && <Work p={lead} />}
        <Feed youtube={youtube} />
      </main>

      <footer className="border-t border-line">
        <div className="gutter mx-auto flex max-w-6xl flex-col gap-6 py-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-paper sm:text-[26px]">{site.tagline}</p>
            <Socials className="mt-5" />
          </div>
          <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} {brand} · London</p>
        </div>
      </footer>
    </div>
  );
}
