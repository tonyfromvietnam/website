// The top ribbon shared with CHINH (chinh-recovery repo, src/components/Ribbon.jsx): signature logo on the
// left, a Home / Health switch in the middle, the theme picker on the right. Keep the two in step.
export const APPS = [
  { id: "home", label: "Home", href: "/" },
  { id: "health", label: "Health", href: "/chinh-recovery" },
];

export function Signature({ className = "" }) {
  return <span aria-hidden="true" className={`signature ${className}`} />;
}

export default function Ribbon({ active = "home", name, children }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-night/85 backdrop-blur-md">
      <nav aria-label="Main" className="gutter relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3">
        <a href="/" aria-label={`${name}, home`} className="-ml-1 flex min-h-11 items-center rounded-[4px] px-1 text-paper transition hover:text-mint">
          <Signature className="h-10 sm:h-12" />
        </a>
        <div className="flex items-center gap-1 rounded-[6px] border border-edge bg-surface p-1 shadow-[inset_0_1px_0_var(--tile-hi)] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          {APPS.map((app) => {
            const on = app.id === active;
            return (
              <a key={app.id} href={app.href} aria-current={on ? "page" : undefined}
                className={`inline-flex min-h-9 items-center rounded-[4px] px-3 text-sm font-semibold transition sm:px-4 ${on ? "bg-mint text-mint-deep" : "text-muted hover:bg-paper/[0.06] hover:text-paper"}`}>
                {app.label}
              </a>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium sm:gap-4">{children}</div>
      </nav>
    </header>
  );
}
