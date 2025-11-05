// src/pages/admin/orders/EditOrder.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiOrder from "../../../api/apiOrder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // ✅ Lấy thông tin đơn hàng theo ID
  useEffect(() => {
    apiOrder.getOrderId(id).then((res) => {
      if (res.status && res.data) setOrder(res.data);
    });
  }, [id]);

  // ✅ Kiểm tra trạng thái bị khóa
  const isLocked = order && [6, 7].includes(order.status); // chỉ khóa khi hoàn hàng hoặc đã hủy

  // ✅ Tính danh sách trạng thái có thể chọn
  const allowedStatuses = (() => {
    if (!order) return [];
    switch (order.status) {
      case 1:
        return [1, 2, 3, 4, 5, 6, 7];
      case 2:
        return [2, 3, 4, 5, 6, 7];
      case 3:
        return [3, 4, 5, 6, 7];
      case 4:
        return [4, 5, 6, 7]; // đang giao → chỉ được lên giao/thành công/hủy
      case 5:
        return [5, 6]; // đã giao → chỉ có thể hoàn hàng
      case 6:
      case 7:
        return [order.status]; // hoàn hàng hoặc hủy → khóa
      default:
        return [order.status];
    }
  })();

  // ✅ Submit cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) {
      toast.warning("⚠️ Đơn hàng đã hoàn hàng hoặc bị hủy — không thể chỉnh sửa!");
      return;
    }

    try {
      const res = await apiOrder.editOrder(id, {
        status: parseInt(order.status),
        note: order.note, // note chỉ đọc, giữ nguyên
      });
      if (res.status) {
        toast.success("✅ Cập nhật đơn hàng thành công!");
        setTimeout(() => navigate("/admin/orders"), 1500);
      }
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err.response?.data || err.message);
      toast.error("❌ Lỗi khi cập nhật đơn hàng!");
    }
  };

  if (!order)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Chỉnh sửa đơn hàng #{order.order_code || order.id}
        </h3>
        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center transition duration-200"
        >
          <i className="fas fa-arrow-left mr-2"></i> Về danh sách
        </button>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cột trái - Thông tin khách hàng */}
            <div className="lg:w-1/2">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  Thông tin khách hàng
                </h4>

                {[
                  { label: "Tên khách hàng", value: order.name },
                  { label: "Email", value: order.email },
                  { label: "Điện thoại", value: order.phone },
                  { label: "Địa chỉ", value: order.address },
                ].map((item, i) => (
                  <div key={i} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {item.label}
                    </label>
                    <input
                      type="text"
                      value={item.value}
                      readOnly
                      className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tổng tiền
                  </label>
                  <input
                    type="text"
                    value={`${Number(order.total_amount || 0).toLocaleString(
                      "vi-VN"
                    )} đ`}
                    readOnly
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Cột phải - Trạng thái & Ghi chú */}
            <div className="lg:w-1/2">
              <div className="bg-indigo-50 p-6 rounded-lg shadow-sm mb-6">
                <h4 className="text-lg font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-200">
                  Trạng thái & Ghi chú
                </h4>

                {/* Trạng thái */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      setOrder({ ...order, status: parseInt(e.target.value) })
                    }
                    disabled={isLocked}
                    className={`w-full p-2.5 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                      isLocked
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "border-gray-300"
                    }`}
                  >
                    {[
                      { value: 1, label: "Đang chờ xác nhận" },
                      { value: 2, label: "Đã xác nhận" },
                      { value: 3, label: "Đang đóng gói" },
                      { value: 4, label: "Đang giao hàng" },
                      { value: 5, label: "Đã giao" },
                      { value: 6, label: "Hoàn hàng / Trả hàng" },
                      { value: 7, label: "Đã hủy" },
                    ]
                      .filter((s) => allowedStatuses.includes(s.value))
                      .map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                  </select>
                  {isLocked && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      ⚠️ Không thể thay đổi khi đơn đã hoàn hàng hoặc bị hủy.
                    </p>
                  )}
                </div>

                {/* Ghi chú (chỉ đọc hoàn toàn) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    value={order.note || ""}
                    readOnly
                    rows="5"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    placeholder="Ghi chú chỉ đọc (không thể chỉnh sửa)"
                  ></textarea>
                </div>

                {/* Nút cập nhật */}
                <button
                  type="submit"
                  disabled={isLocked}
                  className={`w-full py-2.5 px-4 rounded-md flex items-center justify-center transition duration-200 ${
                    isLocked
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  <i className="fas fa-save mr-2"></i>
                  {isLocked ? "Không thể cập nhật" : "Cập nhật đơn hàng"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
