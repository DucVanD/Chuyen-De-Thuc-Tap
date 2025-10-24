import { Edit } from "lucide-react";
import axiosInstance from "./axios";
import { apiURL } from "./config"; // nếu cần dùng URL đầy đủ

const apiOrder = {
  getAllPage: async (page = 1) => {
    const res = await axiosInstance.get(`/order?page=${page}`);
    return res.data;
  },

  //
  getAllFilter: async (page = 1, filters = {}) => {
    const params = new URLSearchParams({ page, ...filters }).toString();
    const res = await axiosInstance.get(`/order?${params}`);
    return res.data;
  },
  //

  getOrderId: async (id) => {
    const res = await axiosInstance.get(`/order/${id}`);
    return res.data;
  },

  editOrder: async (id, orderData) => {
    const res = await axiosInstance.put(`/order/${id}`, orderData);
    return res.data;
  },
  checkout: async (orderData) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/checkout", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  exportInvoice: async (id) => {
    window.open(`${apiURL}/orders/${id}/invoice`, "_blank");
  },


  createVnpayPayment: async (amount) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post(
      "/vnpay/create",
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },


};

export default apiOrder;
