import { useAuth } from "@/context/AuthProvider";
import { Routes } from "@/types/enums";
import { cleanup, render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes as RouterRoutes,
  useLocation,
} from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProtectedRoute from "./ProtectedRoute";

vi.mock("@/context/AuthProvider", () => ({
  useAuth: vi.fn(),
}));

const ProtectedContent = () => <div>Protected content</div>;

const LoginPage = () => {
  const location = useLocation();

  return (
    <div>
      Login page
      <span data-testid="from-location">
        {(location.state as { from?: string } | null)?.from ?? ""}
      </span>
    </div>
  );
};

const mockAuth = (auth: { isAuthenticated: boolean; isLoading: boolean }) => {
  vi.mocked(useAuth).mockReturnValue({
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
  });
};

const renderProtectedRoute = (initialPath = Routes.FAVORITES) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <RouterRoutes>
        <Route
          path={Routes.FAVORITES}
          element={
            <ProtectedRoute>
              <ProtectedContent />
            </ProtectedRoute>
          }
        />
        <Route path={Routes.LOGIN} element={<LoginPage />} />
      </RouterRoutes>
    </MemoryRouter>,
  );

describe("ProtectedRoute", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("shows a loading spinner while auth state is loading", () => {
    mockAuth({ isAuthenticated: false, isLoading: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <ProtectedContent />
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Provjera prijave...",
    );
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("redirects unauthenticated users to login", () => {
    mockAuth({ isAuthenticated: false, isLoading: false });

    renderProtectedRoute();

    expect(screen.getByText("Login page")).toBeInTheDocument();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("renders children when the user is authenticated", () => {
    mockAuth({ isAuthenticated: true, isLoading: false });

    renderProtectedRoute();

    expect(screen.getByText("Protected content")).toBeInTheDocument();
    expect(screen.queryByText("Login page")).not.toBeInTheDocument();
  });

  it("passes the current path as redirect state", () => {
    mockAuth({ isAuthenticated: false, isLoading: false });

    renderProtectedRoute(Routes.FAVORITES);

    expect(screen.getByTestId("from-location")).toHaveTextContent(
      Routes.FAVORITES,
    );
  });
});
