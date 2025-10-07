import axiosInstance from "./axios";

const apiUser = {
  registerUser: (data) => axiosInstance.post("/register", data).then(res => res.data),

  loginUser: (data) =>
    axiosInstance.post("/login", data).then(res => {
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      return res.data;
    }),

  getProfile: () =>
    axiosInstance.get("/me").then(res => res.data),

  logoutUser: () =>
    axiosInstance.post("/logout").then(res => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return res.data;
    }),

  getAll: () => axiosInstance.get("/user").then(res => res.data),
};

export default apiUser;
