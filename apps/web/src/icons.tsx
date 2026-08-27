/**
 * Icons via unplugin-icons + Iconify JSON packs.
 * Each `~icons/...` import compiles to one SVG component — unused icons never enter the JS bundle.
 *
 * Bee: custom outline (Lucide Lab path) — all sizes/strokes live in `bee` below.
 * UI chrome: Tabler (`tabler`)
 */
import type { ComponentType, SVGProps } from "react";
import MapPin from "~icons/tabler/map-pin";
import ClipboardList from "~icons/tabler/clipboard-list";
import Book from "~icons/tabler/book";
import User from "~icons/tabler/user";
import CurrentLocation from "~icons/tabler/current-location";
import ArrowLeft from "~icons/tabler/arrow-left";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

/**
 * Single source of truth for the bee glyph.
 * Call sites pass `beeSize.*` / use `beePinDiscHtml` — no raw bee px at the edge.
 */
export const bee = {
  viewBox: 24,
  /** Pixel sizes by role */
  size: {
    /** Inside the hex brand mark */
    brand: 20,
    /** Buttons, FAB, nav-adjacent */
    chrome: 20,
    /** List / card leading marks */
    list: 22,
    /** Detail / empty-state hero */
    hero: 44,
    /** Inside the map pin disc */
    marker: 22,
  },
  /** Stroke weight in viewBox units, keyed by optical band */
  stroke: {
    sm: 1.5,
    md: 1.6,
    lg: 1.75,
  },
  /** Leaflet pin chrome around the marker glyph */
  pin: {
    disc: 36,
    border: 1.5,
    fill: "#F5C518",
    ink: "#111111",
  },
} as const;

/** Role → pixel size. Prefer this at call sites. */
export const beeSize = bee.size;

/** Path from Lucide Lab (`lucide-lab:bee`, ISC) — one body for React + Leaflet. */
const BEE_PATHS = [
  "m8 2 1.88 1.88m4.24 0L16 2M9 7V6a3 3 0 1 1 6 0v1M5 7a3 3 0 1 0 2.2 5.1C9.1 10 12 7 12 7s2.9 3 4.8 5.1A3 3 0 1 0 19 7Zm2.56 5h8.87M7.5 17h9",
  "M15.5 10.7c.9.9 1.4 2.1 1.5 3.3c0 5.8-5 8-5 8s-5-2.2-5-8c.1-1.2.6-2.4 1.5-3.3",
] as const;

/** Stroke for a given pixel size — bands derived from `bee.size`, not magic cutoffs. */
export function beeStrokeFor(size: number): number {
  if (size >= bee.size.hero) return bee.stroke.lg;
  if (size >= bee.size.list) return bee.stroke.md;
  return bee.stroke.sm;
}

function withSize(
  Icon: ComponentType<SVGProps<SVGSVGElement>>,
  defaultSize: number = bee.size.chrome,
) {
  return function SizedIcon({
    size = defaultSize,
    width,
    height,
    ...props
  }: IconProps) {
    return (
      <Icon
        width={width ?? size}
        height={height ?? size}
        aria-hidden={props["aria-hidden"] ?? true}
        {...props}
      />
    );
  };
}

/**
 * Outline bee — same stroke language as Tabler (round caps/joins).
 * Default size/stroke come from `bee`; override only when a role needs it.
 */
export function BeeIcon({
  size = bee.size.chrome,
  strokeWidth,
  width,
  height,
  ...props
}: IconProps & { strokeWidth?: number | string }) {
  const numericSize =
    typeof size === "number" ? size : Number(size) || bee.size.chrome;
  const stroke = strokeWidth ?? beeStrokeFor(numericSize);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${bee.viewBox} ${bee.viewBox}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={props["aria-hidden"] ?? true}
      {...props}
    >
      {BEE_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export const MapPinIcon = withSize(MapPin, bee.size.list);
export const ClipboardListIcon = withSize(ClipboardList, bee.size.list);
export const BookIcon = withSize(Book, bee.size.list);
export const UserIcon = withSize(User, bee.size.list);
export const CurrentLocationIcon = withSize(CurrentLocation, bee.size.list);
export const ArrowLeftIcon = withSize(ArrowLeft, bee.size.chrome);

const markerStroke = beeStrokeFor(bee.size.marker);
const beePathsMarkup = BEE_PATHS.map((d) => `<path d="${d}"/>`).join("");

/** Stroke bee for Leaflet markers (HTML string, not React). */
export const beeMarkerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${bee.size.marker}" height="${bee.size.marker}" viewBox="0 0 ${bee.viewBox} ${bee.viewBox}" fill="none" stroke="${bee.pin.ink}" stroke-width="${markerStroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${beePathsMarkup}</svg>`;

/** Full map-pin disc HTML — disc size/border/colors from `bee.pin`. */
export const beePinDiscHtml = `<div style="
  width:${bee.pin.disc}px;height:${bee.pin.disc}px;border-radius:9999px;
  background:${bee.pin.fill};border:${bee.pin.border}px solid ${bee.pin.ink};
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 10px rgba(0,0,0,.25);
">${beeMarkerSvg}</div>`;
