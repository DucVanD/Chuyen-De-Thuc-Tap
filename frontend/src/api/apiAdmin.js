import axios from "axios";
import { apiURL } from "./config";

const apiAdmin = axios.create({
  baseURL: `${apiURL}/admin`,
});

apiAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";
  return config;
});

export default {
  login: (data) => axios.post(`${apiURL}/admin/login`, data),
  getMe: () => apiAdmin.get("/me"),
  logout: () => apiAdmin.post("/logout"),
};
