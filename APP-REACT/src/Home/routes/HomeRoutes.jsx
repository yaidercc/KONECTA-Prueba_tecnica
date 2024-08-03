import { Route, Routes } from "react-router-dom";
import { RequestProvider } from "../../context/Requests/RequestProvider";
import { Requests } from "../pages/Requests";
import { Employees } from "../pages/Employees";
import { Navbar } from "../../ui/components/NavBar/NavBar";
import { useContext } from "react";
import { EmployeeContext } from "../../context/Employees/EmployeeContext";

export const HomeRoutes = () => {
  const { employee, logout } = useContext(EmployeeContext);
  return (
    <>
    <Navbar nameUser={employee.name} logout={logout} />
    <RequestProvider>
      <Routes>
        <Route path="/" element={<Requests />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </RequestProvider>
    </>
  );
};
