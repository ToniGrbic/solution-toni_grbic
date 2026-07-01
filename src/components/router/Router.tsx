import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import { Routes as AppRoutes } from "@/types/enums";
import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

const Favorites = lazy(() => import("@/pages/Favorites"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Products = lazy(() => import("@/pages/Products"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={AppRoutes.HOME}
            element={<Navigate to={AppRoutes.PRODUCTS} replace />}
          />
          <Route path={AppRoutes.PRODUCTS} element={<Products />} />
          <Route path={AppRoutes.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route
            path={AppRoutes.FAVORITES}
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path={AppRoutes.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
