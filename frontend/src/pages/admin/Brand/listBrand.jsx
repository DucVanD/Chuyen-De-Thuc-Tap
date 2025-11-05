import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Sử dụng useParams và Link
import {
  FaPlus,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
} from "react-icons/fa";

import { imageURL } from "../../../api/config";

import apiBrand from "../../../api/apiBrand";

const ListBrand = () => {
  const [brands, setBrands] = useState([]); // Lưu danh sách danh mục

  useEffect(() => {
    // Lấy danh sách thương hiệu từ API
    apiBrand
      .getAll()
      .then((res) => {
        if (res.status) {
          setBrands(res.data.data); // Giả sử API trả về mảng danh mục trong res.data.data
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách thương hiệu:", err);
      });
  }, []);

  
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Danh sách thương hiệu
          </h3>
          <div className="flex space-x-3">
            <a
              href="#add"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
            >
              <i className="fas fa-plus mr-2"></i> Thêm mới
            </a>
            <a
              href="#trash"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center transition duration-200"
            >
              <i className="fas fa-trash mr-2"></i> Thùng rác
            </a>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên thương hiệu
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thứ tự
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                  {brands.length > 0 ? (
                                  brands.map((brand) => (
                                    <tr className="hover:bg-gray-50">
                                      <td className="px-4 py-3 whitespace-nowrap text-sm  text-gray-900">
                                        <td>{brand.id}</td>
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap flex justify-center">
                                        
                                          <img
                                            className="h-24 w-40 object-cover border border-gray-200 rounded-md"
                                            // src={raucu}
                                            // src={`${imageURL}/brand/${brand.image}`}
                                            src="https://via.placeholder.com/150"
                                            alt={brand.name}
                                          />
                                        
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                        {brand.name}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                        {brand.sort_order}
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
                                            {brand.status ? (
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
                                            to={`/admin/editProduct/${brands.slug}`}
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
                                      Không có thương hiệu nào.
                                    </td>
                                  </tr>
                                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (demo tĩnh) */}
          <div className="mt-4 flex justify-center">
            <nav className="flex space-x-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                1
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                3
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBrand;
