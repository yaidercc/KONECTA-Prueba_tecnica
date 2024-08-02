import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "../helpers/fetchApi";
import { useNavigate } from "react-router-dom";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const validateAuthentication = async () => {
    try {
      const response = await axios.get("auth", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });

      const { employee, token } = response.data;
      setUser(employee);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
    } catch (error) {
      const errorInfo = error.response;
      if (errorInfo?.status === 401) {
        setIsAuthenticated(false);
        setUser({});
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login", {
      replace: true,
    });
  };

  useEffect(() => {
    const getJWT = localStorage.getItem("token");
    if (getJWT) validateAuthentication();
    else logout();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, isLoading, setIsLoading }}>{children}</UserContext.Provider>
  );
};
