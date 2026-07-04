import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

const defaultProps = {
  totalPages: 5,
  onPageChange: vi.fn(),
  label: "Paginacija proizvoda",
};

describe("Pagination", () => {
  afterEach(() => {
    cleanup();
  });
  it("increments the current page when Sljedeća stranica is clicked", () => {
    const onPageChange = vi.fn();

    render(<Pagination {...defaultProps} page={2} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Sljedeća stranica" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("decrements the current page when Prethodna stranica is clicked", () => {
    const onPageChange = vi.fn();

    render(<Pagination {...defaultProps} page={3} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Prethodna stranica" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("shows first and last page buttons when on a middle page", () => {
    render(
      <Pagination
        {...defaultProps}
        page={3}
        totalPages={17}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Stranica 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Stranica 17" })).toBeInTheDocument();
  });
});
