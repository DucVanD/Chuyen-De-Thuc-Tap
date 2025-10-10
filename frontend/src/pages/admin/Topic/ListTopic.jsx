import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiTopic from "../../../api/apiTopic";
import { imageURL } from "../../../api/config";
import {
  FaPlus,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
} from "react-icons/fa";

const ListTopic = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [lastPage, setLastPage] = useState(1);

  // ✅ Lấy danh sách chủ đề
  const fetchTopics = async (page = 1) => {
    try {
      const res = await apiTopic.getAllPage(page);
      if (res.status) {
        setTopics(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
      }
    } catch (err) {
      console.error("Lỗi khi lấy chủ đề:", err);
      toast.error("Không thể tải danh sách chủ đề!");
    }
  };

  useEffect(() => {
    fetchTopics(Number(page) || 1);
  }, [page]);

  // ✅ Chuyển trang
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      navigate(`/admin/topics/${pageNumber}`);
    }
  };

  // ✅ Toggle trạng thái
  const handleToggleStatus = async (id) => {
    try {
      const res = await apiTopic.toggleStatus(id);
      if (res.status) {
        toast.success(res.message);
        fetchTopics(currentPage);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật trạng thái chủ đề!");
    }
  };

  // ✅ Xóa mềm chủ đề
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa chủ đề này không?")) return;
    try {
      const res = await apiTopic.delete(id);
      if (res.status) {
        toast.success(res.message);
        fetchTopics(currentPage);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Xóa chủ đề thất bại!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Danh sách chủ đề
        </h3>
        <div className="flex space-x-3">
          <Link
            to="/admin/addTopic"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaPlus className="mr-2" /> Thêm mới
          </Link>
          <Link
            to="/admin/trashTopic"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center transition duration-200"
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
                  Tên chủ đề
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
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
              {topics.length > 0 ? (
                topics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {topic.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {topic.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[300px] truncate">
                      {topic.description || "Không có mô tả"}
                    </td>
                   
                    <td className="px-4 py-3">
                      {topic.status ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                          Ẩn
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center justify-center space-x-3">
                        <Link
                          to="#"
                          onClick={() => handleToggleStatus(topic.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          {topic.status ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </Link>

                        <Link
                          to="#"
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          <FaEye className="text-lg" />
                        </Link>

                        <Link
                          onClick={() =>
                            localStorage.setItem(
                              "currentTopicPage",
                              currentPage
                            )
                          }
                          to={`/admin/edittopic/${topic.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit className="text-lg" />
                        </Link>

                        <Link
                          to="#"
                          onClick={() => handleDelete(topic.id)}
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
                    Không có chủ đề nào.
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

export default ListTopic;
