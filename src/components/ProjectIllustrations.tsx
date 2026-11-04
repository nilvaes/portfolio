/**
 * Lightweight, CSS-only illustrations for projects that have no public
 * screenshot (private source / desktop app). They use theme tokens, so they
 * adapt to light and dark mode automatically.
 */

export function OnboardingIllustration() {
  const docs = [
    { name: "Arbeitsvertrag.pdf", done: true },
    { name: "IT-Richtlinien.pdf", done: true },
    { name: "Datenschutz.pdf", done: false },
  ];

  return (
    <div className="flex aspect-[16/10] w-full overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-2xl shadow-black/20" aria-hidden>
      {/* Sidebar */}
      <div className="hidden w-1/4 flex-col gap-2 border-r border-ink/10 bg-ink/4 p-3 sm:flex">
        <div className="mb-2 h-3 w-2/3 rounded bg-accent/60" />
        {["w-3/4", "w-1/2", "w-2/3", "w-3/5"].map((w, i) => (
          <div key={i} className={`h-2 rounded ${i === 1 ? "bg-accent/50" : "bg-ink/12"} ${w}`} />
        ))}
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div className="h-3 w-1/3 rounded bg-ink/25" />
          <div className="flex gap-1.5">
            <span className="rounded-full bg-mint/20 px-2 py-0.5 text-[9px] font-semibold text-ink/70">HR</span>
            <span className="rounded-full bg-accent/25 px-2 py-0.5 text-[9px] font-semibold text-ink/70">Admin</span>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="mb-1 flex justify-between text-[9px] text-muted">
            <span>Onboarding</span>
            <span>66%</span>
          </div>
          <div className="h-1.5 rounded-full bg-ink/10">
            <div className="h-full w-2/3 rounded-full bg-linear-to-r from-accent to-accent-2" />
          </div>
        </div>

        {/* Documents */}
        <div className="flex flex-col gap-2">
          {docs.map((doc) => (
            <div key={doc.name} className="flex items-center gap-2 rounded-lg border border-ink/8 bg-primary/40 px-2.5 py-2">
              <div className="grid size-5 shrink-0 place-items-center rounded bg-accent/20 text-[9px] text-accent">▤</div>
              <span className="flex-1 truncate text-[10px] text-ink/80">{doc.name}</span>
              <span
                className={`grid size-4 place-items-center rounded-full text-[8px] ${
                  doc.done ? "bg-mint/80 text-white" : "border border-ink/20"
                }`}
              >
                {doc.done ? "✓" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Key({ children, wide = false }: { children: string; wide?: boolean }) {
  return (
    <kbd
      className={`grid h-12 place-items-center rounded-xl border border-ink/15 bg-surface text-sm font-semibold text-ink shadow-[0_4px_0_0] shadow-ink/15 md:h-14 md:text-base ${
        wide ? "px-5 md:px-6" : "w-12 md:w-14"
      }`}
    >
      {children}
    </kbd>
  );
}

export function SwitchAudioIllustration() {
  return (
    <div
      className="relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-xl border border-ink/10 bg-linear-to-br from-surface to-primary shadow-2xl shadow-black/20"
      aria-hidden
    >
      <div className="hero-grid absolute inset-0 opacity-60" />

      <div className="relative flex items-center gap-2 md:gap-3">
        <Key wide>Ctrl</Key>
        <span className="text-muted">+</span>
        <Key wide>Alt</Key>
        <span className="text-muted">+</span>
        <Key>S</Key>
      </div>

      {/* Windows-style toast */}
      <div className="relative w-64 rounded-lg border border-ink/10 bg-surface/90 p-3 shadow-xl backdrop-blur md:w-72">
        <div className="flex items-center gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-md bg-accent/20 text-base">🔊</div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-ink">Switch Audio</p>
            <p className="truncate text-[11px] text-muted">Headphones (USB Audio) ✓</p>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <div className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-end gap-3 border-t border-ink/10 bg-surface/70 px-4 text-[10px] text-muted backdrop-blur">
        <span className="size-2 rounded-full bg-mint" />
        <span>🔊</span>
        <span>14:32</span>
      </div>
    </div>
  );
}
