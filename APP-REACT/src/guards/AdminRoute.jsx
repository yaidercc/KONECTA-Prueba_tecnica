import { lazy, useContext } from "react";
import { Navigate } from "react-router-dom";
import { EmployeeContext} from "../context/Employees/EmployeeContext"

export const AdminRoute = ({ children,allowedRoles }) => {
    const { employee } = useContext(EmployeeContext);
    return allowedRoles.includes(employee.role_id) ? children : <Navigate to="/auth/login" /> ;
};
