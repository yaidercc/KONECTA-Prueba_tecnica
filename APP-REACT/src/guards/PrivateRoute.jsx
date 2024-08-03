import { useContext } from "react";
import { EmployeeContext } from "../context/Employees/EmployeeContext";
import { Navigate } from "react-router-dom";
import { Loader } from "../ui";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated,isLoading } = useContext(EmployeeContext);

  if (isLoading) {
    return <Loader/>;  
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" /> ;
};
