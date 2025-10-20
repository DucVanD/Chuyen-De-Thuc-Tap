import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiOrder from "../../../api/apiOrder";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    apiOrder.getOrderId(id).then((res) => {
      if (res.status && res.data) {
        setOrder(res.data);
      }
    });
  }, [id]);
  console.log("thong tin ", order)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiOrder.editOrder(id, {
        status: parseInt(order.status),
        note: order.note,
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

  if (!order) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Chỉnh sửa đơn hàng #{order.id}
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

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên khách hàng
                  </label>
                  <input
                    type="text"
                    value={order.name}
                    readOnly
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={order.email}
                    readOnly
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Điện thoại
                  </label>
                  <input
                    type="text"
                    value={order.phone}
                    readOnly
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={order.address}
                    readOnly
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tổng tiền
                  </label>
                  <input
                    type="text"
                    value={`${Number(order.total_amount || 0).toLocaleString("vi-VN")} đ`}

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

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      setOrder({ ...order, status: parseInt(e.target.value) })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value={1}>Đang chờ xác nhận</option>
                    <option value={2}>Đã xác nhận</option>
                    <option value={3}>Đang đóng gói</option>
                    <option value={4}>Đang giao hàng</option>
                    <option value={5}>Đã giao</option>
                    <option value={6}>Hoàn hàng & Trả hàng</option>
                    <option value={7}>Đã hủy</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    value={order.note || ""}
                    onChange={(e) =>
                      setOrder({ ...order, note: e.target.value })
                    }
                    rows="5"
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nhập ghi chú cho đơn hàng..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
                >
                  <i className="fas fa-save mr-2"></i> Cập nhật đơn hàng
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
