import { useContext } from "react";
import { EmployeeContext } from "../context/Employees/EmployeeContext";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children,allowedRoles }) => {
    const { employee } = useContext(EmployeeContext);
    return allowedRoles.includes(employee.role_id) ? children : <Navigate to="/auth/login" /> ;
};
