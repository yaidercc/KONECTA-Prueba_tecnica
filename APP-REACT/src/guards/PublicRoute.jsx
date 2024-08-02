import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { Loader } from "../ui";
export const PublicRoute = ({ children }) => {
  const { isAuthenticated,isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loader/>; 
  }

  return isAuthenticated ? <Navigate to="/" /> : children;
};
