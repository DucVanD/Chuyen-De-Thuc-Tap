import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
} from "react-icons/fa";
import { imageURL } from "../../../api/config";
import apiUser from "../../../api/apiUser";

const ListUser = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [lastPage, setLastPage] = useState(1);

  // ✅ Lấy danh sách người dùng theo trang
  const fetchUsers = async (page = 1) => {
    try {
      const res = await apiUser.getAllPage(page);
      if (res.status) {
        setUsers(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
      } else {
        toast.error("Không thể tải danh sách người dùng!");
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách user:", err);
      toast.error("Không thể tải danh sách người dùng!");
    }
  };

  useEffect(() => {
    fetchUsers(Number(page) || 1);
  }, [page]);

  // ✅ Chuyển trang
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      navigate(`/admin/users/${pageNumber}`);
    }
  };

  // ✅ Toggle trạng thái
  const handleToggleStatus = async (id) => {
    try {
      const res = await apiUser.toggleStatus(id);
      if (res.status) {
        toast.success(res.message);
        fetchUsers(currentPage);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật trạng thái người dùng!");
    }
  };

  // ✅ Xóa người dùng
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này không?")) return;
    try {
      const res = await apiUser.delete(id);
      if (res.status) {
        toast.success(res.message);
        fetchUsers(currentPage);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Xóa người dùng thất bại!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Danh sách thành viên
        </h3>
        <div className="flex space-x-3">
          <Link
            to="/admin/user/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaPlus className="mr-2" /> Thêm mới
          </Link>
          <Link
            to="/admin/user/trash"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaTrash className="mr-2" /> Thùng rác
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ảnh đại diện
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ tên / Liên hệ
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tài khoản / Địa chỉ
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chức năng
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {user.id}
                    </td>

                    {/* Ảnh đại diện */}
                    <td className="px-4 py-3 flex justify-center">
                      <img
                        className="h-14 w-14 object-cover rounded-full border border-gray-200"
                        src={`${imageURL}/avatar/${user.avatar}?v=${
                          user.updated_at || Date.now()
                        }`}
                        alt={user.name}
                      />
                    </td>

                    {/* Họ tên + Liên hệ */}
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-gray-500 text-sm">{user.email}</div>
                      <div className="text-gray-500 text-sm">{user.phone}</div>
                    </td>

                    {/* Tài khoản + địa chỉ */}
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div className="text-gray-900">{user.username}</div>
                      <div className="text-gray-500 text-sm truncate max-w-xs">
                        {user.address}
                      </div>
                    </td>

                    {/* Trạng thái */}
                    <td className="px-4 py-3">
                      {user.status ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                          Ẩn
                        </span>
                      )}
                    </td>

                    {/* Hành động */}
                    <td>
                      <div className="flex items-center justify-center space-x-3">
                        <Link
                          to="#"
                          onClick={() => handleToggleStatus(user.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          {user.status ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </Link>

                        <Link
                          to={`/admin/userDetail/${user.id}`}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          <FaEye className="text-lg" />
                        </Link>

                        <Link
                          onClick={() =>
                            localStorage.setItem("currentUserPage", currentPage)
                          }
                          to={`/admin/user/edit/${user.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit className="text-lg" />
                        </Link>

                        <Link
                          to="#"
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="text-lg" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
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
    </div>
  );
};

export default ListUser;
