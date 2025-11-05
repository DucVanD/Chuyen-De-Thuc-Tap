import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiUser from "../../api/apiUser";
import apiOrder from "../../api/apiOrder";
import { toast } from "react-toastify";
import { FaBoxOpen, FaCalendarAlt, FaTimes } from "react-icons/fa";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

// ---------------- STATUS ----------------
const statusLabels = {
  1: { text: "Đang chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
  2: { text: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
  3: { text: "Đang đóng gói", color: "bg-orange-100 text-orange-800" },
  4: { text: "Đang giao hàng", color: "bg-teal-100 text-teal-800" },
  5: { text: "Đã giao", color: "bg-green-100 text-green-800" },
  6: { text: "Hoàn hàng / Trả hàng", color: "bg-purple-100 text-purple-800" },
  7: { text: "Đã hủy", color: "bg-red-100 text-red-800" },
};

// ---------------- CANCEL REASONS ----------------
const cancelOptions = [
  "🕒 Đặt nhầm / không còn nhu cầu",
  "💰 Thấy giá cao hơn so với nơi khác",
  "✏️ Muốn đổi sang sản phẩm khác",
  "🚫 Thông tin đặt hàng sai (địa chỉ, số điện thoại,...)",
  "❌ Khác (nhập lý do riêng)",
];

// ---------------- LOADING OVERLAY ----------------
const Spinner = () => (
  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
    <div className="text-base font-medium text-gray-600 animate-pulse">
      Đang tải dữ liệu...
    </div>
  </div>
);

const HistoryBought = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // States
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

  // Modal cancel
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  // ---------------- FETCH HISTORY ----------------
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
      const params = new URLSearchParams({ page: pageNum, ...activeFilters }).toString();

      const res = await apiUser.getUserIdWithParams(userId, params);
      setUserData(res.status ? res.data : null);
    } catch (err) {
      console.error("❌ Lỗi khi lấy lịch sử:", err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(parseInt(page) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ---------------- HANDLERS ----------------
  const handleFilter = () => {
    if (page !== "1") navigate(`/history-bought/1`);
    else fetchHistory(1);
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= (userData?.pagination?.last_page || 1)) {
      navigate(`/history-bought/${pageNum}`);
    }
  };

  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setCancelReason("");
    setCustomReason("");
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    if (!cancelReason) {
      toast.warning("Vui lòng chọn lý do hủy đơn hàng!");
      return;
    }
    const finalReason =
      cancelReason === "❌ Khác (nhập lý do riêng)" ? customReason : cancelReason;

    if (!finalReason.trim()) {
      toast.warning("Vui lòng nhập lý do cụ thể!");
      return;
    }

    try {
      setLoading(true);
      const res = await apiOrder.cancelOrder(selectedOrder.id, finalReason);
      setLoading(false);
      setShowCancelModal(false);

      if (res.status) {
        toast.success(
          selectedOrder.payment !== "COD"
            ? "💸 Đơn hàng đã được hủy. Tiền sẽ hoàn lại trong 8 giờ tới."
            : "🗑️ Hủy đơn hàng thành công!"
        );
        fetchHistory(page || 1);
      } else {
        toast.error(res.message || "Không thể hủy đơn hàng.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Lỗi khi hủy đơn hàng!");
      console.error(err);
    }
  };

  // ---------------- RENDER ----------------
  if (loading && !userData) {
    return (
      <div className="flex h-64 items-center justify-center text-lg text-gray-500">
        Đang tải lịch sử mua hàng...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Không có dữ liệu lịch sử mua hàng.
      </div>
    );
  }

  const { summary, orders, pagination } = userData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <HiOutlineClipboardDocumentCheck className="h-6 w-6 text-indigo-600" />
        <span>Lịch sử mua hàng</span>
      </h1>

      {/* Filters */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Từ ngày</label>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              className="border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Đến ngày</label>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              className="border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Trạng thái</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 rounded-md p-2 text-sm"
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
              onChange={(e) => setFilters({ ...filters, payment: e.target.value })}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Tất cả</option>
              <option value="COD">COD</option>
              <option value="BANK">Chuyển khoản</option>
              <option value="VNPAY">VnPay</option>
            </select>
          </div>
          <button
            onClick={handleFilter}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-sm font-semibold"
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

      {/* Orders */}
      <div className="relative min-h-[300px]">
        {loading && <Spinner />}

        {!loading && orders?.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 bg-white transition hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-800">
                    Mã đơn:{" "}
                    <span className="text-indigo-600 font-mono">{order.order_code}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <FaCalendarAlt className="text-gray-400" /> {order.created_at}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Thanh toán:{" "}
                    <span className="font-medium text-green-600">{order.payment}</span>
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusLabels[order.status]?.color}`}
                >
                  {statusLabels[order.status]?.text}
                </span>
              </div>

              {order.products?.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        Giá: {p.price_buy} | SL: {p.qty}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-700">{p.amount}</p>
                </div>
              ))}

              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <span className="font-semibold">
                  Tổng tiền:{" "}
                  <span className="text-indigo-700">{order.total_amount}</span>
                </span>
                {[1, 2].includes(order.status) && (
                  <button
                    onClick={() => openCancelModal(order)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    Hủy đơn hàng
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 pt-16">
            <FaBoxOpen className="mx-auto text-5xl mb-3 text-gray-400" />
            <p>Không có đơn hàng nào phù hợp.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={pagination.current_page === 1 || loading}
            onClick={() => goToPage(pagination.current_page - 1)}
            className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            ← Trước
          </button>
          <span className="text-sm text-gray-700">
            Trang {pagination.current_page} / {pagination.last_page}
          </span>
          <button
            disabled={pagination.current_page === pagination.last_page || loading}
            onClick={() => goToPage(pagination.current_page + 1)}
            className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Sau →
          </button>
        </div>
      )}
{/* bg-gray-900 bg-opacity-40 */}
      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowCancelModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Hủy đơn hàng <span className="text-indigo-600">#{selectedOrder?.order_code}</span>
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              Vui lòng chọn lý do hủy đơn hàng:
            </p>

            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3"
            >
              <option value="">-- Chọn lý do --</option>
              {cancelOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {cancelReason === "❌ Khác (nhập lý do riêng)" && (
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Nhập lý do cụ thể..."
                className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3"
                rows="3"
              ></textarea>
            )}

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
              >
                Đóng
              </button>
              <button
                onClick={confirmCancelOrder}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryBought;
