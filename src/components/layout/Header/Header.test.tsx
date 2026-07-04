import { useAuth } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Routes } from "@/types/enums";
import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import Header from "./Header";

vi.mock("@/context/AuthProvider", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/components/layout", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/components/layout")>();
  return {
    ...actual,
    Sidebar: () => null,
  };
});

const renderHeader = () =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </MemoryRouter>,
  );

describe("Header", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders all navigation links when unauthenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderHeader();

    const nav = screen.getByRole("navigation", { name: "Glavna navigacija" });

    expect(screen.getByRole("link", { name: "Katalog proizvoda" })).toHaveAttribute(
      "href",
      Routes.PRODUCTS,
    );
    expect(within(nav).getByRole("link", { name: "Proizvodi" })).toHaveAttribute(
      "href",
      Routes.PRODUCTS,
    );
    expect(within(nav).getByRole("link", { name: "Favoriti" })).toHaveAttribute(
      "href",
      Routes.FAVORITES,
    );
    expect(screen.getByRole("link", { name: "Prijava" })).toHaveAttribute(
      "href",
      Routes.LOGIN,
    );
  });
});
