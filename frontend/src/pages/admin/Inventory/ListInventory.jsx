import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUndo,
  FaArrowLeft,
  FaArrowRight,
  FaPlusCircle,
  FaMinusCircle,
  FaCog,
} from "react-icons/fa";
import apiStock from "../../../api/apiStock";

const ListInventory = () => {
  const [movements, setMovements] = useState([]);
  const [filters, setFilters] = useState({ type: "", product_name: "", date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // === Load dữ liệu tồn kho ===
  const fetchMovements = async (page = 1) => {
    try {
      const res = await apiStock.getAll({ page, ...filters });
      const list = res.data?.data;
      setMovements(list.data || []);
      setCurrentPage(list.current_page);
      setLastPage(list.last_page);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu tồn kho:", error);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  // === Format loại thao tác ===
  const formatType = (type) => {
    const types = {
      import: { text: "Nhập kho", emoji: "➕", color: "text-green-600" },
      export: { text: "Xuất kho", emoji: "➖", color: "text-red-600" },
      adjustment: { text: "Điều chỉnh", emoji: "⚙️", color: "text-yellow-600" },
      return: { text: "Trả hàng", emoji: "↩️", color: "text-blue-600" },
    };
    return types[type] || { text: "Khác", emoji: "❔", color: "text-gray-600" };
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchMovements(1);
  };

  const resetFilter = () => {
    setFilters({ type: "", product_name: "", date: "" });
    fetchMovements(1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > lastPage) return;
    fetchMovements(page);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-50 shadow rounded-2xl">
      {/* === Tiêu đề + nút thao tác === */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">📦 Lịch sử tồn kho</h2>
        <div className="flex gap-2">
          <Link
            to="/admin/inventory/import"
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm shadow"
          >
            <FaPlusCircle /> Nhập kho
          </Link>
          <Link
            to="/admin/inventory/export"
            className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm shadow"
          >
            <FaMinusCircle /> Xuất kho
          </Link>
          <Link
            to="/admin/inventory/adjust"
            className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 text-sm shadow"
          >
            <FaCog /> Điều chỉnh
          </Link>
          {/* <Link to="/admin/inventory/return" className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm shadow">
            ↩️ Trả hàng
          </Link> */}
        </div>
      </div>

      {/* --- Bộ lọc --- */}
      <form
        onSubmit={handleFilter}
        className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
      >
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Loại thao tác</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="border rounded-lg p-2 text-sm w-44 focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Tất cả</option>
            <option value="import">Nhập kho</option>
            <option value="export">Xuất kho</option>
            <option value="adjustment">Điều chỉnh</option>
            <option value="return">Trả hàng</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Tên sản phẩm</label>
          <input
            type="text"
            value={filters.product_name}
            onChange={(e) => setFilters({ ...filters, product_name: e.target.value })}
            placeholder="Nhập tên sản phẩm..."
            className="border rounded-lg p-2 text-sm w-56 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Ngày</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="border rounded-lg p-2 text-sm w-44 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex gap-2 items-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm shadow"
          >
            <FaSearch /> Lọc
          </button>
          <button
            type="button"
            onClick={resetFilter}
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm"
          >
            <FaUndo /> Đặt lại
          </button>
        </div>
      </form>

      {/* --- Bảng dữ liệu --- */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-indigo-50 text-indigo-800">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Loại</th>
              <th className="p-3 text-left">Mã SP</th>
              <th className="p-3 text-left">Tên sản phẩm</th>
              <th className="p-3 text-center">Thay đổi</th>
              <th className="p-3 text-center">Tồn sau</th>
              <th className="p-3 text-left">Ghi chú</th>
              <th className="p-3 text-left">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {movements.length > 0 ? (
              movements.map((item, i) => {
                const typeData = formatType(item.type);
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 border-t border-gray-100 transition"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className={`p-3 font-medium ${typeData.color}`}>
                      {typeData.emoji} {typeData.text}
                    </td>
                    <td className="p-3">{item.product_id}</td>
                    <td className="p-3">{item.product_name}</td>
                    <td
                      className={`p-3 font-semibold text-center ${item.quantity_change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {item.quantity_change > 0
                        ? `↑ ${item.quantity_change}`
                        : `↓ ${Math.abs(item.quantity_change)}`}
                    </td>
                    <td className="p-3 text-center">{item.qty_after}</td>
                    <td className="p-3 text-gray-700">{item.note || "—"}</td>
                    <td className="p-3 text-gray-600">
                      {new Date(item.created_at).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-5">
                  Không có dữ liệu tồn kho.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Phân trang --- */}
      {lastPage > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            <FaArrowLeft /> Trước
          </button>
          {Array.from({ length: lastPage }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded-full transition ${currentPage === i + 1
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === lastPage}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            Sau <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ListInventory;
