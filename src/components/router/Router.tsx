import ProtectedRoute from "@/components/ProtectedRoute";
import { Layout } from "@/components/layout";
import { Routes as AppRoutes } from "@/types/enums";
import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

const Favorites = lazy(() => import("@/pages/Favorites"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Products = lazy(() => import("@/pages/Products"));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: AppRoutes.HOME,
        element: <Navigate to={AppRoutes.PRODUCTS} replace />,
      },
      {
        path: AppRoutes.PRODUCTS,
        element: <Products />,
      },
      {
        path: AppRoutes.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
      {
        path: AppRoutes.LOGIN,
        element: <Login />,
      },
      {
        path: AppRoutes.FAVORITES,
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoutes.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
