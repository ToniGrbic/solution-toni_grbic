import { RouterProvider } from "react-router";
import { router } from "./router.config";

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
