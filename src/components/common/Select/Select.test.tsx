import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Select from "./Select";

describe("Select", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("associates the label with the select via id and name", () => {
    render(
      <Select label="Kategorija" id="category" name="category" value="">
        <option value="">Sve</option>
      </Select>,
    );

    const select = screen.getByLabelText("Kategorija");

    expect(select).toHaveAttribute("id", "category");
    expect(select).toHaveAccessibleName("Kategorija");
  });

  it("renders option children", () => {
    render(
      <Select label="Kategorija" id="category" value="">
        <option value="">Sve</option>
        <option value="phones">Phones</option>
        <option value="laptops">Laptops</option>
      </Select>,
    );

    expect(screen.getByRole("option", { name: "Sve" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Phones" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Laptops" })).toBeInTheDocument();
  });

  it("calls onChange when a new option is selected", () => {
    const onChange = vi.fn();

    render(
      <Select label="Kategorija" id="category" value="" onChange={onChange}>
        <option value="">Sve</option>
        <option value="phones">Phones</option>
      </Select>,
    );

    fireEvent.change(screen.getByLabelText("Kategorija"), {
      target: { value: "phones" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("exposes error state for assistive technologies", () => {
    render(
      <Select
        label="Kategorija"
        id="category"
        value=""
        onChange={vi.fn()}
        error="Odaberite kategoriju"
      >
        <option value="">Sve</option>
      </Select>,
    );

    const select = screen.getByLabelText("Kategorija");

    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAttribute("aria-describedby", "category-error");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Odaberite kategoriju",
    );
  });
});
