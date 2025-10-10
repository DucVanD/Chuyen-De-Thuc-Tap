import axiosInstance from "./axios";

const apiUser = {

  getAll: () => axiosInstance.get("/user").then(res => res.data),

  getAllPage: async (page = 1) => {
    const res = await axiosInstance.get(`/user?page=${page}`);
    return res.data;
  },



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


  delete: async (id) => {
    const res = await axiosInstance.get(`/user/delete/${id}`); // dùng GET như route
    return res.data;
  },


  getUserId: async (id) => {
    const res = await axiosInstance.get(`/user/${id}`);
    return res.data;
  },



//
loginAdmin: async (username, password) => {
    const res = await axiosInstance.post("/admin/login", { username, password });
    if(res.data.status && res.data.data.token){
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
    }
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

};

export default apiUser;
