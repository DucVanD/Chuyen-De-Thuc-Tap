// src/api/axiosInstance.js
import axios from "axios";
import { apiURL } from "./config";

// === Tạo instance chung ===
const axiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 20000, // tăng lên 20s vì Render cold-start chậm
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Interceptor: tự động gắn Bearer Token từ localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Chế độ upload ===
axiosInstance.enableUploadFile = () => {
  axiosInstance.defaults.headers["Content-Type"] = "multipart/form-data";
};

// === Chế độ JSON ===
axiosInstance.enableJson = () => {
  axiosInstance.defaults.headers["Content-Type"] = "application/json";
};

// === Retry khi timeout (Render bị ngủ) ===
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.code === "ECONNABORTED" && !error.config._retry) {
      error.config._retry = true;
      console.warn("⏳ Retry request sau khi Render khởi động lại...");
      return axiosInstance.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
