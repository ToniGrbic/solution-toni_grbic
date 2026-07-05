import { useAuth } from "@/context/AuthProvider";
import type { AuthUserResponse } from "@/types/auth";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import UserMenu from "./UserMenu";

vi.mock("@/context/AuthProvider", () => ({
  useAuth: vi.fn(),
}));

const mockUser: AuthUserResponse = {
  id: 1,
  username: "jdoe",
  email: "john@example.com",
  firstName: "John",
  lastName: "Doe",
  gender: "male",
  image: "https://example.com/avatar.jpg",
  accessToken: "access-token",
  refreshToken: "refresh-token",
};

const renderUserMenu = () => render(<UserMenu />);

describe("UserMenu", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("opens the dropdown on click and closes it on a second click", () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderUserMenu();

    const trigger = screen.getByRole("button", { expanded: false });

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
