import type { ReactNode } from "react";

export interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  activeId: string;
  onNavigate: (href: string) => void;
}

export function BottomNav({ items, activeId, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="safe-bottom border-t border-black/8 bg-white/95 backdrop-blur-md"
      aria-label="Navegación principal"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 pt-1 pb-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} className="flex-1">
              <a
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[11px] font-semibold",
                  "outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2",
                  active ? "text-brand-yellow-dark" : "text-neutral-500 hover:text-brand-ink",
                ].join(" ")}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.href);
                }}
              >
                <span
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full",
                    active ? "bg-brand-yellow/35" : "",
                  ].join(" ")}
                  aria-hidden
                >
                  {item.icon}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
