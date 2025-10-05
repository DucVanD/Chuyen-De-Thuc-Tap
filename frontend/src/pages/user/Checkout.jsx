// src/pages/user/Checkout.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiOrder from "../../api/apiOrder";
import { clearCart } from "../../Redux/cartSlice";
import { imageURL } from "../../api/config";

const provinces = ["---", "Hà Nội", "Hồ Chí Minh", "Đà Nẵng"];
const districts = {
  "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Cầu Giấy"],
  "Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà"],
};
const wards = {
  "Ba Đình": ["Phúc Xá", "Trúc Bạch"],
  "Hoàn Kiếm": ["Chương Dương", "Hàng Bạc"],
  "Cầu Giấy": ["Dịch Vọng", "Nghĩa Đô"],
  "Quận 1": ["Bến Nghé", "Bến Thành"],
  "Quận 3": ["Phường 1", "Phường 2"],
  "Quận 7": ["Tân Phú", "Tân Thuận Đông"],
  "Hải Châu": ["Thạch Thang", "Hải Châu 1"],
  "Thanh Khê": ["An Khê", "Hòa Khê"],
  "Sơn Trà": ["An Hải Bắc", "Phước Mỹ"],
};

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    province: "---",
    district: "",
    ward: "",
    note: "",
    payment: "cod",
  });

  const [selectedProvince, setSelectedProvince] = useState("---");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "province") {
      setSelectedProvince(value);
      setSelectedDistrict("");
      setSelectedWard("");
    }
    if (name === "district") {
      setSelectedDistrict(value);
      setSelectedWard("");
    }
    if (name === "ward") {
      setSelectedWard(value);
    }
  };

  const handleCheckout = async () => {
    if (loading) return;
    setLoading(true);

    if (!cartItems.length) return alert("Giỏ hàng trống!");
    if (!form.name || !form.email) return alert("Vui lòng điền tên và email!");

    const orderData = {
      ...form,
      cart: cartItems.map((item) => ({
        id: item.id,
        qty: item.qty,
        price: item.price_sale || item.price_root,
      })),
    };

    try {
      const res = await apiOrder.checkout(orderData);
      if (res.status) {
        alert("Đặt hàng thành công!");
        dispatch(clearCart());
        navigate("/");
      } else {
        alert("Lỗi: " + res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi đặt hàng!");
    }
    setLoading(false);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price_sale || item.price_root) * item.qty,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "₫";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
      {/* FORM */}
      <div className="flex-1 space-y-6">
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Thông tin nhận hàng</h2>

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          />
          <input
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          />
          <input
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          />
          <input
            name="address"
            placeholder="Địa chỉ"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          />

          <select
            name="province"
            value={selectedProvince}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          >
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={selectedDistrict}
            onChange={handleChange}
            disabled={selectedProvince === "---"}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          >
            <option value="">Quận/huyện</option>
            {(districts[selectedProvince] || []).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            name="ward"
            value={selectedWard}
            onChange={handleChange}
            disabled={!selectedDistrict}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          >
            <option value="">Phường/xã</option>
            {(wards[selectedDistrict] || []).map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>

          <textarea
            name="note"
            placeholder="Ghi chú (tùy chọn)"
            value={form.note}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm h-24"
          />
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
          <label className="block mb-2 text-sm">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={form.payment === "bank"}
              onChange={handleChange}
              className="mr-2"
            />
            Chuyển khoản
          </label>
          <label className="block text-sm">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={form.payment === "cod"}
              onChange={handleChange}
              className="mr-2"
            />
            Thanh toán khi nhận hàng (COD)
          </label>
        </div>
      </div>

      {/* CART SUMMARY */}
      <div className="lg:w-[40%] bg-white p-5 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">
          Đơn hàng ({cartItems.length} sản phẩm)
        </h2>

        {cartItems.length === 0 && <p>Giỏ hàng trống.</p>}
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center mb-3">
            <img
              src={
                item.thumbnail
                  ? `${imageURL}/product/${item.thumbnail}`
                  : "/assets/images/no-image.png"
              }
              alt={item.name}
              className="w-14 h-14 rounded-md object-cover mr-3"
            />
            <div className="flex-1 text-sm">
              {item.name} × {item.qty}
            </div>
            <div className="text-sm font-medium">
              {formatPrice((item.price_sale || item.price_root) * item.qty)}
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4 text-sm font-semibold">
          <span>Tạm tính</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold text-sm transition-all"
        >
          {loading ? "Đang xử lý..." : "ĐẶT HÀNG"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
