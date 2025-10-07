const FooterUser = () => {
  return (
    <>
    <footer className="mt-12 border-t border-gray-100 bg-white">
  {/* Nội dung chính */}
  <div className="lg:px-20 mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

    {/* 🔹 Thông tin thương hiệu (luôn hiển thị) */}
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
          <a href="mailto:support@sapo.vn" className="text-emerald-700 font-semibold">
            support@sapo.vn
          </a>
        </p>
      </div>
    </div>

    {/* 🔹 Các mục phụ: chỉ hiện trên tablet trở lên */}
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
            <a href="#" className="hover:text-emerald-700">
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>

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
            <a href="#" className="hover:text-emerald-700">
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* 🔹 MXH + thanh toán + QR (rút gọn hiển thị luôn) */}
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

    </>
  );
};
export default FooterUser;
