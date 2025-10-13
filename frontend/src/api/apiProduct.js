import { Edit } from "lucide-react";
import axiosInstance from "./axios";

const apiProduct = {
  // getAll: async () => {
  //   const res = await axiosInstance.get("/product/all");
  //   return res.data;
  // },

  getAll: async (page = 1) => {
    const res = await axiosInstance.get(`/product/all?page=${page}`);
    return res.data;
  },


  // Lấy sản phẩm phân trang (kèm page)admin 
  getAllPage: async (page = 1) => {
    const res = await axiosInstance.get(`/product?page=${page}`);
    return res.data;
  },

  // 5 sản phẩm mới nhất
  getNewest: async () => {
    const res = await axiosInstance.get("/product/newest");
    return res.data;
  },

  // 5 sản phẩm giảm giá nhiều nhất
  getSaleDiscount: async () => {
    const res = await axiosInstance.get("/product/salediscount");
    return res.data;
  },

  // Chi tiết sản phẩm
  getProductId: async (id) => {
    const res = await axiosInstance.get(`/product/${id}`);
    return res.data;
  },
  //
  getProductBySlug: async (slug) => {
    const res = await axiosInstance.get(`/product/slug/${slug}`);
    return res.data;
  },

  //

  AddProduct: async (formData) => {
    axiosInstance.enableUploadFile(); // chuyển sang multipart/form-data
    const res = await axiosInstance.post("/product", formData);
    axiosInstance.enableJson(); // set lại JSON cho các API khác
    return res.data;
  },

  EditProduct: async (id, formData) => {
    axiosInstance.enableUploadFile(); // BẮT BUỘC để gửi file
    const res = await axiosInstance.post(
      `/product/${id}?_method=PUT`,
      formData
    );
    axiosInstance.enableJson(); // đổi lại JSON cho các request sau
    return res.data;
  },

  // search product

  search: async (keyword) => {
    const res = await axiosInstance.get(`/product/search`, {
      params: { keyword },
    });
    return res.data;
  },

  //
  getByCategorySlug: async (slug) => {
    const res = await axiosInstance.get(`/product/category/slug/${slug}`);
    return res.data;
  },
  delete: async (id) => {
    const res = await axiosInstance.get(`/product/delete/${id}`); // dùng GET như route
    return res.data;
  },

  // Khôi phục
  restore: async (id) => {
    const res = await axiosInstance.get(`/product/restore/${id}`);
    return res.data;
  },

  // Lấy danh sách Trash
  getTrash: async (page = 1) => {
    const res = await axiosInstance.get(`/product/trash?page=${page}`);
    return res.data; // nên trả { status: true, data: { data: [...], current_page: 1, last_page: 3 } }
  },

  // Xoá vĩnh viễn
  forceDelete: async (id) => {
    const res = await axiosInstance.delete(`/product/${id}`);
    return res.data;
  },

  // filter: async (filters) => {
  //   const params = new URLSearchParams(filters).toString();
  //   const res = await axiosInstance.get(`/product/filter?${params}`);
  //   return res.data;
  // },
  filter: async (filters) => {
    // Không cần tạo URLSearchParams nữa.
    // Gửi object `filters` trực tiếp làm body của request POST.
    const res = await axiosInstance.post('/product/filter', filters);
    return res.data;
  },
  // category home
  categoryhome: async () => {
    const res = await axiosInstance.get(`/product/category`);
    return res.data;
  }





};

export default apiProduct;
