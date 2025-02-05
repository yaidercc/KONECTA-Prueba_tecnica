import axios from "../../helpers/fetchApi";
export const getEmployees = async () => axios.get("employee/getAllEmployees",{
    headers:{
        "x-token": localStorage.getItem("token")
    }
});

export const getRoles = async () => axios.get("employee/getRoles");