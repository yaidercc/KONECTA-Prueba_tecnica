import { useContext, useEffect } from "react";
import axios from "../../helpers/fetchApi";
import { RequestContext } from "../../context/Requests/RequestContext";
export const useRequests = () => {
  const { requests, setRequests } = useContext(RequestContext);
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async (page=1) => {
    try {
      const response = await axios.get(`request/${page}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      const { requests } = response.data;
      
      setRequests(requests);
    } catch (error) {
      const errorInfo = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    }
  };

  const deleteRequests = async (id) => {
    try {
      await axios.delete(`request/${id}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      const newRequests = requests.requests.filter((item) => item.id !== id);
      setRequests({...requests, requests: newRequests, });
    } catch (error) {
      const errorInfo = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    }
  };

  return {
    getRequests,
    deleteRequests,
  };
};
