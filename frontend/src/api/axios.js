import axios from 'axios';
import { apiURL } from './config';

// Tạo ra một instance của axios
const axiosInstance = axios.create({
  baseURL: apiURL, // dùng chung cho mọi API
  timeout: 5000,   // quá 5 giây sẽ báo lỗi
  headers: {
    "Content-Type": "application/json"
  }
});

// Khi cần upload file thì đổi Content-Type thành multipart/form-data
axiosInstance.enableUploadFile = () => {
  axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
};

// Khi cần gửi JSON trở lại thì set lại Content-Type
axiosInstance.enableJson = () => {
  axiosInstance.defaults.headers['Content-Type'] = 'application/json';
};

export default axiosInstance;
