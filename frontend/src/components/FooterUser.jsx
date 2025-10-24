import React, { useState, useEffect } from "react";
import {
  FaCaretSquareUp,
  FaComments,
  FaFacebookMessenger,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTimes,
  FaChevronUp,

} from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const FooterUser = () => {
  const [showButton, setShowButton] = useState(false);         // nút scroll-to-top
  const [showContactMenu, setShowContactMenu] = useState(false); // menu liên hệ

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Cuộn chậm từng bước lên đầu trang
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 50; // tăng số này (60/80) để chậm hơn
    const scrollInterval = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollInterval);
      }
    };
    requestAnimationFrame(scrollInterval);
  };

  return (
    <>
      <footer className="mt-12 border-t border-gray-100 bg-white">
        {/* Nội dung chính */}
        <div className="lg:px-20 mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 🔹 Thông tin thương hiệu */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/logo.png"
                alt="Bean Farm"
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              Bean Farm - Siêu thị trực tuyến mua sắm nông sản, chất lượng, tươi xanh.
            </p>
            <p className="mt-2 text-emerald-700 font-medium text-sm sm:text-base">
              Giá siêu tốt - Giao siêu tốc.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium">Địa chỉ:</span> 70 Lữ Gia, P.15, Q.11, TP.HCM
              </p>
              <p>
                <span className="font-medium">Điện thoại:</span>{" "}
                <a href="tel:19006750" className="text-emerald-700 font-semibold">
                  1900 6750
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:support@sapo.vn"
                  className="text-emerald-700 font-semibold"
                >
                  support@sapo.vn
                </a>
              </p>
            </div>
          </div>

          {/* 🔹 Chính sách */}
          <div className="hidden md:block">
            <h4 className="font-semibold text-lg">Chính sách</h4>
            <ul className="mt-4 space-y-3 text-gray-700 text-sm">
              {[
                "Chính sách thành viên",
                "Chính sách thanh toán",
                "Chính sách đổi sản phẩm",
                "Chính sách bảo mật",
              ].map((t, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-emerald-700">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔹 Hướng dẫn */}
          <div className="hidden md:block">
            <h4 className="font-semibold text-lg">Hướng dẫn</h4>
            <ul className="mt-4 space-y-3 text-gray-700 text-sm">
              {[
                "Hướng dẫn mua hàng",
                "Hướng dẫn đổi trả",
                "Hướng dẫn thanh toán",
                "Liên hệ",
              ].map((t, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-emerald-700">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔹 Kết nối & QR */}
          <div>
            <h4 className="font-semibold text-lg">Kết nối với chúng tôi</h4>
            <div className="mt-4 flex gap-2">
              {["facebook", "youtube", "instagram"].map((n, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-md bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700"
                >
                  <span className="sr-only">{n}</span>
                  <span className="h-1.5 w-1.5 bg-white rounded-full" />
                </a>
              ))}
            </div>

            <div className="mt-5">
              <h4 className="font-semibold text-base">Zalo Mini App</h4>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-16 w-16 rounded-md border flex items-center justify-center text-xs text-gray-500">
                  QR
                </div>
                <p className="text-xs text-gray-600 leading-snug">
                  Quét mã để mua hàng nhanh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer cuối */}
        <div className="bg-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 text-xs sm:text-sm text-center">
            © Bản quyền thuộc về <span className="font-semibold">Mr. Bean</span> | Cung cấp bởi{" "}
            <span className="font-semibold">Sapo</span>
          </div>
        </div>
      </footer>

      {/* ✅ Cụm nút nổi bên phải */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">

        {/* Nút cuộn lên đầu trang (vuông, chạy chậm) */}
        {showButton && (
          <button
            onClick={scrollToTop}
            className={`bg-gradient-to-br from-emerald-500 to-green-600 text-white p-3 rounded-md shadow-xl hover:scale-110 transition-all duration-500 ${showButton ? "opacity-100" : "opacity-0"}`}
            aria-label="Lên đầu trang"
          >
            <FaChevronUp size={20} />
            {/* <FaCaretSquareUp size={20} /> */}
          </button>
        )}

        {/* Vùng nút Liên hệ + Popup */}
        <div className="relative">
          {/* Popup menu */}
          {showContactMenu && (
            <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-fadeIn overflow-hidden">
              <ul className="text-sm text-gray-700">
                <li className="border-b border-gray-100">
                  <a
                    href="tel:19006750"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <span className="bg-red-500 text-white p-2 rounded-full">
                      <FaPhoneAlt size={14} />
                    </span>
                    <span className="font-medium">Gọi ngay cho chúng tôi</span>
                  </a>
                </li>
                <li className="border-b border-gray-100">
                  <a
                    href="https://zalo.me/123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <span className="bg-blue-500 text-white p-2 rounded-full">
                      <SiZalo size={14} />
                    </span>
                    <span className="font-medium">Chat với chúng tôi qua Zalo</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <span className="bg-yellow-400 text-white p-2 rounded-full">
                      <FaMapMarkerAlt size={14} />
                    </span>
                    <span className="font-medium">Thông tin cửa hàng</span>
                  </a>
                </li>
              </ul>

              {/* Nút đóng góc */}
              <button
                onClick={() => setShowContactMenu(false)}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200"
                aria-label="Đóng menu liên hệ"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}

          {/* Nút Liên hệ (tròn, lúc lắc khi đóng, đổi thành dấu X khi mở) */}
          {/* Nút Liên hệ (tròn, icon lắc bên trong) */}
          <button
            onClick={() => setShowContactMenu(!showContactMenu)}
            className={`relative w-12 h-12 flex flex-col items-center justify-center rounded-full shadow-xl text-white transition-all duration-300
    ${showContactMenu ? "bg-green-700" : "bg-green-600 hover:bg-green-700"}`}
            aria-label="Mở menu liên hệ"
          >
            {/* Icon: 💬 -> ❌ khi mở menu */}
            <span
              className={`flex items-center justify-center ${!showContactMenu ? "animate-iconWobble" : ""
                }`}
            >
              {showContactMenu ? <FaTimes size={20} /> : <FaComments size={20} />}
            </span>

            {/* Chữ Liên hệ, chỉ hiển thị khi menu chưa mở */}
            {!showContactMenu && (
              <span className="text-[8px] mt-0.5 leading-none">Liên hệ</span>
            )}
          </button>


        </div>

        {/* Messenger */}
        <a
          href="https://m.me/beanfarm"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0084FF] hover:bg-[#0074E3] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-xl transition-all duration-300"
          aria-label="Chat Messenger"
        >
          <FaFacebookMessenger size={22} />
        </a>
      </div>
    </>
  );
};

export default FooterUser;
