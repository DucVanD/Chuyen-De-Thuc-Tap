import axios from "axios";
import axiosInstance from "./axios";

const apiCategory = {
  getAll: async () => {
    const res = await axiosInstance.get("/category/all");
    return res;
  },

  // Lấy sản phẩm phân trang (kèm page)
  getAllPage: async (page = 1) => {
    const res = await axiosInstance.get(`/category?page=${page}`);
    return res.data;
  },

  Addcategory: async (FormData) => {
    axiosInstance.enableUploadFile(); // chuyển sang multipart/form-data
    const res = await axiosInstance.post("/category", FormData);
    axiosInstance.enableJson();
    return res.data;
  },

  getCategoryById: async (id) => {
    const res = await axiosInstance.get(`/category/${id}`);
    return res;
  },

 

editCategory: async (id, formData) => {
  axiosInstance.enableUploadFile(); // BẮT BUỘC để gửi file
  const res = await axiosInstance.post(`/category/${id}?_method=PUT`, formData);
  axiosInstance.enableJson(); // đổi lại JSON cho các request sau
  return res.data;
},


  deleteCategory: async (id) => {
    const res = await axiosInstance.delete(`/category/${id}`);
    return res.data;
  },
};

export default apiCategory;
