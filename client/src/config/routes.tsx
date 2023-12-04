import { RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthGuard from "../components/AuthGuard";

const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
};

const ROUTES_CONFIG: RouteObject[] = [
  {
    path: APP_ROUTES.HOME,
    element: <AuthGuard />,
    children: [
      { path: "", element: <Home /> },
      {
        path: APP_ROUTES.LOGIN,
        element: <Login />,
      },
    ],
  },
];

export { APP_ROUTES, ROUTES_CONFIG };
