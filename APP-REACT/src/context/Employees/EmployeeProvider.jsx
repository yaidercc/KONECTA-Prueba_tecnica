import { useEffect, useState } from "react";
import { EmployeeContext } from "./EmployeeContext";
import axios from "../../helpers/fetchApi";

export const UserProvider = ({ children }) => {
  const [employee, setEmployee] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const validateAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("auth", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      const { employee, token } = response.data;     
      setEmployee(employee);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
    } catch (error) {
      const errorInfo = error.response;
      if (errorInfo?.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setEmployee({});
  };

  useEffect(() => {
    const getJWT = localStorage.getItem("token");
    if (getJWT) validateAuthentication();
    else logout();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees,employee, logout, setEmployee, isAuthenticated, setIsAuthenticated, isLoading, setIsLoading }}>
      {children}
    </EmployeeContext.Provider>
  );
};
