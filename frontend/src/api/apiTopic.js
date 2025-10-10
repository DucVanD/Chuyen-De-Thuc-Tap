import axiosInstance from "./axios";

const apiTopic = {
  // ✅ Lấy tất cả chủ đề (phân trang)
  getAllPage: async (page = 1) => {
    const res = await axiosInstance.get(`/topic?page=${page}`);
    return res.data;
  },

  // ✅ Lấy toàn bộ chủ đề (nếu backend hỗ trợ /topic/all)
  getAll: async () => {
    const res = await axiosInstance.get(`/topic/all`);
    return res.data;
  },

  // ✅ Lấy 1 chủ đề theo ID
  getTopicById: async (id) => {
    const res = await axiosInstance.get(`/topic/${id}`);
    return res;
  },

  // ✅ Thêm mới chủ đề
  addTopic: async (data) => {
    const res = await axiosInstance.post(`/topic`, data);
    return res.data;
  },

  // ✅ Cập nhật chủ đề
editTopic: async (id, data) => {
  const res = await axiosInstance.put(`/topic/${id}`, data);
  return res.data;
},


  // ✅ Xóa tạm (đưa vào thùng rác)
  delete: async (id) => {
    const res = await axiosInstance.get(`/topic/delete/${id}`);
    return res.data;
  },

  // ✅ Khôi phục từ thùng rác
  restore: async (id) => {
    const res = await axiosInstance.get(`/topic/restore/${id}`);
    return res.data;
  },

  // ✅ Lấy danh sách thùng rác
  getTrash: async (page = 1) => {
    const res = await axiosInstance.get(`/topic/trash?page=${page}`);
    return res.data;
  },

  // ✅ Xóa vĩnh viễn
  forceDelete: async (id) => {
    const res = await axiosInstance.delete(`/topic/${id}`);
    return res.data;
  },
};

export default apiTopic;
