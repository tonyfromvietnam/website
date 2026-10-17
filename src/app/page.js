import { site, projects } from "@/content/site";

const Eyebrow = ({ children }) => (
  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">{children}</p>
);

// Static preview of the CHINH score ring (illustrative, not live data)
function RingPreview({ score = 82, color = "#22e58b", size = 168 }) {
  const stroke = 12, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-bold tabular-nums" style={{ color }}>{score}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">% recovered</span>
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.035] backdrop-blur-xl">
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0">
          <Eyebrow>{p.kicker}</Eyebrow>
          <h2 className="mt-2 font-display text-5xl font-bold tracking-[0.12em] text-slate-100">{p.name}</h2>
          <p className="mt-3 max-w-xl text-slate-300">{p.summary}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={p.href}
              className="rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 font-semibold text-slate-950 shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-white">
              Open the app
            </a>
            <a href={p.repo}
              className="rounded-xl border border-white/15 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-cyan">
              View the code
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 justify-self-center">
          <RingPreview />
          <span className="rounded-full border border-go/40 bg-go/10 px-3 py-1 font-display text-sm font-semibold tracking-[0.08em] text-go">
            HIGH OUTPUT DAY
          </span>
        </div>
      </div>
      <ol className="grid border-t border-white/[0.06] sm:grid-cols-3">
        {p.steps.map((s, i) => (
          <li key={s.title} className="border-white/[0.06] p-6 sm:border-l sm:first:border-l-0 max-sm:border-t max-sm:first:border-t-0">
            <p className="font-mono text-xs text-cyan">0{i + 1} · {s.title}</p>
            <p className="mt-1.5 text-sm text-slate-300">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-6 py-4 sm:px-8">
        <ul className="flex flex-wrap gap-2">
          {p.stack.map((t) => (
            <li key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400">{t}</li>
          ))}
        </ul>
        <p className="font-mono text-[11px] text-slate-500">{p.privacy}</p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-go opacity-20 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan opacity-10 blur-[120px]" />
      </div>

      <div className="gutter relative mx-auto max-w-5xl py-8 sm:py-12">
        <header className="flex items-center justify-between gap-4">
          <span className="font-display text-xl font-bold tracking-[0.14em] text-slate-100">
            {site.name || "BUILD THE BRIDGE"}
          </span>
          <nav className="flex gap-4 text-sm text-slate-400">
            {site.links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-slate-100">{l.label}</a>
            ))}
          </nav>
        </header>

        <section className="py-16 sm:py-24">
          <Eyebrow>{site.name || "Personal site"}</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.02] text-slate-50 sm:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">{site.intro}</p>
        </section>

        <section aria-labelledby="projects">
          <h2 id="projects" className="sr-only">Projects</h2>
          {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </section>

        <footer className="mt-16 flex flex-wrap justify-between gap-3 border-t border-white/[0.06] pt-6 font-mono text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} {site.name || "Build the bridge"}</span>
          <span>London</span>
        </footer>
      </div>
    </div>
  );
}
