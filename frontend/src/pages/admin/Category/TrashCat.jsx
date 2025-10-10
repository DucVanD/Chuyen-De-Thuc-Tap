import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategory";
import { imageURL } from "../../../api/config";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaTrashRestore,
  FaTrashAlt,
} from "react-icons/fa";

const TrashCat = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadCategories(currentPage);
  }, [currentPage]);

  const loadCategories = async (page) => {
    try {
      const res = await apiCategory.getTrash(page);
      if (res.status) {
        setList(res.categories.data);
        setTotalPages(res.categories.last_page);
      } else {
        toast.error("Không thể tải danh mục");
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh mục");
      console.error(error);
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await apiCategory.restore(id);
      if (res.status) {
        toast.success("Khôi phục danh mục thành công");
        loadCategories(currentPage);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Lỗi khi khôi phục danh mục");
    }
  };

  const handleForceDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa vĩnh viễn danh mục này?")) return;
    try {
      const res = await apiCategory.forceDelete(id);
      if (res.status) {
        toast.success("Xóa vĩnh viễn danh mục thành công");
        loadCategories(currentPage);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Lỗi khi xóa danh mục");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    navigate(`/admin/trashCat/${newPage}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Thùng rác danh mục
        </h3>
        <Link
          to="/admin/categorys/1"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
        >
          <FaArrowLeft className="mr-2" /> Về danh sách
        </Link>
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
                  Tên danh mục
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thứ tự
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list.length > 0 ? (
                list.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{cat.id}</td>
                    <td className="px-4 py-3">
                      <img
                        className="h-14 w-20 object-cover border border-gray-200 rounded-md"
                        src={`${imageURL}/category/${cat.image}`}
                        alt={cat.name}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {cat.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {cat.sort_order}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => handleRestore(cat.id)}
                          className="text-indigo-500 hover:text-indigo-700"
                          title="Khôi phục"
                        >
                          <FaTrashRestore className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleForceDelete(cat.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Xóa vĩnh viễn"
                        >
                          <FaTrashAlt className="text-lg" />
                        </button>
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
                    Không có danh mục nào trong thùng rác
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>
          <span className="px-3 py-1 border rounded bg-gray-100">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashCat;
