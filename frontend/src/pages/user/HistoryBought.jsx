import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiUser from "../../api/apiUser";
import { FaBoxOpen, FaCalendarAlt } from "react-icons/fa";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

const statusLabels = {
  1: { text: "Đang chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
  2: { text: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
  3: { text: "Đang đóng gói", color: "bg-orange-100 text-orange-800" },
  4: { text: "Đang giao hàng", color: "bg-teal-100 text-teal-800" },
  5: { text: "Đã giao", color: "bg-green-100 text-green-800" },
  6: { text: "Hoàn hàng / Trả hàng", color: "bg-purple-100 text-purple-800" },
  7: { text: "Đã hủy", color: "bg-red-100 text-red-800" },
};

// ✅ Component Spinner để hiển thị trạng thái tải cục bộ
const Spinner = () => (
  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
    <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
  </div>
);

const HistoryBought = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    payment: "",
    min_total: "",
    max_total: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const fetchHistory = async (pageNum = 1) => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );
      const params = new URLSearchParams({
        page: pageNum,
        ...activeFilters,
      }).toString();

      const res = await apiUser.getUserIdWithParams(userId, params);
      if (res.status) {
        setUserData(res.data);
      } else {
        setUserData(null);
      }
    } catch (err) {
      console.error("❌ Lỗi khi lấy lịch sử:", err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const current = parseInt(page) || 1;
    fetchHistory(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleFilter = () => {
    if (page !== "1") {
      navigate(`/history-bought/1`);
    } else {
      fetchHistory(1);
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= (userData?.pagination?.last_page || 1)) {
      navigate(`/history-bought/${pageNum}`);
    }
  };

  // ✅ Xóa bỏ return sớm khi loading, chỉ return khi chưa có dữ liệu lần đầu
  if (loading && !userData) {
    return (
      <div className="flex h-64 items-center justify-center text-center text-lg text-gray-500">
        Đang tải lịch sử mua hàng...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Không thể tải dữ liệu hoặc không có lịch sử mua hàng.
      </div>
    );
  }

  const { name, summary, orders, pagination } = userData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <HiOutlineClipboardDocumentCheck className="h-6 w-6 text-indigo-600" />
        <span>
          Lịch sử mua hàng{" "}
          {/* <span className="text-indigo-600">{name || "Người dùng"}</span> */}
        </span>
      </h1>

      {/* Bộ lọc nâng cao */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Từ ngày</label>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Đến ngày</label>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Trạng thái</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Tất cả</option>
              {Object.entries(statusLabels).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Thanh toán</label>
            <select
              value={filters.payment}
              onChange={(e) =>
                setFilters({ ...filters, payment: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Tất cả</option>
              <option value="COD">COD</option>
              <option value="BANK">Chuyển khoản</option>
              <option value="MOMO">Momo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tổng tiền từ</label>
            <input
              type="number"
              value={filters.min_total}
              onChange={(e) =>
                setFilters({ ...filters, min_total: e.target.value })
              }
              placeholder="vd: 100000"
              className="border border-gray-300 rounded-md p-2 text-sm w-32 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Đến</label>
            <input
              type="number"
              value={filters.max_total}
              onChange={(e) =>
                setFilters({ ...filters, max_total: e.target.value })
              }
              placeholder="vd: 500000"
              className="border border-gray-300 rounded-md p-2 text-sm w-32 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleFilter}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-sm font-semibold self-end disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang lọc..." : "Lọc"}
          </button>
        </div>
        <div className="text-sm text-gray-700 pt-2 border-t border-gray-200 mt-2">
          <p>
            Tổng đơn:{" "}
            <span className="font-semibold text-indigo-700">
              {summary?.total_orders || 0}
            </span>{" "}
            | Tổng sản phẩm:{" "}
            <span className="font-semibold text-indigo-700">
              {summary?.total_products || 0}
            </span>
          </p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <p>🟢 Đã giao: <b>{summary.delivered_orders}</b></p>
            <p>🟡 Đang chờ: <b>{summary.pending_orders}</b></p>
            <p>🔵 Đã xác nhận: <b>{summary.confirmed_orders}</b></p>
            <p>🔴 Đã hủy: <b>{summary.canceled_orders}</b></p>
          </div>

        </div>
      </div>

      {/* ✅ Bọc danh sách đơn hàng bằng thẻ div relative */}
      <div className="relative min-h-[300px]">

        {/* ✅ Lớp phủ loading chỉ hiển thị khi đang lọc/chuyển trang */}
        {loading && <Spinner />}

        {/* ✅ Hiển thị danh sách đơn hàng */}
        {!loading && orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 bg-white"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-800">
                    Mã đơn:{" "}
                    <span className="text-indigo-600 font-mono">
                      {order.order_code || "---"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <FaCalendarAlt className="text-gray-400" />{" "}
                    {order.created_at}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Thanh toán:{" "}
                    <span className="font-medium text-green-600">
                      {order.payment}
                    </span>
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusLabels[order.status]?.color || "bg-gray-200"
                      }`}
                  >
                    {statusLabels[order.status]?.text || "Không xác định"}
                  </span>
                </div>
              </div>
              {order.products?.length > 0 && (
                <div className="p-4">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-none"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Giá: {product.price_buy} | SL: {product.qty}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-700">
                        {product.amount}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="p-4 bg-gray-50 text-right text-base font-semibold">
                Tổng tiền:{" "}
                <span className="text-indigo-700">{order.total_amount}</span>
              </div>
            </div>
          ))
        ) : (
          /* ✅ Thông báo "Không có đơn hàng" chỉ hiển thị khi không loading */
          !loading && (
            <div className="text-center text-gray-500 pt-16">
              <FaBoxOpen className="mx-auto text-5xl mb-3 text-gray-400" />
              <p>Không có đơn hàng nào phù hợp.</p>
            </div>
          )
        )}
      </div>

      {/* Phân trang */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={pagination.current_page === 1 || loading}
            onClick={() => goToPage(pagination.current_page - 1)}
            className="px-4 py-2 border rounded-md text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Trước
          </button>
          <span className="text-sm text-gray-700">
            Trang {pagination.current_page} / {pagination.last_page}
          </span>
          <button
            disabled={
              pagination.current_page === pagination.last_page || loading
            }
            onClick={() => goToPage(pagination.current_page + 1)}
            className="px-4 py-2 border rounded-md text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryBought;