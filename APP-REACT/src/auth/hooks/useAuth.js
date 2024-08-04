import { useContext } from "react";
import axios from "../../helpers/fetchApi";
import { EmployeeContext } from "../../context/Employees/EmployeeContext";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { setEmployee, setIsAuthenticated, setIsLoading } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const Login = async ({ username, password }) => {
    try {
      setIsLoading(true);
      const response = await axios.post("auth/login", {
        username,
        password,
      });

      const { employee, token } = response.data;
      setEmployee(employee);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } catch (error) {
      const errorInfo = error.response?.data?.msg || error.response?.data?.error || error?.message;
      alert(errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  const Signup = async ({ name, join_date, salary, username, password,role_id }) => {
    try {
      setIsLoading(true);
      await axios.post("/employee", {
        name,
        join_date,
        salary,
        username,
        password,
        role_id
      });
      navigate("/auth/login");
    } catch (error) {
      const errorInfo = error.response.data?.msg || error.response.data?.error || error?.message;
      
      alert(errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    Login,
    Signup,
  };
};
