import { useContext, useEffect } from "react";
import axios from "../../helpers/fetchApi";
import { EmployeeContext } from "../../context/Employees/EmployeeContext";

export const useEmployees = () => {
  const { setEmployees } = useContext(EmployeeContext);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get("employee/getAllEmployees",{
        headers:{
          "x-token": localStorage.getItem("token")
        }
      });

      const { employees } = response.data;
      console.log(response.data);
      
      setEmployees(employees);
    } catch (error) {
      const errorInfo = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    }
  };
  return {
    getEmployees,
  };
};
