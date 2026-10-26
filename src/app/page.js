import { site, projects } from "@/content/site";

const Eyebrow = ({ children, className = "text-muted" }) => (
  <p className={`font-mono text-xs uppercase tracking-[0.14em] ${className}`}>{children}</p>
);
const TONE = { data: "text-data", amber: "text-amber" };
const primary = "inline-flex min-h-11 items-center rounded-lg bg-mint px-5 font-semibold text-mint-deep transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint";
const secondary = "inline-flex min-h-11 items-center rounded-lg border border-[#2a3744] px-5 font-semibold text-paper transition hover:border-mint/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint";

function Ring({ score, size = 148 }) {
  const stroke = 10, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-edge)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-mint)" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-medium tabular-nums text-paper">{score}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">% recovered</span>
      </div>
    </div>
  );
}

function Preview({ name, preview }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-edge bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <Eyebrow className="text-[11px] text-muted">{name} · today · example</Eyebrow>
        <span className="shrink-0 whitespace-nowrap rounded-full border border-mint/30 px-2 py-1 font-mono text-[11px] text-mint">{preview.day}</span>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-6">
        <Ring score={preview.score} />
        <dl className="min-w-36 flex-1">
          {preview.metrics.map((m) => (
            <div key={m.label} className="flex items-baseline justify-between border-b border-line py-2 last:border-0">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{m.label}</dt>
              <dd className={`font-mono text-xl tabular-nums ${TONE[m.tone]}`}>
                {m.value}<span className="ml-1 text-xs text-muted">{m.unit}</span>
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
      <Eyebrow className="text-mint">Case study · {p.kicker}</Eyebrow>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-10">
        <div className="min-w-0 max-w-2xl">
          <h2 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-paper sm:text-6xl">{p.name}</h2>
          <p className="mt-4 text-lg leading-relaxed text-body">{p.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={p.href} className={primary}>Open the app</a>
          <a href={p.repo} className={secondary}>See how it's built</a>
        </div>
      </div>

      <ul className="mt-7 flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <li key={t} className="rounded-md border border-data/25 px-2.5 py-1 font-mono text-xs text-data">{t}</li>
        ))}
      </ul>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-edge bg-edge sm:grid-cols-3">
        {p.steps.map((s, i) => (
          <li key={s.title} className="bg-cell p-7">
            <h3 className="font-mono text-xs font-normal text-mint">0{i + 1} → {s.title}</h3>
            <p className="mt-3.5 text-[15px] leading-relaxed text-body">{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 font-mono text-xs text-muted">{p.privacy}</p>
    </article>
  );
}

export default function Home() {
  const brand = site.shortName || site.name || "Build the bridge";
  const [lead] = projects;
  return (
    <div className="min-h-screen overflow-x-clip bg-night">
      <header className="sticky top-0 z-20 border-b border-line bg-night/85 backdrop-blur-md">
        <nav className="gutter mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2.5 font-display text-[15px] font-bold text-paper">
            <span className="h-2 w-2 rounded-[2px] bg-mint" aria-hidden="true" />
            {brand}
          </a>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#work" className="inline-flex min-h-11 items-center text-muted hover:text-paper">Work</a>
            <a href={site.contact} className="inline-flex min-h-11 items-center rounded-lg bg-paper px-4 text-night hover:bg-white">Connect</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="gutter mx-auto grid max-w-6xl items-center gap-14 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0">
            <Eyebrow>{site.name} · London</Eyebrow>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-paper sm:text-7xl lg:text-[88px]">
              {site.tagline.replace(/had\.$/, "")}<span className="text-mint">had.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-body sm:text-[19px]">{site.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#work" className={primary}>See the problems I've solved</a>
              {site.links.map((l) => <a key={l.href} href={l.href} className={secondary}>{l.label}</a>)}
            </div>
          </div>
          {lead && <Preview name={lead.name} preview={lead.preview} />}
        </section>

        <section id="work" aria-label="Work" className="scroll-mt-16 border-t border-line">
          <div className="gutter mx-auto max-w-6xl py-20 sm:py-24">
            {projects.map((p) => <ProjectFeature key={p.slug} p={p} />)}
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="gutter mx-auto flex max-w-6xl flex-col gap-6 py-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-paper sm:text-[26px]">{site.tagline}</p>
            <a href={site.contact} className="group mt-3 inline-flex items-center gap-2 font-semibold text-mint hover:text-paper">
              Connect with me <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>
          <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} {brand} · London</p>
        </div>
      </footer>
    </div>
  );
}
