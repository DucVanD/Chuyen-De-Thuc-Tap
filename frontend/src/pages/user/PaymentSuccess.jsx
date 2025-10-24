import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const status = params.get("status");
  const orderId = params.get("order_id");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "success") {
      localStorage.removeItem("cartItems");
      setMessage("Cảm ơn bạn đã thanh toán thành công! Đơn hàng của bạn đang được xử lý.");
    } else if (status === "cancelled" || status === "7") {
      setMessage("Bạn đã hủy đơn hàng. Mong sẽ gặp lại bạn lần sau!");
      setTimeout(() => navigate("/checkout"), 3000);
    } else if (status === "failed") {
      setMessage("Thanh toán thất bại. Vui lòng thử lại sau!");
    } else {
      setMessage("Giao dịch không hợp lệ hoặc đã hết hạn.");
    }
  }, [status, navigate]);

  const getStyle = () => {
    switch (status) {
      case "success":
        return {
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "✅",
        };
      case "failed":
        return {
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
          icon: "❌",
        };
      case "cancelled":
      case "7":
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: "⚠️",
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: "ℹ️",
        };
    }
  };

  const { color, bg, border, icon } = getStyle();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${bg} px-4`}>
      <div className={`bg-white shadow-md rounded-xl p-6 border ${border} max-w-sm w-full text-center`}>
        <div className="text-5xl mb-3">{icon}</div>
        <h1 className={`${color} text-xl font-semibold mb-2`}>
          {status === "success"
            ? "Thanh toán thành công!"
            : status === "failed"
            ? "Thanh toán thất bại!"
            : status === "cancelled" || status === "7"
            ? "Đơn hàng đã bị hủy!"
            : "Giao dịch không hợp lệ"}
        </h1>
        <p className="text-gray-700 text-sm mb-4">{message}</p>

        {orderId && (
          <p className="text-xs text-gray-500 italic mb-4">
            Mã đơn hàng: <span className="font-semibold">{orderId}</span>
          </p>
        )}

        <div className="flex justify-center gap-3">
          <a
            href="/"
            className="bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Trang chủ
          </a>

          {(status === "failed" || status === "cancelled" || status === "7") && (
            <button
              onClick={() => navigate("/checkout")}
              className="bg-yellow-400 text-white text-sm px-4 py-2 rounded-md hover:bg-yellow-500 transition"
            >
              Thử lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
