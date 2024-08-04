import { useContext, useEffect } from "react";
import axios from "../../helpers/fetchApi";
import { RequestContext } from "../../context/Requests/RequestContext";
export const useRequests = () => {
  const { requests, setRequests } = useContext(RequestContext);
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async (page = 1, filters = {}) => {
    try {
      const filterQuery = Object.entries(filters)
        .map(([key,value], i) => `${key}=${value}`)
        .join("&");
      const response = await axios.get(`request/${page}${filterQuery ? "/?" + filterQuery : ""}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      const { requests } = response.data;

      setRequests(requests);
    } catch (error) {
      const errorInfo = error.response?.data?.msg || error.response?.data?.errors?.msg || error?.message;
      alert(errorInfo);
    }
  };

  const createRequests = async ({ code, description, summary }) => {
    try {
      await axios.post(
        `request`,
        {
          code,
          description,
          summary,
        },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      getRequests(localStorage.getItem("page"));
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
      getRequests(localStorage.getItem("page"));
    } catch (error) {
      const errorInfo = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    }
  };

  return {
    getRequests,
    deleteRequests,
    createRequests,
  };
};
