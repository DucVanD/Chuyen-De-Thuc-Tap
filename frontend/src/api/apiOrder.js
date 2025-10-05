import axiosInstance from "./axios";

const apiOrder = {
  checkout: async (orderData) => {
    const res = await axiosInstance.post("/order/checkout", orderData);
    return res.data;
  },
};

export default apiOrder;
