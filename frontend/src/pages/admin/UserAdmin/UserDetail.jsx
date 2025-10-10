import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiUser from "../../../api/apiUser"; // file gọi API user/show
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiUser.getUserId(id);
        if (res.status) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Lỗi tải user:", err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div className="p-10 text-center">Đang tải...</div>;

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
                  src={
                    user.avatar
                      ? `/uploads/avatar/${user.avatar}`
                      : "/default-avatar.png"
                  }
                  alt={user.name}
                  className="w-40 h-40 object-cover rounded-full border-4 border-blue-200"
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
                <p><strong>Tổng đơn hàng:</strong> {user.orders_count}</p>
              </div>
            </div>
          </div>

          {/* Danh sách đơn hàng */}
          <div className="md:col-span-3 mt-4 bg-yellow-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-700 mb-4 border-b pb-2">
              Danh sách đơn hàng của khách
            </h2>

            {user.orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr className="text-gray-700 text-left">
                      <th className="p-3 border">Mã đơn</th>
                      <th className="p-3 border">Ngày tạo</th>
                      <th className="p-3 border">Sản phẩm</th>
                      <th className="p-3 border">Tổng tiền</th>
                      <th className="p-3 border">Thanh toán</th>
                      <th className="p-3 border">Trạng thái</th>
                      <th className="p-3 border text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="p-3 border">{order.order_code}</td>
                        <td className="p-3 border">{order.created_at}</td>
                        <td className="p-3 border text-center">{order.total_items}</td>
                        <td className="p-3 border text-right">{order.total_amount}</td>
                        <td className="p-3 border">{order.payment}</td>
                        <td className="p-3 border">
                          {order.status === 1 ? (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                              Chờ xử lý
                            </span>
                          ) : order.status === 2 ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              Đang giao
                            </span>
                          ) : order.status === 4 ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                              Hoàn thành
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                              Hủy
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
