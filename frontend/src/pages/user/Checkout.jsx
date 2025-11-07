import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiOrder from "../../api/apiOrder";
import { clearCart } from "../../Redux/cartSlice";
import { imageURL } from "../../api/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const districts = {
  "Hồ Chí Minh": [
    "Quận 1",
    "Quận 3",
    "Quận 5",
    "Quận 7",
    "Quận 10",
    "Bình Thạnh",
    "Gò Vấp",
    "Tân Bình",
    "Tân Phú",
    "Thủ Đức",
  ],
};

const wards = {
  "Quận 1": ["Bến Nghé", "Bến Thành"],
  "Quận 3": ["Phường 1", "Phường 2"],
  "Quận 5": ["Phường 8", "Phường 11"],
  "Quận 7": ["Tân Phú", "Tân Thuận Đông"],
  "Quận 10": ["Phường 1", "Phường 5"],
  "Bình Thạnh": ["Phường 19", "Phường 22"],
  "Gò Vấp": ["Phường 5", "Phường 8"],
  "Tân Bình": ["Phường 4", "Phường 6"],
  "Tân Phú": ["Phú Thọ Hòa", "Phú Trung"],
  "Thủ Đức": ["Linh Trung", "Hiệp Bình Chánh"],
};

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    province: "Hồ Chí Minh", // ✅ mặc định HCM
    district: "",
    ward: "",
    note: "",
    payment: "cod",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Tự động điền thông tin user khi login
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        email: user.email || "",
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "district") {
      setForm({
        ...form,
        district: value,
        ward: "", // reset phường khi đổi quận
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price_sale || item.price_root) * item.qty,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "₫";

  const handleCheckout = async () => {
    if (loading) return;
    setLoading(true);

    if (!cartItems.length) {
      toast.error("Giỏ hàng trống!");
      setLoading(false);
      return;
    }

    if (!form.name || !form.email || !form.phone) {
      toast.warning("Vui lòng điền họ tên, email và số điện thoại!");
      setLoading(false);
      return;
    }

    if (!form.address.trim() || !form.district || !form.ward) {
      toast.warning("Vui lòng nhập đầy đủ địa chỉ, quận/huyện và phường/xã!");
      setLoading(false);
      return;
    }

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

      if (form.payment === "vnpay" && res?.payment_url) {
        toast.info("🔁 Đang chuyển hướng đến cổng thanh toán...", {
          autoClose: 800,
          onClose: () => {
            window.location.href = res.payment_url;
          },
        });
        return;
      }

      if (res.status) {
        toast.success("Đặt hàng thành công!", {
          onClose: () => {
            dispatch(clearCart());
            navigate("/");
          },
          autoClose: 800,
        });
      } else {
        toast.error("Lỗi: " + (res.message || "Không thể đặt hàng"));
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors || {};
        const firstError =
          Object.values(errors)[0]?.[0] || "Thông tin không hợp lệ!";
        toast.error(firstError);
      } else {
        toast.error("Lỗi khi đặt hàng!");
      }
    }

    setLoading(false);
  };

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
            placeholder="Địa chỉ (số nhà, tên đường)"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          />

          {/* ✅ Chỉ còn chọn Quận & Phường */}
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          >
            <option value="">Chọn quận/huyện</option>
            {districts["Hồ Chí Minh"].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            name="ward"
            value={form.ward}
            onChange={handleChange}
            disabled={!form.district}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
          >
            <option value="">Chọn phường/xã</option>
            {(wards[form.district] || []).map((w) => (
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

        {/* PAYMENT METHOD */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">
            Phương thức thanh toán
          </h2>

          <label className="block mb-2 text-sm">
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

          <label className="block mb-2 text-sm">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={form.payment === "bank"}
              onChange={handleChange}
              className="mr-2"
            />
            Chuyển khoản ngân hàng
          </label>

          <label className="block text-sm">
            <input
              type="radio"
              name="payment"
              value="vnpay"
              checked={form.payment === "vnpay"}
              onChange={handleChange}
              className="mr-2"
            />
            Thanh toán qua VNPAY
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
