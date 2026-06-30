import Home from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import { Routes as AppRoutes } from "./routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
