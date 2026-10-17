import { site, projects } from "@/content/site";

const Eyebrow = ({ children, className = "text-mint-ink" }) => (
  <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${className}`}>{children}</p>
);
const TONE = { data: "text-data-ink", amber: "text-amber" };

function Ring({ score, size = 148 }) {
  const stroke = 10, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <div className="absolute inset-4 rounded-full bg-mint/20 blur-2xl" />
      <svg viewBox={`0 0 ${size} ${size}`} className="relative h-full w-full -rotate-90">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#ring)" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-medium tabular-nums text-paper">{score}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">% recovered</span>
      </div>
    </div>
  );
}

function Preview({ preview }) {
  return (
    <div className="glass p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <Eyebrow className="text-slate-400">Today · example</Eyebrow>
        <span className="rounded-full bg-mint/15 px-2.5 py-1 font-mono text-[11px] font-medium text-mint-ink">{preview.day}</span>
      </div>
      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
        <Ring score={preview.score} />
        <dl className="grid w-full grid-cols-3 gap-2 sm:grid-cols-1">
          {preview.metrics.map((m) => (
            <div key={m.label} className="rounded-lg bg-white/[0.04] px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">{m.label}</dt>
              <dd className={`font-mono text-lg font-medium tabular-nums ${TONE[m.tone]}`}>
                {m.value}<span className="ml-0.5 text-xs text-slate-500">{m.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function ProjectFeature({ p }) {
  return (
    <article id={p.slug} className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
        <div className="min-w-0">
          <Eyebrow>Case study · {p.kicker}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl">{p.name}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">{p.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="rounded-md border border-data-ink/25 bg-data/10 px-2 py-0.5 font-mono text-[11px] font-medium text-data-ink">{t}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={p.href}
              className="rounded-[var(--radius-card)] bg-gradient-to-r from-mint to-data-ink px-5 py-3 font-semibold text-night shadow-[0_8px_30px_-8px_rgba(16,185,129,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-ink">
              Open the app
            </a>
            <a href={p.repo}
              className="rounded-[var(--radius-card)] border border-white/15 bg-white/[0.03] px-5 py-3 font-semibold text-paper transition hover:border-mint-ink/60 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-ink">
              See how it's built
            </a>
          </div>
        </div>
        <Preview preview={p.preview} />
      </div>

      <ol className="mt-12 grid gap-4 sm:grid-cols-3">
        {p.steps.map((s, i) => (
          <li key={s.title} className="glass p-5">
            <p className="font-mono text-xs font-medium text-mint-ink">0{i + 1}</p>
            <h3 className="mt-2 font-display text-lg font-bold text-paper">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-[11px] text-slate-500">{p.privacy}</p>
    </article>
  );
}

export default function Home() {
  const brand = site.shortName || site.name || "Build the bridge";
  return (
    <div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-slate-deep via-night to-night">
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-night/60 backdrop-blur-md">
        <nav className="gutter mx-auto flex h-16 max-w-5xl items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2 font-display text-[15px] font-bold tracking-tight text-paper">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-mint to-data shadow-[0_0_12px_rgba(16,185,129,0.8)]" aria-hidden="true" />
            {brand}
          </a>
          <div className="flex items-center gap-5 text-sm font-medium text-slate-400">
            <a href="#work" className="hover:text-paper">Work</a>
            <a href={site.contact} className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-paper hover:border-mint-ink/60">Connect</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative">
          <div className="aurora" aria-hidden="true" />
          <div className="grid-bg" aria-hidden="true" />
          <div className="gutter relative mx-auto max-w-5xl py-24 sm:py-36">
            <Eyebrow>{site.name || "Data · Engineering · Recovery"}</Eyebrow>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-paper sm:text-7xl">
              {site.tagline.replace(/had\.$/, "")}<span className="text-gradient">had.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{site.intro}</p>
            <a href="#work" className="group mt-8 inline-flex items-center gap-2 font-semibold text-mint-ink hover:text-paper">
              See the problems I've solved <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>
        </section>

        <section id="work" aria-label="Work" className="gutter mx-auto max-w-5xl scroll-mt-24 border-t border-white/[0.06] py-20 sm:py-24">
          {projects.map((p) => <ProjectFeature key={p.slug} p={p} />)}
        </section>
      </main>

      <footer className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-teal/15 to-transparent" aria-hidden="true" />
        <div className="gutter relative mx-auto flex max-w-5xl flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-paper">{site.tagline}</p>
            <a href={site.contact} className="group mt-3 inline-flex items-center gap-2 font-semibold text-mint-ink hover:text-paper">
              Connect with me <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>
          <p className="font-mono text-[11px] text-slate-500">© {new Date().getFullYear()} {brand} · London</p>
        </div>
      </footer>
    </div>
  );
}
