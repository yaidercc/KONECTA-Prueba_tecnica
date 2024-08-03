import { useContext } from "react";
import axios from "../../helpers/fetchApi";
import { UserContext } from "../../context/User/UserContext";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { setUser, setIsAuthenticated, setIsLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const Login = async ({ username, password }) => {
    try {
      setIsLoading(true);
      const response = await axios.post("auth/login", {
        username,
        password,
      });
      
      const { employee, token } = response.data;
      localStorage.setItem("token",token);
      setIsAuthenticated(true);
      setUser(employee);
    } catch (error) {
      const errorInfo = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  const Signup = async ({ name, surname, username, mail, password, repeatPassword }) => {
    try {
      setIsLoading(true);
      await axios.post("/auth/singup", {
        name,
        surname,
        username,
        mail,
        password,
        repeatPassword,
      });
      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      const errorInfo = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
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