import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../Auth/routes/AuthRoutes";
import { PrivateRoute } from "../guards/PrivateRoute";
import { PublicRoute } from "../guards/PublicRoute";
import { HomeRoutes } from "../Home/routes/HomeRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="auth/*"
        element={
          <PublicRoute>
            <AuthRoutes />
          </PublicRoute>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <HomeRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
