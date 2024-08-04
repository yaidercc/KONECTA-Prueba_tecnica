import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers:{
    "Content-Type": "application/json"
  }
});

// Interceptors

instance.interceptors.request.use(
  config => {
    config.withCredentials = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;