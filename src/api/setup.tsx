import axios from "axios";
import type { ApiErrorResponse } from "@/types/api";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Request failed";

      const status = error.response?.status;
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.reload()

      }

      return Promise.reject(new Error(message));
    }

    return Promise.reject(new Error("Unexpected error occurred"));
  }
);

export default api;