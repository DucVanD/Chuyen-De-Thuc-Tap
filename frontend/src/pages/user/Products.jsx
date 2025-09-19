

const Products = () =>{

    return(
        <>
            <div className="min-h-screen bg-white">
      <header className="w-full shadow-sm">
        {/* Top bar: Logo + Search + Actions */}
        <div className="w-full max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Logo */}
          <a href="/" className="shrink-0 flex items-center gap-2">
            <img
              src="/src/assets/images/logo.png"
              alt="Bean Farm"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </a>

          {/* Search */}
          <div className="flex-1 min-w-[220px] order-3 sm:order-none w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Trái cây"
                className="w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-10 py-2.5 sm:py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
              />
              <button
                type="button"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600"
                aria-label="Tìm kiếm"
              >
                {/* Search icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.243 11.943l3.782 3.782a.75.75 0 1 0 1.06-1.06l-3.782-3.783A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto order-2 sm:order-none">
            {[
              { label: "Hệ thống", count: 8, icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 12h18M3 16.5h18" />
                </svg>
              ) },
              { label: "So sánh", count: 0, icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H5.25A2.25 2.25 0 0 0 3 10.5v8.25h6V8.25Zm12 0H15a2.25 2.25 0 0 0-2.25 2.25v8.25h6V8.25ZM9 5.25V3m6 2.25V3" />
                </svg>
              ) },
              { label: "Yêu thích", count: 0, icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M11.645 20.91l-.007-.003-.023-.012a15.247 15.247 0 0 1-.383-.214 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 3 13.154 3 10.5 3 8.015 5.015 6 7.5 6c1.63 0 3.058.806 3.952 2.03A4.725 4.725 0 0 1 15.405 6C17.89 6 19.905 8.015 19.905 10.5c0 2.654-1.688 4.86-3.988 6.01a25.178 25.178 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.214l-.023.012-.007.003a.75.75 0 0 1-.672 0Z" />
                </svg>
              ) },
              { label: "Giỏ hàng", count: 0, icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a1.5 1.5 0 0 1 1.447 1.106l.383 1.434M7.5 14.25h9.75m-9.75 0L6.028 7.54a1.5 1.5 0 0 1 1.463-1.79h10.693a1.5 1.5 0 0 1 1.463 1.79l-1.472 6.71m-9.675 0L8.25 18a2.25 2.25 0 0 0 2.205 1.8h3.09A2.25 2.25 0 0 0 15.75 18l.75-3.75M6 21.75h.008v.008H6v-.008Zm12 0h.008v.008H18v-.008Z" />
                </svg>
              ) },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="relative inline-flex items-center gap-2 rounded-full border border-gray-200 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-white hover:bg-gray-50 text-gray-800"
              >
                <span className="relative">
                  {item.icon}
                  {typeof item.count === "number" && (
                    <span className="absolute -top-1 -right-1 h-4 sm:h-5 min-w-[18px] sm:min-w-[20px] px-1 rounded-full bg-emerald-600 text-white text-[10px] sm:text-xs leading-4 sm:leading-5 text-center">
                      {item.count}
                    </span>
                  )}
                </span>
                <span className="hidden md:inline text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="border-t border-gray-100">
          <div className="w-full max-w-7xl mx-auto px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-4">
            {/* Categories button */}
            <button className="inline-flex items-center gap-2 sm:gap-3 rounded-md bg-amber-400 text-gray-900 px-3 py-2 sm:px-4 font-medium whitespace-nowrap">
              <span className="text-xl">≡</span>
              <span>Danh mục sản phẩm</span>
            </button>

            {/* Links */}
            <nav className="flex items-center gap-2 flex-1 overflow-x-auto whitespace-nowrap no-scrollbar">
              {[
                "Trang chủ",
                "Giới thiệu",
                "Sản phẩm",
                "Câu hỏi thường gặp",
                "Tin tức",
                "Liên hệ",
              ].map((label, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-sm font-medium ${
                    label === "Trang chủ"
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Quick buy */}
            <button className="rounded-full bg-red-600 text-white px-3 py-2 sm:px-5 font-semibold hover:bg-red-700 whitespace-nowrap text-sm sm:text-base">
              Mua hàng nhanh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Danh mục nổi bật */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">Danh mục nổi bật</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6">
            {[
              { name: "Rau củ", count: 17 },
              { name: "Trái cây", count: 12 },
              { name: "Thịt", count: 10 },
              { name: "Trứng", count: 8 },
              { name: "Đồ uống", count: 11 },
              { name: "Bánh và sữa", count: 0 },
              { name: "Hải sản", count: 10 },
              { name: "Bánh mì", count: 3 },
            ].map((cat, idx) => (
              <a
                key={idx}
                href="#"
                className="group rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-2 sm:mb-3 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-emerald-50 flex items-center justify-center text-2xl sm:text-3xl">
                  🥗
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-sm sm:text-base">{cat.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{cat.count} sản phẩm</div>
                </div>
              </a>
            ))}
          </div>
        </section>
        
        {/* Video hướng dẫn */}
        <section className="mt-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">Video hướng dẫn</h3>
              <button className="rounded-full border border-emerald-200 text-emerald-700 px-4 py-1.5 text-sm hover:bg-emerald-50">Xem tất cả</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {new Array(5).fill(0).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-200">
                  <div className="h-28 sm:h-32 bg-gray-200 flex items-center justify-center text-4xl">▶</div>
                  <div className="p-3 text-xs sm:text-sm">Hướng dẫn cách làm sữa hạt {i+1}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner ưu đãi đặc biệt */}
        <section className="mt-10">
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center relative overflow-hidden">
            <h3 className="text-2xl font-semibold">Ưu đãi đặc biệt</h3>
            <p className="mt-2 text-emerald-700 font-medium">Giảm "50%" đối với nông sản nhập khẩu</p>
            <button className="mt-4 rounded-full bg-emerald-600 text-white px-5 py-2 font-medium hover:bg-emerald-700">Khám phá ngay</button>
          </div>
        </section>

        {/* Nhóm danh mục nhỏ: Đồ khô / Thức uống / Bún các loại */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { title: 'Đồ khô' },
            { title: 'Thức uống' },
            { title: 'Bún các loại' },
          ].map((block, idx) => (
            <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{block.title}</h4>
                <a href="#" className="text-emerald-700 text-sm">Xem thêm »</a>
              </div>
              <div className="space-y-3">
                {new Array(4).fill(0).map((_, i) => (
                  <div key={i} className="grid grid-cols-[56px,1fr,auto] items-center gap-3 rounded-lg border border-gray-100 p-2">
                    <div className="h-14 w-14 rounded bg-gray-50 flex items-center justify-center text-2xl">🧺</div>
                    <div>
                      <div className="text-sm">Sản phẩm {i+1}</div>
                      <div className="text-xs text-gray-400 line-through">35.000₫</div>
                      <div className="text-emerald-700 font-semibold text-sm">29.000₫</div>
                    </div>
                    <button className="rounded-full bg-emerald-600 text-white text-xs px-3 py-1.5">Thêm vào giỏ</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Tin tức mới nhất + Đánh giá */}
        <section className="mt-12 grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">Tin tức mới nhất</h3>
              <button className="rounded-full border border-emerald-200 text-emerald-700 px-4 py-1.5 text-sm hover:bg-emerald-50">Xem tất cả</button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {new Array(3).fill(0).map((_, i) => (
                <article key={i} className="rounded-xl overflow-hidden border border-gray-200">
                  <div className="h-28 bg-gray-100" />
                  <div className="p-3">
                    <div className="text-xs text-emerald-700 font-semibold">20/09/2025</div>
                    <h4 className="mt-1 font-medium">Bài viết hữu ích #{i+1}</h4>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">Hướng dẫn chế biến, bảo quản thực phẩm sạch tiện lợi, an toàn cho mọi gia đình.</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-4">
            <h3 className="text-lg font-semibold mb-4">Đánh giá</h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-100" />
              <div>
                <div className="font-medium">Đặng Chinh Đức</div>
                <div className="text-xs text-gray-500">Khách hàng</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">Sản phẩm tươi, giao nhanh. Hài lòng về chất lượng và dịch vụ.</p>
            <button className="mt-4 rounded-full border border-emerald-200 text-emerald-700 px-4 py-1.5 text-sm hover:bg-emerald-50 w-full">Xem thêm đánh giá</button>
          </aside>
        </section>

        {/* Đối tác của chúng tôi */}
        <section className="mt-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Đối tác của chúng tôi</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 items-center">
              {['BIBO','Organica','Nhà Quê','emart','LOTTE','NAMAN'].map((p, i) => (
                <div key={i} className="h-12 rounded-md border flex items-center justify-center text-sm text-gray-600 bg-gray-50">{p}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Service badges */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { t: 'Vận chuyển miễn phí', s: 'Hóa đơn trên 3 triệu' },
            { t: 'Đổi trả miễn phí', s: 'Trong vòng 7 ngày' },
            { t: '100% Hoàn tiền', s: 'Nếu sản phẩm lỗi' },
            { t: 'Hotline: 1900 6750', s: 'Hỗ trợ 24/7' },
          ].map((b, i) => (
            <div key={i} className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm">✓</div>
              <div>
                <div className="text-sm font-medium text-emerald-800">{b.t}</div>
                <div className="text-xs text-emerald-700/80">{b.s}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Khối sản phẩm và banner */}
        <section className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {/* Banner bên trái */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-300 to-emerald-300 p-5 sm:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[360px]">
              <div>
                <h3 className="text-lg sm:text-2xl font-semibold leading-snug">Bán chạy nhất hàng ngày</h3>
                <p className="mt-2 sm:mt-3 text-emerald-900 text-sm sm:text-base">
                  Ưu đãi độc quyền - Giảm giá 20%
                </p>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-emerald-900/80 max-w-xs">
                  Mua sắm thoải mái chỉ từ 20.000 VNĐ. Chỉ trong tuần này, đừng bỏ lỡ.
                </p>
              </div>
              <button className="self-start mt-4 sm:mt-6 rounded-full bg-white text-emerald-700 px-4 sm:px-5 py-2 text-sm sm:text-base font-medium shadow hover:shadow-md">
                Mua ngay
              </button>
            </div>

            {/* Lưới sản phẩm */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  name: "Hành tây",
                  oldPrice: "145.000₫",
                  price: "120.000₫",
                  discount: 17,
                  isNew: false,
                },
                {
                  name: "Ngò rí",
                  oldPrice: "25.000₫",
                  price: "21.000₫",
                  discount: 16,
                  isNew: true,
                },
                {
                  name: "Đậu cove",
                  oldPrice: "55.000₫",
                  price: "47.000₫",
                  discount: 15,
                  isNew: false,
                },
              ].map((p, idx) => (
                <div key={idx} className="relative rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 flex flex-col">
                  {/* Nhãn giảm giá / mới */}
                  <div className="absolute left-3 sm:left-4 top-3 sm:top-4 flex gap-2">
                    {p.discount ? (
                      <span className="rounded-full bg-red-500 text-white text-[10px] sm:text-xs px-2 py-0.5 sm:py-1">
                        {p.discount}%
                      </span>
                    ) : null}
                    {p.isNew ? (
                      <span className="rounded-full bg-amber-200 text-amber-900 text-[10px] sm:text-xs px-2 py-0.5 sm:py-1">
                        Mới
                      </span>
                    ) : null}
                  </div>

                  {/* Ảnh sản phẩm */}
                  <div className="my-6 sm:my-8 flex-1 flex items-center justify-center">
                    <div className="h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-gray-50 flex items-center justify-center text-4xl sm:text-5xl">🥬</div>
                  </div>

                  {/* Tên + giá */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-base sm:text-lg">{p.name}</h4>
                    <div className="flex items-baseline gap-3">
                      <span className="text-gray-400 line-through text-xs sm:text-sm">{p.oldPrice}</span>
                      <span className="text-emerald-600 font-semibold text-sm sm:text-base">{p.price}</span>
                    </div>
                  </div>

                  {/* Hành động */}
                  <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                    <button className="col-span-1 rounded-full bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-emerald-700">
                      Thêm vào giỏ
                    </button>
                    <button className="col-span-1 rounded-full border border-emerald-200 text-emerald-700 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-emerald-50">
                      Tùy chọn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Khuyến mãi đặc biệt */}
        <section className="mt-12">
          <div className="border-2 border-dashed border-emerald-600/40 rounded-2xl">
            {/* Header */}
            <div className="bg-emerald-700 text-white rounded-t-xl px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center gap-3 justify-between">
              <div className="text-lg sm:text-2xl font-semibold flex items-center gap-2">
                Khuyến mãi đặc biệt
                <span>⚡</span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Ngày", value: 102 },
                  { label: "Giờ", value: 3 },
                  { label: "Phút", value: 57 },
                  { label: "Giây", value: 24 },
                ].map((t, i) => (
                  <div key={i} className="bg-white text-emerald-700 rounded-lg px-3 py-1.5 text-center shadow-sm">
                    <div className="text-base sm:text-lg font-semibold leading-none">{`${t.value}`.padStart(2, "0")}</div>
                    <div className="text-[11px] sm:text-xs opacity-80 -mt-0.5">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {[
                { name: "Lúc lắc bò Kobe", sale: 4, sold: 175, total: 300, old: "180.000₫", price: "180.000₫" },
                { name: "Hành tây", sale: 17, sold: 151, total: 160, old: "145.000₫", price: "120.000₫" },
                { name: "Bún gạo khô", sale: 10, sold: 143, total: 195, old: "99.000₫", price: "89.000₫", isNew: true },
                { name: "Ngò rí", sale: 16, sold: 59, total: 90, old: "25.000₫", price: "21.000₫", isNew: true },
                { name: "Cải thìa hữu cơ", sale: 13, sold: 161, total: 200, old: "30.000₫", price: "26.000₫" },
                { name: "Cà rốt hữu cơ", sale: 15, sold: 10, total: 50, old: "52.000₫", price: "44.000₫" },
              ].map((p, idx) => {
                const percent = Math.max(0, Math.min(100, Math.round((p.sold / p.total) * 100)));
                return (
                  <div key={idx} className="flex items-stretch gap-4 rounded-2xl bg-white border border-emerald-200/60 p-4">
                    {/* Image */}
                    <div className="shrink-0 flex items-center justify-center">
                      <div className="h-28 w-32 sm:h-32 sm:w-36 rounded-xl bg-gray-50 flex items-center justify-center text-4xl">🥕</div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="inline-flex items-center gap-2">
                          {p.isNew ? (
                            <span className="rounded-full bg-amber-100 text-amber-800 text-xs px-2 py-0.5">Mới</span>
                          ) : null}
                          <span className="rounded-full bg-red-600 text-white text-xs px-2 py-0.5">{p.sale}%</span>
                        </div>
                      </div>
                      <h4 className="mt-1 font-semibold text-gray-900 truncate">{p.name}</h4>

                      {/* Progress + sold */}
                      <div className="mt-2">
                        <div className="text-xs text-gray-500">Đã bán: {p.sold}/{p.total}</div>
                        <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600" style={{ width: `${percent}%` }} />
                        </div>
                        <div className="text-right text-xs text-gray-500 mt-1">{percent}%</div>
                      </div>

                      {/* Price */}
                      <div className="mt-2 flex items-baseline gap-3">
                        <span className="text-gray-400 line-through text-xs sm:text-sm">{p.old}</span>
                        <span className="text-emerald-700 font-semibold text-sm sm:text-base">{p.price}</span>
                      </div>

                      {/* Actions */}
                      <div className="mt-3">
                        <button className="rounded-full bg-emerald-700 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-800">
                          {idx % 3 === 2 ? "Tùy chọn" : "Thêm vào giỏ"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Khu sản phẩm theo danh mục + banner bên phải */}
        <section className="mt-12">
          {/* Breadcrumb / Tabs */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            {[
              { name: "Thịt heo" },
              { name: "Thịt bò" },
              { name: "Hải sản" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <a href="#" className={`px-3 py-1 rounded-full ${i === 0 ? "bg-emerald-50 text-emerald-700" : "hover:bg-gray-100"}`}>{c.name}</a>
                {i < 2 && <span className="text-gray-300">/</span>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Product grid */}
            <div className="xl:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {new Array(9).fill(0).map((_, idx) => (
                <div key={idx} className="relative rounded-2xl border border-gray-200 bg-white p-5 flex flex-col">
                  {/* badge % */}
                  <span className="absolute left-3 top-3 rounded-full bg-red-500 text-white text-xs px-2 py-0.5">{[5,7,10,3,4,7,6,5,8][idx % 9]}%</span>

                  {/* image */}
                  <div className="my-6 flex-1 flex items-center justify-center">
                    <div className="h-36 w-36 rounded-xl bg-gray-50 flex items-center justify-center text-5xl">🥩</div>
                  </div>

                  {/* name */}
                  <h4 className="text-center font-medium">{["Xương ống bò Kobe","Thịt vai","Mỡ heo","Ba rọi rút sườn","Thịt xay","Nạc dăm Karst","Xương thịt Karst","Thịt nạc","Sườn non "][idx % 9]}</h4>

                  {/* price */}
                  <div className="mt-2 text-center">
                    <span className="text-gray-400 line-through text-sm mr-3">{["92.000₫","107.000₫","81.000₫","165.000₫","95.000₫","124.000₫","72.500₫","90.000₫","110.000₫"][idx % 9]}</span>
                    <span className="text-emerald-700 font-semibold">{["87.000₫","100.000₫","76.000₫","160.000₫","91.000₫","115.000₫","68.250₫","84.000₫","99.000₫"][idx % 9]}</span>
                  </div>

                  {/* action */}
                  <button className="mt-4 rounded-full bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700">
                    Thêm vào giỏ
                  </button>
                </div>
              ))}

              {/* Xem tất cả */}
              <div className="sm:col-span-2 lg:col-span-3 flex justify-center">
                <button className="rounded-full border border-emerald-200 text-emerald-700 px-6 py-2 font-medium hover:bg-emerald-50">
                  Xem tất cả
                </button>
              </div>
            </div>

            {/* Right banner */}
            <aside className="rounded-2xl bg-gradient-to-b from-amber-300 to-emerald-400 p-6 relative overflow-hidden">
              <div className="absolute right-3 top-3 flex gap-2">
                <button className="h-8 w-8 rounded-full bg-white/80 text-gray-700 flex items-center justify-center">‹</button>
                <button className="h-8 w-8 rounded-full bg-white/80 text-gray-700 flex items-center justify-center">›</button>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Sản phẩm nổi bật trong farm</h3>
              <p className="mt-2 text-sm text-gray-800 underline">Ưu đãi độc quyền – Giảm giá 10%</p>
              <p className="mt-4 text-gray-900 font-medium">Mua sắm thoải mái chỉ từ 10.000 VNĐ</p>
              <p className="mt-2 text-sm text-gray-800/90">Chỉ trong tuần này. Mua ngay kẻo lỡ…</p>
              <button className="mt-6 rounded-full bg-white text-emerald-700 px-5 py-2 font-medium shadow hover:shadow-md w-max">
                Mua ngay
              </button>
              <div className="absolute -bottom-6 right-0 left-0 mx-auto w-64 h-40 bg-emerald-50/50 rounded-t-[100px]" />
            </aside>
          </div>
        </section>

        {/* Sản phẩm mới / Thịt nhập khẩu / Hải sản tươi */}
        <section className="mt-12 space-y-10">
          {/* Sản phẩm mới */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold">Sản phẩm mới</h3>
            </div>
            <div className="px-4 sm:px-6 pb-4 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
              {new Array(6).fill(0).map((_, idx) => (
                <div key={idx} className="relative rounded-xl border border-gray-200 p-3">
                  <span className="absolute left-2 top-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">{[17,10,12,9,15,6][idx]}%</span>
                  <div className="h-24 sm:h-28 rounded-lg bg-gray-50 flex items-center justify-center text-3xl">🛍️</div>
                  <div className="mt-2 text-center text-sm">{["Hành tây","Bún gạo khô","Bún gạo huyết rồng","Miến dong","Nước năng lượng","Ngũ cốc"][idx]}</div>
                  <div className="mt-1 text-center text-xs text-gray-400 line-through">{["32.000₫","85.000₫","97.000₫","37.000₫","36.000₫","45.000₫"][idx]}</div>
                  <div className="text-center text-emerald-700 font-semibold">{["21.000₫","69.000₫","79.000₫","29.000₫","30.000₫","39.000₫"][idx]}</div>
                  <button className="mt-2 w-full rounded-full bg-emerald-600 text-white text-xs py-1.5">{idx === 1 ? "Tùy chọn" : "Thêm vào giỏ"}</button>
                </div>
              ))}
            </div>
            <div className="px-4 sm:px-6 pb-4 flex justify-center">
              <button className="rounded-full border border-emerald-200 text-emerald-700 px-5 py-1.5 text-sm hover:bg-emerald-50">Xem tất cả</button>
            </div>
          </div>

          {/* Thịt nhập khẩu */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold">Thịt nhập khẩu</h3>
              <div className="hidden sm:flex items-center gap-2 text-xs">
                {['Tất cả','Thịt bò','Thịt heo','Thịt cừu','Thịt gà'].map((t,i)=> (
                  <span key={i} className={`px-2 py-1 rounded-full ${i===0? 'bg-emerald-50 text-emerald-700':'bg-gray-100 text-gray-700'}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="px-4 sm:px-6 pb-4 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
              {new Array(10).fill(0).slice(0,8).map((_, idx) => (
                <div key={idx} className="relative rounded-xl border border-gray-200 p-3">
                  <span className="absolute left-2 top-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">{[5,7,10,3,4,7,6,5][idx]}%</span>
                  <div className="h-24 sm:h-28 rounded-lg bg-gray-50 flex items-center justify-center text-3xl">🥩</div>
                  <div className="mt-2 text-center text-sm">{["Bò xay Karst","Xương ống bò","Bẹp chân bò","Xương thit Karst","Ba rọi","Thịt xay","Nạc dăm Karst","Thăn bò nhập"][idx]}</div>
                  <div className="mt-1 text-center text-xs text-gray-400 line-through">{["135.000₫","110.000₫","360.000₫","75.000₫","165.000₫","95.000₫","124.000₫","210.000₫"][idx]}</div>
                  <div className="text-center text-emerald-700 font-semibold">{["120.000₫","100.000₫","320.000₫","68.250₫","160.000₫","91.000₫","115.000₫","199.000₫"][idx]}</div>
                  <button className="mt-2 w-full rounded-full bg-emerald-600 text-white text-xs py-1.5">Thêm vào giỏ</button>
                </div>
              ))}
            </div>
            <div className="px-4 sm:px-6 pb-4 flex justify-center">
              <button className="rounded-full border border-emerald-200 text-emerald-700 px-5 py-1.5 text-sm hover:bg-emerald-50">Xem tất cả</button>
            </div>
          </div>

          {/* Hải sản tươi */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold">Hải sản tươi</h3>
              <div className="hidden sm:flex items-center gap-2 text-xs">
                {['Tôm sú','Cá mú','Cá thu','Cá hồi','Cua biển'].map((t,i)=> (
                  <span key={i} className={`px-2 py-1 rounded-full ${i===0? 'bg-emerald-50 text-emerald-700':'bg-gray-100 text-gray-700'}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="px-4 sm:px-6 pb-4 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
              {new Array(5).fill(0).map((_, idx) => (
                <div key={idx} className="relative rounded-xl border border-gray-200 p-3">
                  <span className="absolute left-2 top-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">{[17,14,25,9,12][idx]}%</span>
                  <div className="h-24 sm:h-28 rounded-lg bg-gray-50 flex items-center justify-center text-3xl">🐟</div>
                  <div className="mt-2 text-center text-sm">{["Cá múc","Cá thu","Tôm sú","Cá thu một nắng","Cua biển"][idx]}</div>
                  <div className="mt-1 text-center text-xs text-gray-400 line-through">{["350.000₫","350.000₫","280.000₫","350.000₫","700.000₫"][idx]}</div>
                  <div className="text-center text-emerald-700 font-semibold">{["300.000₫","300.000₫","250.000₫","300.000₫","650.000₫"][idx]}</div>
                  <button className="mt-2 w-full rounded-full bg-emerald-600 text-white text-xs py-1.5">Thêm vào giỏ</button>
                </div>
              ))}
            </div>
            <div className="px-4 sm:px-6 pb-4 flex justify-center">
              <button className="rounded-full border border-emerald-200 text-emerald-700 px-5 py-1.5 text-sm hover:bg-emerald-50">Xem tất cả</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/src/assets/images/logo.png" alt="Bean Farm" className="h-10 w-auto" />
            </div>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Bean Farm - Siêu thị trực tuyến mua sắm nông sản, chất lượng, tươi xanh.
            </p>
            <p className="mt-2 text-emerald-700 font-medium">Giá siêu tốt - Giao siêu tốc.</p>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="font-medium">Địa chỉ:</span> 70 Lữ Gia, Phường 15, Quận 11, TP.HCM</p>
              <p><span className="font-medium">Điện thoại:</span> <a href="tel:19006750" className="text-emerald-700 font-semibold">1900 6750</a></p>
              <p><span className="font-medium">Email:</span> <a href="mailto:support@sapo.vn" className="text-emerald-700 font-semibold">support@sapo.vn</a></p>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-lg">Chính sách</h4>
            <ul className="mt-4 space-y-3 text-gray-700">
              {[
                'Chính sách thành viên',
                'Chính sách thanh toán',
                'Chính sách đổi sản phẩm',
                'Chính sách bảo mật',
                'Chính sách cộng tác viên',
                'Chính sách bảo hành',
              ].map((t, i) => (
                <li key={i}><a href="#" className="hover:text-emerald-700">{t}</a></li>
              ))}
            </ul>
          </div>

          {/* Guide */}
          <div>
            <h4 className="font-semibold text-lg">Hướng dẫn</h4>
            <ul className="mt-4 space-y-3 text-gray-700">
              {[
                'Hướng dẫn mua hàng',
                'Hướng dẫn đổi trả',
                'Hướng dẫn thanh toán',
                'Chương trình cộng tác viên',
                'Tìm kiếm',
                'Liên hệ',
              ].map((t, i) => (
                <li key={i}><a href="#" className="hover:text-emerald-700">{t}</a></li>
              ))}
            </ul>
          </div>

          {/* Social + payment + Zalo */}
          <div>
            <h4 className="font-semibold text-lg">Kết nối với chúng tôi</h4>
            <div className="mt-4 flex gap-2">
              {['facebook','twitter','youtube','instagram'].map((n,i)=> (
                <a key={i} href="#" className="h-9 w-9 rounded-md bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700">
                  <span className="sr-only">{n}</span>
                  {/* simple dots as icon placeholders */}
                  <span className="h-1.5 w-1.5 bg-white rounded-full" />
                </a>
              ))}
            </div>

            <h4 className="mt-6 font-semibold text-lg">Hình thức thanh toán</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {['₫','↔','VISA','MOMO'].map((t,i)=> (
                <div key={i} className="px-3 py-1.5 rounded-md border text-sm text-gray-700">{t}</div>
              ))}
            </div>

            <h4 className="mt-6 font-semibold text-lg">Zalo Mini Apps</h4>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-20 w-20 rounded-md border flex items-center justify-center text-xs text-gray-500">QR</div>
              <p className="text-sm text-gray-600">Quét mã QR để mua hàng nhanh chóng</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-center">
            © Bản quyền thuộc về <span className="font-semibold">Mr. Bean</span> | Cung cấp bởi <span className="font-semibold">Sapo</span>
          </div>
        </div>
      </footer>
    </div>
        </>

    );


};

export default Products;