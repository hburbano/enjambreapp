import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends AriaButtonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-brand-yellow text-brand-ink hover:brightness-95 data-pressed:brightness-90 shadow-sm",
  secondary:
    "bg-brand-ink text-white hover:bg-neutral-800 data-pressed:bg-neutral-900",
  ghost:
    "bg-transparent text-brand-ink hover:bg-black/5 data-pressed:bg-black/10",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3",
        "font-display text-sm font-bold tracking-wide uppercase",
        "outline-none transition-[filter,background-color,transform]",
        "data-focus-visible:ring-2 data-focus-visible:ring-brand-ink data-focus-visible:ring-offset-2",
        "data-disabled:opacity-50 data-disabled:cursor-not-allowed",
        variantClass[variant],
        className,
      ].join(" ")}
    >
      {children}
    </AriaButton>
  );
}
