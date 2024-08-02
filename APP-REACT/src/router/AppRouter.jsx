import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { Requests } from "../requests/pages/Requests";
import { PrivateRoute } from "../guards/PrivateRoute";
import { PublicRoute } from "../guards/PublicRoute";

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
        path="/"
        element={
          <PrivateRoute>
            <Requests />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
