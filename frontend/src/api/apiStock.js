import axios from "axios";
import { apiURL } from "./config";

const apiStock = {
  // ✅ thêm { params } để truyền query string lên Laravel
  getAll: (params = {}) => axios.get(`${apiURL}/stock`, { params }),

  // Nhập kho
  import: (data) => axios.post(`${apiURL}/inventory/import`, data),

  // Xuất kho
  export: (data) => axios.post(`${apiURL}/inventory/export`, data),

  // Điều chỉnh kho
  adjust: (data) => axios.post(`${apiURL}/inventory/adjust`, data),
  // tra hang
  return: (data) => axios.post(`${apiURL}/inventory/return`, data),
};

export default apiStock;
