import { LoadingSpinner } from "@/components/common";
import { useAuth } from "@/context/auth/useAuth";
import { Routes } from "@/types/enums";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner label="Provjera prijave..." />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={Routes.LOGIN} replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default ProtectedRoute;
