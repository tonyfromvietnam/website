import { site, projects } from "@/content/site";

const Eyebrow = ({ children, className = "" }) => (
  <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-ink ${className}`}>{children}</p>
);
const Card = ({ className = "", children }) => (
  <div className={`rounded-[var(--radius-card)] border border-line bg-white ${className}`}>{children}</div>
);
const TONE = { data: "text-data", amber: "text-amber-ink" };

function Ring({ score, size = 148 }) {
  const stroke = 10, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-teal)" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-medium tabular-nums text-slate-deep">{score}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">% recovered</span>
      </div>
    </div>
  );
}

function Preview({ preview }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <Eyebrow className="text-slate-500">Today · example</Eyebrow>
        <span className="rounded-full bg-mint/10 px-2.5 py-1 font-mono text-[11px] font-medium text-teal-ink">{preview.day}</span>
      </div>
      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
        <Ring score={preview.score} />
        <dl className="grid w-full grid-cols-3 gap-2 sm:grid-cols-1">
          {preview.metrics.map((m) => (
            <div key={m.label} className="rounded-lg bg-canvas px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">{m.label}</dt>
              <dd className={`font-mono text-lg font-medium tabular-nums ${TONE[m.tone]}`}>
                {m.value}<span className="ml-0.5 text-xs text-slate-400">{m.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}

function ProjectFeature({ p }) {
  return (
    <article id={p.slug} className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
        <div className="min-w-0">
          <Eyebrow>Case study · {p.kicker}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-deep sm:text-5xl">{p.name}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">{p.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="rounded-md border border-line bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-data">{t}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={p.href} className="rounded-[var(--radius-card)] bg-teal-ink px-5 py-3 font-semibold text-white transition hover:bg-slate-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
              Open the app
            </a>
            <a href={p.repo} className="rounded-[var(--radius-card)] border border-line bg-white px-5 py-3 font-semibold text-slate-deep transition hover:border-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
              See how it's built
            </a>
          </div>
        </div>
        <Preview preview={p.preview} />
      </div>

      <ol className="mt-12 grid gap-4 sm:grid-cols-3">
        {p.steps.map((s, i) => (
          <li key={s.title}>
            <Card className="h-full p-5">
              <p className="font-mono text-xs font-medium text-teal-ink">0{i + 1}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-deep">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </Card>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-[11px] text-slate-500">{p.privacy}</p>
    </article>
  );
}

export default function Home() {
  const brand = site.name || "Build the bridge";
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line/70 bg-canvas/70 backdrop-blur-md">
        <nav className="gutter mx-auto flex h-16 max-w-5xl items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2 font-display text-[15px] font-bold tracking-tight text-slate-deep">
            <span className="h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />{brand}
          </a>
          <div className="flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="#work" className="hover:text-slate-deep">Work</a>
            <a href={site.contact} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-slate-deep hover:border-teal">Connect</a>
          </div>
        </nav>
      </header>

      <main id="top" className="gutter mx-auto max-w-5xl">
        <section className="py-20 sm:py-28">
          <Eyebrow>{site.name || "Data · Engineering · Recovery"}</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-deep sm:text-7xl">
            {site.tagline.replace(/had\.$/, "")}<span className="text-teal-ink">had.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{site.intro}</p>
          <a href="#work" className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-ink hover:text-slate-deep">
            See the problems I've solved <span aria-hidden="true">→</span>
          </a>
        </section>

        <section id="work" aria-label="Work" className="scroll-mt-24 border-t border-line py-20 sm:py-24">
          {projects.map((p) => <ProjectFeature key={p.slug} p={p} />)}
        </section>
      </main>

      <footer className="bg-slate-deep text-slate-300">
        <div className="gutter mx-auto flex max-w-5xl flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-white">{site.tagline}</p>
            <a href={site.contact} className="mt-3 inline-flex items-center gap-2 font-semibold text-mint hover:text-white">
              Connect with me <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="font-mono text-[11px] text-slate-400">© {new Date().getFullYear()} {brand} · London</p>
        </div>
      </footer>
    </>
  );
}
