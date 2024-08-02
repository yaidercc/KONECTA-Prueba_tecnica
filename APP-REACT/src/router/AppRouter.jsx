import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { Requests } from "../requests/pages/Requests"

export const AppRouter = () => {
  return (
    <Routes>
    <Route path="auth/*" element={<AuthRoutes />} />
    <Route path="/" element={<Requests />} />
  </Routes>
  )
}