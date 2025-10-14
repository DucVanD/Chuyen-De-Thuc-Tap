// src/api/axiosInstance.js
import axios from "axios";
import { apiURL } from "./config";

// === Tạo instance chung ===
const axiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 20000, // tăng lên 20s vì Render cold-start chậm
  headers: {
    "Content-Type": "application/json",
  },
});

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
