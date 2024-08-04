import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VITE_API_URL,
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