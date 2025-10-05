import axiosInstance from "./axios";

// API User (Laravel + JWT)
const apiUser = {
  // Lấy danh sách user
  getAll: () => {
    return axiosInstance.get("/user").then((res) => res.data);
  },

  // Lấy chi tiết 1 user
  getUserById: (id) => {
    return axiosInstance.get(`/user/${id}`).then((res) => res.data);
  },

  // Đăng ký
  registerUser: (data) => {
    return axiosInstance
      .post("/register", data)
      .then((res) => res.data);
  },

  // Đăng nhập
  loginUser: (data) => {
    return axiosInstance
      .post("/login", data)
      .then((res) => {
        // Lưu token vào localStorage để dùng sau
        if (res.data.access_token) {
          localStorage.setItem("token", res.data.access_token);
        }
        return res.data;
      });
  },

  // Lấy thông tin user đang đăng nhập
  getProfile: () => {
    return axiosInstance.get("/me").then((res) => res.data);
  },

  // Đăng xuất
  logoutUser: () => {
    return axiosInstance.post("/logout").then((res) => {
      localStorage.removeItem("token");
      return res.data;
    });
  },
};

export default apiUser;
