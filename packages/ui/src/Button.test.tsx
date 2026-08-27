import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Reportar</Button>);
    expect(screen.getByRole("button", { name: "Reportar" })).toBeInTheDocument();
  });

  it("calls onPress when clicked", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();

    render(<Button onPress={onPress}>Reportar</Button>);
    await user.click(screen.getByRole("button", { name: "Reportar" }));

    expect(onPress).toHaveBeenCalledOnce();
  });
});
