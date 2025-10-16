import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiOrder from "../../../api/apiOrder";
import {
  FaTrash,
  FaEye,
  FaEdit,
  FaSearch,
} from "react-icons/fa";

const ListOrder = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔹 Tiêu chí lọc
  const [filters, setFilters] = useState({
    status: "",
    payment: "",
    order_code: "",
  });

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

  // 🔹 Lấy danh sách đơn hàng
  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiOrder.getAllFilter(page, filters);
      if (res.status) {
        setOrders(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
      }
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(Number(page) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Phân trang
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      localStorage.setItem("currentOrderPage", pageNumber); // ✅ Lưu trang hiện tại
      navigate(`/admin/orders/${pageNumber}`);
    }
  };


  // Áp dụng bộ lọc
  const handleFilter = () => {
    navigate(`/admin/orders/1`);
    fetchOrders(1);
  };

  // Xóa đơn hàng
  const deleteOrder = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này không?")) {
      const res = await apiOrder.delete(id);
      if (res.status) fetchOrders(currentPage);
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

      {/* Bộ lọc */}
      <div className="p-4 flex flex-col md:flex-row md:items-end gap-4 border-b border-gray-200 bg-gray-50">
        {/* Trạng thái */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Trạng thái</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded-md p-2 text-sm w-48"
          >
            <option value="">Tất cả</option>
            {Object.entries(statusLabels).map(([key, val]) => (
              <option key={key} value={key}>
                {val.text}
              </option>
            ))}
          </select>
        </div>

        {/* Phương thức thanh toán */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Phương thức</label>
          <select
            value={filters.payment}
            onChange={(e) => setFilters({ ...filters, payment: e.target.value })}
            className="border rounded-md p-2 text-sm w-48"
          >
            <option value="">Tất cả</option>
            <option value="COD">Tiền mặt (COD)</option>
            <option value="BANK">Chuyển khoản</option>
            <option value="MOMO">Momo</option>
          </select>
        </div>

        {/* Mã hóa đơn */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Mã hóa đơn</label>
          <input
            type="text"
            placeholder="Nhập mã đơn..."
            value={filters.order_code}
            onChange={(e) =>
              setFilters({ ...filters, order_code: e.target.value })
            }
            className="border rounded-md p-2 text-sm w-48"
          />
        </div>

        <button
          onClick={handleFilter}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          <FaSearch /> {loading ? "Đang lọc..." : "Lọc"}
        </button>
      </div>

      {/* Bảng đơn hàng */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Thanh toán</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Chức năng</th>
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
                    <td className="px-4 py-3 text-sm">{order.id}</td>
                    <td className="px-4 py-3 text-sm font-mono">{order.order_code}</td>
                    <td className="px-4 py-3 text-sm">{order.name || order.user?.name}</td>
                    <td className="px-4 py-3 text-sm">
                      {Number(order.total_amount).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm">{order.payment}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}
                      >
                        {status.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <div className="flex items-center justify-center gap-3 text-lg">
                        <button
                          onClick={() =>
                            navigate(`/admin/orderDetail/${order.id}`)
                          }
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/editOrder/${order.id}`)
                          }
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
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
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Không có đơn hàng phù hợp.
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
              className={`px-3 py-1 rounded ${currentPage === i + 1
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
