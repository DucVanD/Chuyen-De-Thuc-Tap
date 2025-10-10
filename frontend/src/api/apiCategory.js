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

  // Lấy danh mục cha (parent_id = 0)
  getParents: async () => {
    const res = await axiosInstance.get(`/category/parents`);
    return res.data;
  },

  //
  getParentsWithChildren: async () => {
    const res = await axiosInstance.get("/category/parentsWithChildren");
    return res.data;
  },



  getBySlug: async (slug) => {
    const res = await axiosInstance.get(`/category/slug/${slug}`);
    return res.data;
  },
  //
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
    const res = await axiosInstance.post(
      `/category/${id}?_method=PUT`,
      formData
    );
    axiosInstance.enableJson(); // đổi lại JSON cho các request sau
    return res.data;
  },

  delete: async (id) => {
    const res = await axiosInstance.get(`/category/delete/${id}`); // dùng GET như route
    return res.data;
  },

  restore: async (id) => {
    const res = await axiosInstance.get(`/category/restore/${id}`);
    return res.data;
  },

  // Lấy danh sách Trash
  getTrash: async (page = 1) => {
    const res = await axiosInstance.get(`/category/trash?page=${page}`);
    return res.data; // nên trả { status: true, data: { data: [...], current_page: 1, last_page: 3 } }
  },

  // Xoá vĩnh viễn
  forceDelete: async (id) => {
    const res = await axiosInstance.delete(`/category/${id}`);
    return res.data;
  },



};

export default apiCategory;
