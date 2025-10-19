import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaPlus,
  FaTrash,
  FaEye,
  FaEdit,
  FaSearch,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiProduct from "../../../api/apiProduct";
import apiCategory from "../../../api/apiCategory";
import apiBrand from "../../../api/apiBrand";
import { imageURL } from "../../../api/config";

const ListProduct = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Bộ lọc
  const [filters, setFilters] = useState({
    category_id: "",
    brand_id: "",
    min_price: "",
    max_price: "",
    low_stock: false,
    status: "",
    keyword: "",
  });

  // 🔹 Lấy danh mục + thương hiệu
  useEffect(() => {
    apiCategory.getAll().then((res) => setCategories(res.data?.data || []));
    apiBrand.getAll().then((res) => setBrands(res.data?.data || []));
  }, []);

  // 🔹 Lấy sản phẩm (lọc + phân trang)
  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await apiProduct.getAllFiltered(filters, pageNum);
      if (res.status) {
        setProducts(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
      }
    } catch (err) {
      console.error("Lỗi lấy sản phẩm:", err);
      toast.error("Không thể tải sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(Number(page) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // 🔹 Chuyển trang
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      navigate(`/admin/products/${pageNumber}`);
    }
  };

  // 🔹 Áp dụng lọc
  const handleFilter = () => {
    navigate(`/admin/products/1`);
    fetchProducts(1);
  };

  // 🔹 Xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
    try {
      const res = await apiProduct.delete(id);
      if (res.status) {
        toast.success(res.message);
        fetchProducts(currentPage);
      } else toast.error(res.message);
    } catch (err) {
      toast.error("Lỗi khi xóa sản phẩm!");
    }
  };

  // 🔹 Đổi trạng thái
  const toggleStatus = async (id) => {
    try {
      await apiProduct.toggleStatus(id);
      fetchProducts(currentPage);
    } catch (err) {
      toast.error("Lỗi khi cập nhật trạng thái!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Danh sách sản phẩm
        </h3>
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/addProduct"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaPlus className="mr-2" /> Thêm mới
          </Link>
          <Link
            to="/admin/trashProduct"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center transition duration-200"
          >
            <FaTrash className="mr-2" /> Thùng rác
          </Link>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="p-4 flex flex-wrap gap-4 border-b border-gray-200 bg-gray-50">
        {/* Danh mục */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Danh mục</label>
          <select
            value={filters.category_id}
            onChange={(e) =>
              setFilters({ ...filters, category_id: e.target.value })
            }
            className="border rounded-md p-2 text-sm w-40"
          >
            <option value="">Tất cả</option>
            {categories
              .filter((c) => c.parent_id !== 0) // ✅ chỉ lấy danh mục con
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>

        </div>

        {/* Thương hiệu */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Thương hiệu</label>
          <select
            value={filters.brand_id}
            onChange={(e) =>
              setFilters({ ...filters, brand_id: e.target.value })
            }
            className="border rounded-md p-2 text-sm w-40"
          >
            <option value="">Tất cả</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Giá từ - đến */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Giá từ</label>
          <input
            type="number"
            placeholder="0"
            value={filters.min_price}
            onChange={(e) =>
              setFilters({ ...filters, min_price: e.target.value })
            }
            className="border rounded-md p-2 text-sm w-28"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Đến</label>
          <input
            type="number"
            placeholder="..."
            value={filters.max_price}
            onChange={(e) =>
              setFilters({ ...filters, max_price: e.target.value })
            }
            className="border rounded-md p-2 text-sm w-28"
          />
        </div>

        {/* Từ khóa */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Từ khóa</label>
          <input
            type="text"
            placeholder="Tên sản phẩm..."
            value={filters.keyword}
            onChange={(e) =>
              setFilters({ ...filters, keyword: e.target.value })
            }
            className="border rounded-md p-2 text-sm w-40"
          />
        </div>

        {/* Hết hàng */}
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="lowStock"
            checked={filters.low_stock}
            onChange={(e) =>
              setFilters({ ...filters, low_stock: e.target.checked })
            }
            className="mr-2"
          />
          <label htmlFor="lowStock" className="text-sm text-gray-700">
            Sắp hết hàng (≤10)
          </label>
        </div>

        {/* Trạng thái */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Trạng thái</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded-md p-2 text-sm w-36"
          >
            <option value="">Tất cả</option>
            <option value="1">Hoạt động</option>
            <option value="0">Ngừng</option>
          </select>
        </div>

        {/* Nút lọc */}
        <button
          onClick={handleFilter}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded text-sm font-semibold flex items-center gap-2 disabled:opacity-50 mt-5"
        >
          <FaSearch /> {loading ? "Đang lọc..." : "Lọc"}
        </button>
      </div>

      {/* Bảng sản phẩm */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Hình ảnh</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Tên sản phẩm</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Danh mục</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Thương hiệu</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Giá gốc</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Giá KM</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">SL</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Chức năng</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td>{p.id}</td>
                  <td className="py-2 flex justify-center">
                    <img
                      src={`${imageURL}/product/${p.thumbnail}`}
                      alt={p.name}
                      className="h-20 w-32 object-cover border rounded-md"
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category_name}</td>
                  <td>{p.brand_name}</td>
                  <td>
                    {p.price?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {p.sale?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{p.qty}</td>
                  <td>
                    {p.status ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        Ngừng
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center justify-center space-x-3 text-lg">
                      <button
                        onClick={() => toggleStatus(p.id)}
                        className="text-green-500 hover:text-green-700"
                      >
                        {p.status ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                      <Link
                        onClick={() => localStorage.setItem("currentProductPage", currentPage)}
                        to={`/admin/editProduct/${p.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit className="text-lg" />
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-gray-500 py-6">
                  Không có sản phẩm phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Phân trang */}
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
              className={`px-3 py-1 rounded ${currentPage === i + 1
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
  );
};

export default ListProduct;
