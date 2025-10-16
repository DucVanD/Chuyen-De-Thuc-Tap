import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../Redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { imageURL } from "../../api/config";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaTruck,
  FaUndoAlt,
  FaMoneyBillWave,
  FaHeadset,
} from "react-icons/fa";

const Cart = () => {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [companyInvoice, setCompanyInvoice] = useState(false);
  const discountCodes = ["BEA50", "BEA15", "BEAN99K", "FREESHIP"];

  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => !!state.auth.user);
  const dispatch = useDispatch();

  const changeQuantity = (id, qty, maxQty) => {
    if (qty < 1) qty = 1;
    if (qty > maxQty) {
      qty = maxQty;
      toast.warn("Đã chọn số lượng tối đa trong kho!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
    dispatch(updateQuantity({ id, qty }));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const clearAllCart = () => {
    if (cartItems.length === 0) {
      toast.info("🛒 Giỏ hàng đang trống!", { position: "top-right", autoClose: 1000 });
      return;
    }

    if (window.confirm("Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
      dispatch(clearCart());
      toast.success("🧹 Đã xóa toàn bộ sản phẩm khỏi giỏ hàng!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const getSubtotal = cartItems.reduce(
    (total, item) => total + (item.price_sale || item.price_root) * item.qty,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "₫";

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.warn("Vui lòng đăng nhập để tiến hành thanh toán!", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate("/registered");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-600">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-semibold">Giỏ hàng</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-2xl shadow-sm px-5 py-4 border border-gray-100">
        {/* Bên trái: Tiêu đề và thông tin */}
        <div>
          <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            🛒 Giỏ hàng của bạn
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Bạn hiện có{" "}
            <span className="font-semibold text-green-600">
              {cartItems.length}
            </span>{" "}
            sản phẩm trong giỏ hàng
          </p>
        </div>

        {/* Bên phải: Nút xóa tất cả */}
        {cartItems.length > 0 && (
          <button
            onClick={clearAllCart}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-all duration-200 font-medium shadow-sm"
          >
            <FaTrash className="text-sm" />
            <span>Xóa tất cả</span>
          </button>
        )}
      </div>


      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 🛍 Danh sách sản phẩm */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header bảng */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-green-50 border-b border-green-100 font-semibold text-gray-700 text-sm uppercase tracking-wide">
              <div className="col-span-5">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-center">Thành tiền</div>
              <div className="col-span-1 text-center">Xóa</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {cartItems.length === 0 ? (
                <p className="p-6 text-center text-gray-500">
                  Giỏ hàng của bạn đang trống 😢
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 md:grid md:grid-cols-12 flex flex-col md:items-center gap-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Hình & tên */}
                    <div className="col-span-5 flex items-center gap-4">
                      <img
                        src={
                          item.thumbnail
                            ? `${imageURL}/product/${item.thumbnail}`
                            : "/assets/images/no-image.png"
                        }
                        alt={item.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border border-gray-200"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {item.category?.name || "Sản phẩm"}
                        </p>

                      </div>
                    </div>

                    {/* Đơn giá */}
                    <div className="col-span-2 text-center font-semibold text-gray-700">
                      {formatPrice(item.price_sale || item.price_root)}
                    </div>

                    {/* Số lượng */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            changeQuantity(item.id, item.qty - 1, item.product_qty)
                          }
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            changeQuantity(
                              item.id,
                              parseInt(e.target.value) || 1,
                              item.product_qty
                            )
                          }
                          className="w-12 text-center py-2 border-x border-gray-200 focus:outline-none"
                          min="1"
                          max={item.product_qty}
                        />
                        <button
                          onClick={() =>
                            changeQuantity(item.id, item.qty + 1, item.product_qty)
                          }
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Thành tiền */}
                    <div className="col-span-2 text-center font-bold text-green-600">
                      {formatPrice(
                        (item.price_sale || item.price_root) * item.qty
                      )}
                    </div>

                    {/* Xóa */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Tổng tiền */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-green-50 border-t border-green-100 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  Tổng cộng:
                </span>
                <span className="text-2xl font-bold text-green-700">
                  {formatPrice(getSubtotal)}
                </span>
              </div>
            )}
          </div>

          {/* Checkout */}
          {cartItems.length > 0 && (
            <div className="text-end">
              <button
                className="bg-green-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 shadow-md transition-all"
                onClick={handleCheckout}
              >
                TIẾN HÀNH THANH TOÁN
              </button>
            </div>
          )}
        </div>

        {/* 🧾 Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Giao hàng */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🕒 Thời gian giao hàng
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn ngày
                </label>
                <select
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Chọn ngày giao hàng</option>
                  <option value="today">Hôm nay</option>
                  <option value="tomorrow">Ngày mai</option>
                  <option value="day-after">Ngày kia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn thời gian
                </label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Chọn khung giờ</option>
                  <option value="morning">8h00 - 12h00</option>
                  <option value="afternoon">12h00 - 17h00</option>
                  <option value="evening">17h00 - 20h00</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="companyInvoice"
                  checked={companyInvoice}
                  onChange={(e) => setCompanyInvoice(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="companyInvoice" className="ml-2 text-sm text-gray-700">
                  Xuất hóa đơn công ty
                </label>
              </div>
            </div>
          </div>

          {/* Mã giảm giá */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🎁 Mã giảm giá khả dụng
            </h3>
            <div className="flex flex-wrap gap-2">
              {discountCodes.map((code) => (
                <button
                  key={code}
                  className="border-2 border-dashed border-green-500 text-green-600 px-3 py-2 rounded-lg hover:bg-green-50 transition text-sm font-medium"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Footer Info */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: FaTruck, title: "Vận chuyển miễn phí", desc: "Hóa đơn trên 5 triệu" },
          { icon: FaUndoAlt, title: "Đổi trả miễn phí", desc: "Trong vòng 7 ngày" },
          { icon: FaMoneyBillWave, title: "100% Hoàn tiền", desc: "Nếu sản phẩm lỗi" },
          { icon: FaHeadset, title: "Hotline: 1900 6750", desc: "Hỗ trợ 24/7" },
        ].map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Icon className="text-white text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
