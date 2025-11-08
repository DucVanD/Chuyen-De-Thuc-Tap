import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiUser from "../../../api/apiUser";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { imageURL } from "../../../api/config";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);

  // 🔹 Lấy thông tin user + phân trang đơn hàng
  const fetchUser = async (page = 1) => {
    try {
      setLoading(true);
      const res = await apiUser.getUserIdWithParams(id, `page=${page}`);
      if (res.status) {
        setUser(res.data);
        setOrders(res.data.orders || []);
        setPagination(res.data.pagination || { current_page: 1, last_page: 1 });
      }
    } catch (err) {
      console.error("Lỗi tải user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      fetchUser(page);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Đang tải dữ liệu...</div>;
  if (!user) return <div className="p-10 text-center text-gray-500">Không tìm thấy người dùng.</div>;

  const currentPage = pagination.current_page;
  const lastPage = pagination.last_page;

  const statusLabels = {
    1: { text: "Đang chờ xác nhận", color: "bg-yellow-200 text-yellow-800" },
    2: { text: "Đã xác nhận", color: "bg-blue-200 text-blue-800" },
    3: { text: "Đang đóng gói", color: "bg-orange-200 text-orange-800" },
    4: { text: "Đang giao hàng", color: "bg-teal-200 text-teal-800" },
    5: { text: "Đã giao", color: "bg-green-300 text-green-800" },
    6: { text: "Hoàn hàng / Trả hàng", color: "bg-purple-100 text-purple-800" },
    7: { text: "Đã hủy", color: "bg-red-200 text-red-800" },
  };


  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Chi tiết thành viên</h1>
        <div className="space-x-2">
          <Link
            to={`/admin/user/edit/${user.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm inline-flex items-center"
          >
            <FaEdit className="mr-1" /> Sửa
          </Link>
          <button
            onClick={() => alert("Xóa user (chưa xử lý API)")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm inline-flex items-center"
          >
            <FaTrash className="mr-1" /> Xóa
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm inline-flex items-center"
          >
            <FaArrowLeft className="mr-1" /> Về danh sách
          </button>
        </div>
      </div>

      {/* Thông tin cá nhân */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {/* Avatar + Trạng thái */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <img
                  className="h-40 w-40 object-cover rounded-full border border-gray-200"
                  src={`${imageURL}/avatar/${user.avatar}?v=${user.updated_at || Date.now()
                    }`}
                  alt={user.name}
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 mt-1">
                  {user.status === 1 ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Không hoạt động
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">
                Thông tin liên hệ
              </h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Điện thoại:</strong> {user.phone}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Địa chỉ:</strong> {user.address}</p>
              </div>
            </div>

            {/* Thông tin tài khoản */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">
                Thông tin tài khoản
              </h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Tên đăng nhập:</strong> {user.username}</p>
                <p><strong>Quyền:</strong> {user.roles}</p>
                <p><strong>Tổng đơn hàng:</strong> {user.summary?.total_orders || 0}</p>
                <p><strong>Tổng sản phẩm:</strong> {user.summary?.total_products || 0}</p>
              </div>
            </div>
          </div>

          {/* Danh sách đơn hàng */}
          <div className="md:col-span-3 mt-4 bg-yellow-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-700 mb-4 border-b pb-2">
              Danh sách đơn hàng của khách
            </h2>

            {orders.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-100">
                      <tr className="text-gray-700 text-left">
                        <th className="p-3 border">Mã đơn</th>
                        <th className="p-3 border">Ngày tạo</th>
                        <th className="p-3 border">Số SP</th>
                        <th className="p-3 border">Tổng tiền</th>
                        <th className="p-3 border">Thanh toán</th>
                        <th className="p-3 border">Trạng thái</th>
                        <th className="p-3 border text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="p-3 border">{order.order_code}</td>
                          <td className="p-3 border">{order.created_at}</td>
                          <td className="p-3 border text-center">{order.total_items}</td>
                          <td className="p-3 border text-right">{order.total_amount}</td>
                          <td className="p-3 border">{order.payment}</td>
                          <td className="p-3 border text-center">
                            {statusLabels[order.status] ? (
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${statusLabels[order.status].color
                                  }`}
                              >
                                {statusLabels[order.status].text}
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                Không xác định
                              </span>
                            )}
                          </td>

                          <td className="p-3 border text-center">
                            <Link
                              to={`/admin/orderDetail/${order.id}`}
                              className="text-blue-600 hover:underline"
                            >
                              Xem
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4 space-x-2">
                  {/* Nút Trước */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Trước
                  </button>

                  {/* Hiển thị trang */}
                  {(() => {
                    const pages = [];
                    const maxPagesToShow = 5; // Hiển thị 5 trang giữa
                    let start = Math.max(1, currentPage - 2);
                    let end = Math.min(lastPage, start + maxPagesToShow - 1);

                    // Nếu gần cuối thì lùi về cho đủ 5 trang
                    if (end - start < maxPagesToShow - 1) {
                      start = Math.max(1, end - maxPagesToShow + 1);
                    }

                    // Trang đầu
                    if (start > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => goToPage(1)}
                          className={`px-3 py-1 rounded ${currentPage === 1
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                          1
                        </button>
                      );

                      if (start > 2) {
                        pages.push(
                          <span key="dots-start" className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                    }

                    // Các trang ở giữa
                    for (let i = start; i <= end; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => goToPage(i)}
                          className={`px-3 py-1 rounded ${currentPage === i
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                          {i}
                        </button>
                      );
                    }

                    // Trang cuối
                    if (end < lastPage) {
                      if (end < lastPage - 1) {
                        pages.push(
                          <span key="dots-end" className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }

                      pages.push(
                        <button
                          key={lastPage}
                          onClick={() => goToPage(lastPage)}
                          className={`px-3 py-1 rounded ${currentPage === lastPage
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                          {lastPage}
                        </button>
                      );
                    }

                    return pages;
                  })()}

                  {/* Nút Sau */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>

              </>
            ) : (
              <p className="text-gray-600 italic">Khách này chưa có đơn hàng nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
