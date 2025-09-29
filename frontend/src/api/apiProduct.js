import axiosInstance from "./axios";

const apiProduct = {
  getAll: async () => {
    const res = await axiosInstance.get("/product");
    return res;
  },

  // Lấy sản phẩm phân trang (kèm page)
  getAllPage: async (page = 1) => {
    const res = await axiosInstance.get(`/product?page=${page}`);
    return res.data;
  },

  // 5 sản phẩm mới nhất
  getNewest: async () => {
    const res = await axiosInstance.get("/product/newest");
    return res.data;
  },

  AddProduct: async (formData) => {
    axiosInstance.enableUploadFile(); // chuyển sang multipart/form-data
    const res = await axiosInstance.post("/product", formData);
    axiosInstance.enableJson(); // set lại JSON cho các API khác
    return res.data;
  },
};

export default apiProduct;
