import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../Redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { imageURL } from "../../api/config";
import React, { useState } from "react";

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
  const dispatch = useDispatch();
  console.log(cartItems);
  const changeQuantity = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateQuantity({ id, qty }));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const getSubtotal = cartItems.reduce(
    (total, item) => total + (item.price_sale || item.price_root) * item.qty,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "₫";

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-600">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-semibold">Giỏ hàng</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
        <p className="text-gray-600 mt-1">
          Bạn có {cartItems.length} sản phẩm trong giỏ hàng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
              <div className="col-span-5">Thông tin sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-center">Thành tiền</div>
              <div className="col-span-1"></div>
            </div>

            <div className="divide-y divide-gray-200">
              {cartItems.length === 0 ? (
                <p className="p-4 text-center text-gray-500">Giỏ hàng trống.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                      <div className="col-span-5 flex items-center gap-4">
                        <img
                          src={
                            item.thumbnail
                              ? `${imageURL}/product/${item.thumbnail}`
                              : "/assets/images/no-image.png"
                          }
                          alt={item.name}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-1">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                          >
                            <FaTrash className="text-xs" /> Xóa
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="font-semibold text-gray-800">
                          {formatPrice(item.price_sale || item.price_root)}
                        </span>
                      </div>

                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              changeQuantity(item.id, item.qty - 1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) =>
                              changeQuantity(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-12 text-center py-2 border-x border-gray-300 focus:outline-none"
                            min="1"
                          />
                          <button
                            onClick={() =>
                              changeQuantity(item.id, item.qty + 1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="font-bold text-green-600">
                          {formatPrice(
                            (item.price_sale || item.price_root) * item.qty
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                Tổng tiền:
              </span>
              <span className="text-xl font-bold text-green-600">
                {formatPrice(getSubtotal)}
              </span>
            </div>
          </div>
          {/* Checkout Button */}
          <div className="mt-8 text-end">
            <button
              className="bg-green-600 text-white px-12 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
              onClick={handleCheckout}
            >
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>

        {/* Sidebar: giữ nguyên layout Tailwind như bạn đã code */}
        <div className="lg:col-span-1 space-y-6">
          {/* Delivery Time */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thời gian giao hàng
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn ngày
                </label>
                <select
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                <label
                  htmlFor="companyInvoice"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Xuất hóa đơn công ty
                </label>
              </div>
            </div>
          </div>

          {/* Discount Codes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Các mã giảm giá có thể áp dụng:
            </h3>
            <div className="flex flex-wrap gap-2">
              {discountCodes.map((code) => (
                <button
                  key={code}
                  className="border-2 border-dashed border-green-500 text-green-600 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                >
                  {code}
                </button>
              ))}
              <button className="text-green-600 hover:text-green-700 ml-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <FaTruck className="text-white text-lg" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Vận chuyển miễn phí</h4>
            <p className="text-sm text-gray-600">Hóa đơn trên 5 triệu</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <FaUndoAlt className="text-white text-lg" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Đổi trả miễn phí</h4>
            <p className="text-sm text-gray-600">Trong vòng 7 ngày</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <FaMoneyBillWave className="text-white text-lg" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">100% Hoàn tiền</h4>
            <p className="text-sm text-gray-600">Nếu sản phẩm lỗi</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <FaHeadset className="text-white text-lg" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Hotline: 1900 6750</h4>
            <p className="text-sm text-gray-600">Hỗ trợ 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
