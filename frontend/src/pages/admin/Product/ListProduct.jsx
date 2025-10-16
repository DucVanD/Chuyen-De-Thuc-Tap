import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash, FaToggleOn, FaToggleOff, FaEye, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";

const ListProduct = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [lastPage, setLastPage] = useState(1);

  const fetchProducts = async (page = 1) => {
    try {
      const res = await apiProduct.getAllPage(page);
      if (res.status) {
        setProducts(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
      }
    } catch (err) {
      toast.error("Lỗi khi lấy danh sách sản phẩm!");
      console.error(err);
    }
  };

    console.log(products);

  useEffect(() => {
    fetchProducts(Number(page) || 1);
  }, [page]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      navigate(`/admin/products/${pageNumber}`);
    }
  };

  // Xóa mềm (soft delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
    try {
      const res = await apiProduct.delete(id);
      if (res.status) {
        toast.success(res.message);
        fetchProducts(currentPage);
      } else {
        toast.error(res.message); // ví dụ: sản phẩm đang có đơn, không xóa được
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Xóa thất bại!");
    }
  };


  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">Danh sách sản phẩm</h3>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-sm">Trang {currentPage} / {lastPage}</span>
          <div className="flex space-x-3">
            <Link to="/admin/addProduct" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200">
              <FaPlus className="mr-2" /> Thêm mới
            </Link>
            <Link to="/admin/trashProduct" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center transition duration-200">
              <FaTrash className="mr-2" /> Thùng rác
            </Link>
          </div>
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
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Giá gốc</th>
               <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Giá khuyến mại</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Số Lượng</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length > 0 ? products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 text-center">
                <td>{product.id}</td>
                <td className="py-2 flex justify-center">
                  <img className="h-24 w-40 object-cover border border-gray-200 rounded-md" src={`${imageURL}/product/${product.thumbnail}?v=${product.updated_at || Date.now()}`} alt={product.name} />

                </td>
                <td>{product.name}</td>
                <td>{product.category_name || 'Chưa cập nhật'}</td>
                <td>{product.brand_name || 'Chưa cập nhật'}</td>
                <td>{product.price ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa cập nhật'}</td>
                <td>{product.sale ? product.sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa cập nhật'}</td>
                <td>{product.qty}</td>
                <td>
                  {product.status ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Hoạt động</span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Ngừng hoạt động</span>
                  )}
                </td>
                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <Link to="#" className="text-green-500 hover:text-green-700">{product.status ? <FaToggleOn className="text-xl" /> : <FaToggleOff className="text-xl" />}</Link>
                    <Link to="#" className="text-indigo-500 hover:text-indigo-700"><FaEye className="text-lg" /></Link>
                    <Link onClick={() => localStorage.setItem("currentProductPage", currentPage)} to={`/admin/editProduct/${product.id}`} className="text-blue-500 hover:text-blue-700"><FaEdit className="text-lg" /></Link>
                    <Link to="#" onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700"><FaTrash className="text-lg" /></Link>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">Không có sản phẩm nào.</td>
              </tr>
            )}
          </tbody>
        </table>

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

export default ListProduct;
