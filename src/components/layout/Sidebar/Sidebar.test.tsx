import { useAuth } from "@/context/auth/useAuth";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import Sidebar from "./Sidebar";

vi.mock("@/context/auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

const renderSidebar = () =>
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>,
  );

describe("Sidebar", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("shows nav links when the hamburger menu is opened", () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderSidebar();

    fireEvent.click(screen.getByTestId("sidebar-menu-toggle"));

    expect(screen.getByTestId("sidebar-nav")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-link-products")).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByTestId("sidebar-link-favorites")).toHaveAttribute(
      "href",
      "/favorites",
    );
    expect(screen.getByTestId("sidebar-link-login")).toHaveAttribute(
      "href",
      "/login",
    );
  });
});
