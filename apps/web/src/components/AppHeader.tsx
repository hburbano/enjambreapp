import { BeeIcon } from "../icons";

export function AppHeader() {
  return (
    <header className="safe-top z-20 border-b border-black/8 bg-white/90 px-4 pb-3 pt-2 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <BrandMark />
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-extrabold tracking-wide text-brand-ink uppercase leading-tight">
            Enjambres Colombia
          </p>
          <p className="truncate text-xs text-neutral-600">
            Juntos protegemos a las abejas
          </p>
        </div>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <div
      className="relative flex h-11 w-11 shrink-0 items-center justify-center"
      aria-hidden
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full">
        <polygon
          points="24,2 44,13 44,35 24,46 4,35 4,13"
          fill="#111111"
        />
        <polygon
          points="24,6 40,15 40,33 24,42 8,33 8,15"
          fill="#F5C518"
        />
      </svg>
      <BeeIcon size={20} className="relative z-10 text-brand-ink" />
    </div>
  );
}
