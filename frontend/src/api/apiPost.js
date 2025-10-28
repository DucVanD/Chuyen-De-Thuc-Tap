import axiosInstance from "./axios";

const apiPost = {
  // Lấy sản phẩm phân trang (kèm page)
  getAllPage: async (page = 1) => {
    const res = await axiosInstance.get(`/post?page=${page}`);
    return res.data;
  },


  getAllPageuser: async (page = 1) => {
    const res = await axiosInstance.get(`/post/all?page=${page}`);
    return res.data;
  },


  getPostBySlug: async (slug) => {
    const res = await axiosInstance.get(`/product/slug/${slug}`);
    return res.data;
  },


  getNewest: async () => {
    const res = await axiosInstance.get("/post/newest");
    return res.data;
  },



  // Chi tiết sản phẩm
  getPostId: async (id) => {
    const res = await axiosInstance.get(`/post/${id}`);
    return res.data;
  },
  //
  getPostBySlug: async (slug) => {
    const res = await axiosInstance.get(`/post/slug/${slug}`);
    return res.data;
  },


  //
  AddPost: async (formData) => {
    axiosInstance.enableUploadFile(); // chuyển sang multipart/form-data
    const res = await axiosInstance.post("/post", formData);
    axiosInstance.enableJson(); // set lại JSON cho các API khác
    return res.data;
  },




  //  
  EditPost: async (id, formData) => {
    axiosInstance.enableUploadFile(); // BẮT BUỘC để gửi file
    const res = await axiosInstance.post(
      `/post/${id}?_method=PUT`,
      formData
    );
    axiosInstance.enableJson(); // đổi lại JSON cho các request sau
    return res.data;
  },



};

export default apiPost;
