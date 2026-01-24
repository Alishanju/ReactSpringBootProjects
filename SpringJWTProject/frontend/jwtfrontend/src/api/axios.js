import axios from "axios";

// Use environment variable or fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

console.log("API Base URL:", API_BASE_URL);
console.log("Environment:", import.meta.env.MODE);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  timeout: 10000, // 10 second timeout
});

// REQUEST INTERCEPTOR → attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR → handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    if (status === 403) {
      window.location.href = "/unauthorized";
      return Promise.reject(new Error("Access denied."));
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error("Request timeout. Please check your connection."));
    }

    if (!error.response) {
      return Promise.reject(new Error("Cannot connect to server. Please check if the backend is running."));
    }

    return Promise.reject(new Error(message || "An error occurred"));
  }
);

export default api;
