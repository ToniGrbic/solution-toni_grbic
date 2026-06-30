import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import Favorites from "@/pages/Favorites";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
import Products from "@/pages/Products";
import { Routes as AppRoutes } from "@/types/enums";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

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
