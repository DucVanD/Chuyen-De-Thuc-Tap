import { Link, useNavigate, useParams } from "react-router-dom";
import { FaTrashRestore, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";

const TrashProduct = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [lastPage, setLastPage] = useState(1);

  // Lấy danh sách sản phẩm trong trash theo phân trang
  const fetchTrash = async (page = 1) => {
    try {
      const res = await apiProduct.getTrash(page); // nhớ API hỗ trợ pagination
      if (res.status) {
        setProducts(res.data.data); // hoặc res.data.products tuỳ API
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
      }
    } catch (err) {
      toast.error("Lỗi khi lấy thùng rác!");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrash(Number(page) || 1);
  }, [page]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      navigate(`/admin/trashProduct/${pageNumber}`);
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await apiProduct.restore(id);
      toast[res.status ? "success" : "error"](res.message);
      if (res.status) fetchTrash(currentPage);
    } catch (err) {
      toast.error(err.response?.data?.message || "Khôi phục thất bại!");
    }
  };

  const handleForceDelete = async (id) => {
    if (!window.confirm("Xóa vĩnh viễn sẽ không thể khôi phục!")) return;
    try {
      const res = await apiProduct.forceDelete(id);
      toast[res.status ? "success" : "error"](res.message);
      if (res.status) fetchTrash(currentPage);
    } catch (err) {
      toast.error(err.response?.data?.message || "Xóa vĩnh viễn thất bại!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">Thùng rác sản phẩm</h3>
        <div>
          <Link to="/admin/products/1" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200">
            <i className="fas fa-arrow-left mr-2"></i> Về danh sách
          </Link>
        </div>
      </div>

      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Thương hiệu</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length > 0 ? products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 text-center">
                <td>{product.id}</td>
                <td className="py-2 flex justify-center">
                  <img className="h-24 w-40 object-cover border border-gray-200 rounded-md" src={`${imageURL}/product/${product.thumbnail}`} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.categoryname || 'Chưa cập nhật'}</td>
                <td>{product.brandname || 'Chưa cập nhật'}</td>
                <td>{product.price_root?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 'Chưa cập nhật'}</td>
                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <button onClick={() => handleRestore(product.id)} className="text-green-500 hover:text-green-700">
                      <FaTrashRestore className="text-lg" />
                    </button>
                    <button onClick={() => handleForceDelete(product.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">Không có sản phẩm nào trong thùng rác.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Trước</button>
          {Array.from({ length: lastPage }, (_, i) => (
            <button key={i} onClick={() => goToPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{i + 1}</button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === lastPage} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Sau</button>
        </div>
      </div>
    </div>
  );
};

export default TrashProduct;
