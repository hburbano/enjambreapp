import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BottomNav } from "./BottomNav";

const items = [
  { id: "mapa", label: "Mapa", href: "/", icon: <span>M</span> },
  { id: "reportes", label: "Reportes", href: "/reportes", icon: <span>R</span> },
];

describe("BottomNav", () => {
  it("renders nav items", () => {
    render(
      <BottomNav items={items} activeId="mapa" onNavigate={() => undefined} />,
    );

    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Mapa/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /Reportes/ })).toBeInTheDocument();
  });

  it("calls onNavigate when an item is clicked", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(
      <BottomNav items={items} activeId="mapa" onNavigate={onNavigate} />,
    );

    await user.click(screen.getByRole("link", { name: /Reportes/ }));

    expect(onNavigate).toHaveBeenCalledWith("/reportes");
  });
});
