import axiosInstance from "./axios";

const apiBrand = {
  getAll: async () => {
    const res = await axiosInstance.get("/brand");
    return res;
  },

  




};

export default apiBrand;
