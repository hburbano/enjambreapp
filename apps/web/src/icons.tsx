/**
 * Icons via unplugin-icons + Iconify JSON packs.
 * Each `~icons/...` import compiles to one SVG component — unused icons never enter the JS bundle.
 *
 * Bee: Material Design Icons (`mdi`)
 * UI chrome: Tabler (`tabler`)
 */
import type { ComponentType, SVGProps } from "react";
import Bee from "~icons/mdi/bee";
import MapPin from "~icons/tabler/map-pin";
import ClipboardList from "~icons/tabler/clipboard-list";
import Book from "~icons/tabler/book";
import User from "~icons/tabler/user";
import CurrentLocation from "~icons/tabler/current-location";
import ArrowLeft from "~icons/tabler/arrow-left";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

function withSize(
  Icon: ComponentType<SVGProps<SVGSVGElement>>,
  defaultSize = 20,
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

export const BeeIcon = withSize(Bee, 22);
export const MapPinIcon = withSize(MapPin, 22);
export const ClipboardListIcon = withSize(ClipboardList, 22);
export const BookIcon = withSize(Book, 22);
export const UserIcon = withSize(User, 22);
export const CurrentLocationIcon = withSize(CurrentLocation, 22);
export const ArrowLeftIcon = withSize(ArrowLeft, 20);

/** MDI bee path — used for Leaflet markers (HTML string, not React). */
const MDI_BEE_PATH =
  "M17.4 9C17 7.8 16.2 7 15 6.5V5h-1v1.4h-.4c-1.1 0-2 .4-2.8 1.2l-.4.4L9 7.5c-.3-.1-.6-.2-1-.2c-.6 0-1.2.2-1.7.6c-.6.4-.9.9-1.1 1.4c-.2.7-.2 1.3 0 2c.3.7.6 1.2 1.1 1.5c-.4 1.5-.1 2.8 1 3.9c.8.8 1.7 1.2 2.8 1.2c.5 0 .8 0 1.1-.1c.6.8 1.4 1.3 2.4 1.3c.3 0 .7 0 1-.1c.6-.2 1-.6 1.4-1.1c.4-.6.6-1.1.6-1.7c0-.4 0-.7-.1-1l-.5-1.6l.6-.4c.8-.8 1.2-1.9 1.1-3.1H19V9zm-9.7 2.3c-.6-.3-.8-.7-.6-1.3q.3-.9 1.2-.6l3.2 1.2c-1.6.8-2.8 1-3.8.7m6.3 5.6c-.6.2-1 0-1.3-.6c-.3-1-.1-2.2.7-3.8l1.2 3.1c.2.7 0 1.1-.6 1.3m1.2-5.3l-.6-1.6v-.1l-.3-.3h-.1L12.6 9c.4-.3.8-.5 1.3-.5s1 .2 1.4.6s.6.8.6 1.3c-.2.3-.4.8-.7 1.2";

export const beeMarkerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#111111" d="${MDI_BEE_PATH}"/></svg>`;
