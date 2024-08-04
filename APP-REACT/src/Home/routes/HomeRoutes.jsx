import { Route, Routes } from "react-router-dom";
import { RequestProvider } from "../../context/Requests/RequestProvider";
import { Requests } from "../pages/Requests";
import { Employees } from "../pages/Employees";
import { Navbar } from "../../ui/components/NavBar/NavBar";
import { useContext } from "react";
import { EmployeeContext } from "../../context/Employees/EmployeeContext";
import { AdminRoute } from "../../guards/AdminRoute";

export const HomeRoutes = () => {
  const { employee, logout } = useContext(EmployeeContext);
  return (
    <>
      <Navbar nameUser={employee.name} role={employee.role_id} logout={logout} />
      <RequestProvider>
        <Routes>
          <Route path="/" element={<Requests />} />
         
            <Route path="/employees" element={ <AdminRoute allowedRoles={[2]}><Employees /></AdminRoute>} />
          
        </Routes>
      </RequestProvider>
    </>
  );
};
