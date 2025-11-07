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


  getUserId: async (id, page = 1, from = "", to = "") => {
    let url = `/user/${id}?history=1&page=${page}`;
    if (from && to) url += `&from=${from}&to=${to}`;
    const res = await axiosInstance.get(url);
    return res.data;
  },

  //
  getPurchaseHistory: async (userId, from = "", to = "", page = 1) => {
    let url = `/user/${userId}?history=1&page=${page}`;
    if (from && to) {
      url += `&from=${from}&to=${to}`;
    }

    const res = await axiosInstance.get(url);
    return res.data;
  },
  //
  getUserIdWithParams: async (userId, queryString = "") => {
    const res = await axiosInstance.get(`/user/${userId}?${queryString}`);
    return res.data;
  },


 updateProfile: async (data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  formData.append("_method", "PUT"); // ✅ Laravel hiểu là PUT

  const res = await axiosInstance.post("/user/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
},






  //


};

export default apiUser;
