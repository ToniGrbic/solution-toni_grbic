import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Input from "./Input";

describe("Input", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("associates the label with the input via id and name", () => {
    render(<Input label="Korisničko ime" name="username" />);

    const input = screen.getByLabelText("Korisničko ime");

    expect(input).toHaveAttribute("id", "username");
    expect(input).toHaveAccessibleName("Korisničko ime");
  });

  it("calls onChange when the user types", () => {
    const onChange = vi.fn();

    render(
      <Input
        label="Pretraga"
        name="search"
        value=""
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Pretraga"), {
      target: { value: "phone" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("exposes error state for assistive technologies", () => {
    render(
      <Input
        label="Max. cijena"
        id="maxPrice"
        name="maxPrice"
        error="Max. cijena mora biti veća od min. cijene"
      />,
    );

    const input = screen.getByLabelText("Max. cijena");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "maxPrice-error");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Max. cijena mora biti veća od min. cijene",
    );
  });

  it("renders a hint and links it with aria-describedby", () => {
    render(
      <Input
        label="Pretraga"
        id="search"
        name="search"
        hint="Rezultati se ažuriraju nakon pauze u unosu"
      />,
    );

    const input = screen.getByLabelText("Pretraga");

    expect(
      screen.getByText("Rezultati se ažuriraju nakon pauze u unosu"),
    ).toHaveAttribute("id", "search-hint");
    expect(input).toHaveAttribute("aria-describedby", "search-hint");
  });
});
