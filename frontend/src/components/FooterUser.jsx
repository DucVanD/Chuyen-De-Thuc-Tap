const FooterUser = () => {
  return (
    <>
      <footer className="mt-12 border-t border-gray-100 bg-white">
        <div className="lg:px-20 mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/logo.png"
                alt="Bean Farm"
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Bean Farm - Siêu thị trực tuyến mua sắm nông sản, chất lượng, tươi
              xanh.
            </p>
            <p className="mt-2 text-emerald-700 font-medium">
              Giá siêu tốt - Giao siêu tốc.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium">Địa chỉ:</span> 70 Lữ Gia, Phường
                15, Quận 11, TP.HCM
              </p>
              <p>
                <span className="font-medium">Điện thoại:</span>{" "}
                <a
                  href="tel:19006750"
                  className="text-emerald-700 font-semibold"
                >
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

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-lg">Chính sách</h4>
            <ul className="mt-4 space-y-3 text-gray-700">
              {[
                "Chính sách thành viên",
                "Chính sách thanh toán",
                "Chính sách đổi sản phẩm",
                "Chính sách bảo mật",
                "Chính sách cộng tác viên",
                "Chính sách bảo hành",
              ].map((t, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-emerald-700">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guide */}
          <div>
            <h4 className="font-semibold text-lg">Hướng dẫn</h4>
            <ul className="mt-4 space-y-3 text-gray-700">
              {[
                "Hướng dẫn mua hàng",
                "Hướng dẫn đổi trả",
                "Hướng dẫn thanh toán",
                "Chương trình cộng tác viên",
                "Tìm kiếm",
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

          {/* Social + payment + Zalo */}
          <div>
            <h4 className="font-semibold text-lg">Kết nối với chúng tôi</h4>
            <div className="mt-4 flex gap-2">
              {["facebook", "twitter", "youtube", "instagram"].map((n, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-md bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700"
                >
                  <span className="sr-only">{n}</span>
                  {/* simple dots as icon placeholders */}
                  <span className="h-1.5 w-1.5 bg-white rounded-full" />
                </a>
              ))}
            </div>

            <h4 className="mt-6 font-semibold text-lg">Hình thức thanh toán</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {["₫", "↔", "VISA", "MOMO"].map((t, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-md border text-sm text-gray-700"
                >
                  {t}
                </div>
              ))}
            </div>

            <h4 className="mt-6 font-semibold text-lg">Zalo Mini Apps</h4>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-20 w-20 rounded-md border flex items-center justify-center text-xs text-gray-500">
                QR
              </div>
              <p className="text-sm text-gray-600">
                Quét mã QR để mua hàng nhanh chóng
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-center">
            © Bản quyền thuộc về <span className="font-semibold">Mr. Bean</span>{" "}
            | Cung cấp bởi <span className="font-semibold">Sapo</span>
          </div>
        </div>
      </footer>
    </>
  );
};
export default FooterUser;
