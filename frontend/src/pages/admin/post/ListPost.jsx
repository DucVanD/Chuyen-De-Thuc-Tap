import { FaPlus, FaTrash, FaToggleOn, FaToggleOff, FaEye, FaEdit } from "react-icons/fa";

const ListPost = () => {
  const posts = [
    {
      id: 1,
      title: "Cách làm bánh mì ngon tại nhà",
      slug: "cach-lam-banh-mi-ngon",
      thumbnail: "https://via.placeholder.com/150",
      status: 1,
    },
    {
      id: 2,
      title: "Mẹo bảo quản rau củ tươi lâu",
      slug: "meo-bao-quan-rau-cu",
      thumbnail: "",
      status: 0,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Danh sách bài viết
        </h3>
        <div className="flex space-x-3">
          <a
            href="#"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaPlus className="mr-2" /> Thêm mới
          </a>
          <a
            href="#"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaTrash className="mr-2" /> Thùng rác
          </a>
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
              {posts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex-shrink-0 h-14 w-20">
                      {item.thumbnail ? (
                        <img
                          className="h-14 w-20 object-cover border border-gray-200 rounded-md"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      ) : (
                        <div className="h-14 w-20 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Không có hình</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {item.title}
                    <div className="text-gray-500 text-xs">Slug: {item.slug}</div>
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
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      {item.status === 1 ? (
                        <a href="#" className="text-green-500 hover:text-green-700" title="Đổi trạng thái">
                          <FaToggleOn className="text-xl" />
                        </a>
                      ) : (
                        <a href="#" className="text-red-500 hover:text-red-700" title="Đổi trạng thái">
                          <FaToggleOff className="text-xl" />
                        </a>
                      )}
                      <a href="#" className="text-indigo-500 hover:text-indigo-700" title="Xem chi tiết">
                        <FaEye className="text-lg" />
                      </a>
                      <a href="#" className="text-blue-500 hover:text-blue-700" title="Chỉnh sửa">
                        <FaEdit className="text-lg" />
                      </a>
                      <a href="#" className="text-red-500 hover:text-red-700" title="Xóa">
                        <FaTrash className="text-lg" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          <button className="px-3 py-1 text-sm border rounded text-gray-600 hover:bg-gray-100">
            &lt;
          </button>
          <button className="px-3 py-1 text-sm border rounded bg-indigo-600 text-white">
            1
          </button>
          <button className="px-3 py-1 text-sm border rounded text-gray-600 hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1 text-sm border rounded text-gray-600 hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListPost;
