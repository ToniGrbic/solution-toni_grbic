import { useAuth } from "@/context/AuthProvider";
import { Routes } from "@/types/enums";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={Routes.LOGIN} replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default ProtectedRoute;
