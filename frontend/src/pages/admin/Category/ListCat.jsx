import { Link, useNavigate, useParams ,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import apiCategory from "../../../api/apiCategory";
import { imageURL } from "../../../api/config";
import {
  FaPlus,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
} from "react-icons/fa";
const ListCat = () => {
  const { page } = useParams(); // Lấy page từ URL
  
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [lastPage, setLastPage] = useState(1);

  const fetchCategories = (page = 1) => {
    apiCategory
      .getAllPage(page)
      .then((res) => {
        if (res.status) {
          setCategories(res.data.data);
          setCurrentPage(res.data.current_page);
          setLastPage(res.data.last_page);
        }
      })
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));
  };

  useEffect(() => {
    fetchCategories(Number(page) || 1);
  }, [page]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      navigate(`/admin/categories/${pageNumber}`); // Cập nhật URL
    }
  };



  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Danh sách danh mục
          </h3>
          <div className="flex space-x-3">
            <Link
              to="/admin/addCat"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
            >
              <FaPlus className="mr-2" /> Thêm mới
            </Link>
            <Link
              to="/admin/trashCat"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center transition duration-200"
            >
              <FaTrash className="mr-2" /> Thùng rác
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collaps text-center">
              <thead className="">
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên danh mục
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thứ tự
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
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm  text-gray-900">
                        <td>{category.id}</td>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap flex justify-center">
                        
                          <img
                            className="h-24 w-40 object-cover border border-gray-200 rounded-md"
                            // src={raucu}
                            // src={`${imageURL}/category/${category.image}`}
                            src={`${imageURL}/category/${category.image}?v=${category.updated_at || Date.now()}`}

                            alt={category.name}
                          />
                        
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        {category.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        {category.sort_order}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Hoạt động
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-center space-x-3">
                          <Link
                            to="#"
                            className="text-green-500 hover:text-green-700"
                          >
                            {category.status ? (
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
                            to={`/admin/editcat/${category.id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit className="text-lg" />
                          </Link>
                          <Link
                            to="#"
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
                      Không có danh mục nào.
                    </td>
                  </tr>
                )}

                {/* thêm hàng khác ở đây nếu cần */}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
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
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCat;
