// src/pages/admin/Order/ListOrder.jsx
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiOrder from "../../../api/apiOrder";
import {
  FaTrash,
  FaEye,
  FaToggleOn,
  FaToggleOff,
  FaEdit,
} from "react-icons/fa";

const ListOrder = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [lastPage, setLastPage] = useState(1);

  // Danh sách trạng thái đơn hàng
  const statusLabels = {
    1: { text: "Đang chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
    2: { text: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
    3: { text: "Đang đóng gói", color: "bg-orange-100 text-orange-800" },
    4: { text: "Đang giao hàng", color: "bg-teal-100 text-teal-800" },
    5: { text: "Đã giao", color: "bg-green-100 text-green-800" },
    6: { text: "Hoàn hàng / Trả hàng", color: "bg-purple-100 text-purple-800" },
    7: { text: "Đã hủy", color: "bg-red-100 text-red-800" },
  };

  // Lấy danh sách đơn hàng từ API
  const fetchOrders = (page = 1) => {
    apiOrder
      .getAllPage(page)
      .then((res) => {
        if (res.status) {
          setOrders(res.data.data);
          setCurrentPage(res.data.current_page);
          setLastPage(res.data.last_page);
        }
      })
      .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err));
  };

  useEffect(() => {
    fetchOrders(Number(page) || 1);
  }, [page]);

  // Phân trang
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      navigate(`/admin/orders/${pageNumber}`);
    }
  };

  // Toggle trạng thái đơn hàng (ví dụ cập nhật nhanh)
  const toggleStatus = (id) => {
    apiOrder.toggleStatus(id).then((res) => {
      if (res.status) fetchOrders(currentPage);
    });
  };

  // Xóa đơn hàng
  const deleteOrder = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này không?")) {
      apiOrder.delete(id).then((res) => {
        if (res.status) fetchOrders(currentPage);
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Danh sách đơn hàng
        </h3>
        <div className="flex space-x-3">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center transition duration-200">
            <FaTrash className="mr-2" /> Thùng rác
          </button>
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                Tên khách hàng
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                Điện thoại
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                Địa chỉ
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                Tổng tiền
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => {
                const status = statusLabels[order.status] || {
                  text: "Không xác định",
                  color: "bg-gray-100 text-gray-800",
                };
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{order.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{order.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{order.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{order.address}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {order.total_amount
                        ? Number(order.total_amount).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : "Chưa cập nhật"}
                    </td>

                    {/* Trạng thái đơn hàng */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}
                      >
                        {status.text}
                      </span>
                    </td>

                    {/* Chức năng */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-3 text-lg">
                        <button
                          onClick={() => navigate(`/admin/orderDetail/${order.id}`)}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/editOrder/${order.id}`)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        {/* <button
                          onClick={() => toggleStatus(order.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          {order.status === 2 ? <FaToggleOn /> : <FaToggleOff />}
                        </button> */}
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  Không có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Trước
          </button>
          {Array.from({ length: lastPage }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === lastPage}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
