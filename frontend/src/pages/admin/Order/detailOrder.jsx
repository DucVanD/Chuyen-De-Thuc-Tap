import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiOrder from "../../../api/apiOrder"; // ✅ import API thật
import { imageURL } from "../../../api/config";

const DetailOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy chi tiết đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await apiOrder.getOrderId(id);
        if (res.status && res.data) {
          setOrder(res.data);
        } else {
          alert("Không tìm thấy đơn hàng!");
        }
      } catch (err) {
        console.error("Lỗi tải chi tiết đơn hàng:", err);
        alert("Lỗi khi tải chi tiết đơn hàng!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // const handleExportInvoice = () => {
  //   window.open(`http://127.0.0.1:8000/api/orders/${order.id}/invoice`, "_blank");
  // };

  const handleExportInvoice = () => {
    apiOrder.exportInvoice(order.id);
  };



  // Map trạng thái đơn hàng
  const statusLabels = {
    1: { text: "Đang chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
    2: { text: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
    3: { text: "Đang đóng gói", color: "bg-orange-100 text-orange-800" },
    4: { text: "Đang giao hàng", color: "bg-teal-100 text-teal-800" },
    5: { text: "Đã giao", color: "bg-green-100 text-green-800" },
    6: { text: "Hoàn hàng / Trả hàng", color: "bg-purple-100 text-purple-800" },
    7: { text: "Đã hủy", color: "bg-red-100 text-red-800" },
  };

  // Hàm lấy text hiển thị
  const getStatusText = (status) => statusLabels[status]?.text || "Không xác định";

  // Hàm lấy class màu sắc
  const getStatusClass = (status) => statusLabels[status]?.color || "bg-gray-100 text-gray-600";


  if (loading) {
    return <div className="text-center py-10 text-gray-500">Đang tải...</div>;
  }

  if (!order) {
    return <div className="text-center py-10 text-red-500">Không có dữ liệu!</div>;
  }

  const totalAmount = order.orderDetails.reduce(
    (sum, d) => sum + d.amount,
    0
  );

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Chi tiết đơn hàng #{order.id}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportInvoice}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm inline-flex items-center"
            >
              <i className="fa fa-file-pdf mr-1"></i> Xuất hóa đơn
            </button>

            <button
              onClick={() => {
                const lastPage = localStorage.getItem("currentOrderPage") || 1;
                navigate(`/admin/orders/${lastPage}`);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm inline-flex items-center"
            >
              <i className="fa fa-arrow-left mr-1"></i> Về danh sách
            </button>
          </div>
        </div>


        {/* Nội dung chính */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {/* 🧾 Thông tin người đặt hàng */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-gray-800 max-w-md mx-auto">
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Thông tin người nhận</h2>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">Tên: {order.name}</h3>
                <p className="text-sm text-gray-500 mb-3">Email: {order.email}</p>

                <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 mb-4">
                  <span className="font-medium">{order.phone}</span>
                </div>

                {/* Address section */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Địa chỉ giao hàng</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {order.address}
                    <br />
                    {order.ward}, {order.district}, {order.province}
                  </p>
                </div>

                {/* Payment section */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Phương thức thanh toán
                  </h3>
                  <p
                    className={`text-sm font-medium italic ${order.payment === "cod" ? "text-green-600" : "text-blue-600"
                      }`}
                  >
                    {order.payment === "cod"
                      ? "Thanh toán khi nhận hàng (COD)"
                      : "Chuyển khoản ngân hàng"}
                  </p>
                </div>

                {/* Status */}
                <div className="flex justify-center mt-3">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

            </div>

            {/* 🛒 Danh sách sản phẩm */}
            <div className="md:col-span-2">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">
                  Sản phẩm đã đặt
                </h2>
                <div className="space-y-3">
                  {order.orderDetails.map((detail) => (
                    <div
                      key={detail.id}
                      className="flex items-center justify-between bg-white p-3 rounded shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            detail.product?.thumbnail?.startsWith("http")
                              ? detail.product.thumbnail
                              : `${imageURL}/products/${detail.product?.thumbnail}`
                          }
                          alt={detail.product?.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {detail.product?.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Giá: {detail.price_buy.toLocaleString("vi-VN")} đ
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700">Số lượng: {detail.qty}</p>
                        <p className="text-gray-700 font-semibold">
                          Tổng: {detail.amount.toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-right">
                  <h2 className="text-xl font-bold text-gray-800">
                    Tổng tiền: {totalAmount.toLocaleString("vi-VN")} đ
                  </h2>
                </div>
              </div>
            </div>

            {/* ⚙️ Thông tin quản lý đơn hàng */}
            <div className="md:col-span-3 mt-2 bg-purple-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2">
                Thông tin quản lý đơn hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium text-gray-700">Mã đơn hàng:</p>
                  <p className="text-gray-800">{order.order_code}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Ngày tạo:</p>
                  <p className="text-gray-800">
                    {new Date(order.created_at).toLocaleString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Người đặt:</p>
                  <p className="text-gray-800">{order.user?.name}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Ngày cập nhật:</p>
                  <p className="text-gray-800">
                    {new Date(order.updated_at).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailOrder;
