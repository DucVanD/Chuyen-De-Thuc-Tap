import axiosInstance from "./axios";

const apiDashboard = {
  // Thống kê tổng quan hôm nay
  summary: async () => {
    const res = await axiosInstance.get("/dashboard/summary");
    return res.data;
  },

  // Báo cáo theo ngày (YYYY-MM-DD)
  reportByDate: async (date) => {
    const res = await axiosInstance.get(`/dashboard/report/${date}`);
    return res.data;
  }
};

export default apiDashboard;
