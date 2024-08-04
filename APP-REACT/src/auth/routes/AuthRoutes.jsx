import { Route, Routes } from "react-router-dom";
import { Login,SignIn } from "../pages";
export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signin" element={<SignIn />} />
    </Routes>
  );
};
