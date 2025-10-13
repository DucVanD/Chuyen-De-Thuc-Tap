// src/pages/admin/posts/ListPost.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import apiPost from "../../../api/apiPost"; // 👈 Đảm bảo đường dẫn đúng tới file api của bạn
import { imageURL } from "../../../api/config"; // nếu có cấu hình imageURL

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Lấy danh sách bài viết
  const fetchPosts = async (page = 1) => {
    try {
      const res = await apiPost.getAllPage(page);
      if (res.status) {
        setPosts(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bài viết:", err);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  // Phân trang
  const handlePageChange = (page) => {
    if (page > 0 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Danh sách bài viết
        </h3>
        <div className="flex space-x-3">
          <Link
            to="/admin/addPost"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaPlus className="mr-2" /> Thêm mới
          </Link>
          <Link
            to="/admin/posts/trash"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaTrash className="mr-2" /> Thùng rác
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chức năng
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {posts.length > 0 ? (
                posts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex-shrink-0 h-14 w-20">
                        {item.thumbnail ? (
                          <img
                            className="h-14 w-20 object-cover border border-gray-200 rounded-md"
                            src={
                              item.thumbnail.startsWith("http")
                                ? item.thumbnail
                                : `${imageURL}/post/${item.thumbnail}`
                            }
                            alt={item.title}
                          />
                        ) : (
                          <div className="h-14 w-20 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-xs">
                              Không có hình
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                      {item.title}
                      <div className="text-gray-500 text-xs">
                        Slug: {item.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.status === 1 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Hiển thị
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Ẩn
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                      <div className="flex items-center justify-center space-x-3">
                        {item.status === 1 ? (
                          <Link
                            to={`/admin/posts/status/${item.id}`}
                            className="text-green-500 hover:text-green-700"
                            title="Đổi trạng thái"
                          >
                            <FaToggleOn className="text-xl" />
                          </Link>
                        ) : (
                          <Link
                            to={`/admin/posts/status/${item.id}`}
                            className="text-red-500 hover:text-red-700"
                            title="Đổi trạng thái"
                          >
                            <FaToggleOff className="text-xl" />
                          </Link>
                        )}

                        <Link
                          to={`/admin/posts/detail/${item.id}`}
                          className="text-indigo-500 hover:text-indigo-700"
                          title="Xem chi tiết"
                        >
                          <FaEye className="text-lg" />
                        </Link>

                        <Link
                          to={`/admin/editPost/${item.id}`}
                          className="text-blue-500 hover:text-blue-700"
                          title="Chỉnh sửa"
                        >
                          <FaEdit className="text-lg" />
                        </Link>

                        <Link
                          to={`/admin/posts/delete/${item.id}`}
                          className="text-red-500 hover:text-red-700"
                          title="Xóa"
                        >
                          <FaTrash className="text-lg" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {/* Nút Trước */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Trước
            </button>

            {/* Số trang */}
            {Array.from({ length: lastPage }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Nút Sau */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === lastPage}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListPost;
