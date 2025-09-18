const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="w-full shadow-sm">
        {/* Top bar: Logo + Search + Actions */}
        <div className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="shrink-0 flex items-center gap-3">
            <img
              src="/src/assets/images/logo.png"
              alt="Bean Farm"
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Trái cây"
                className="w-full rounded-full border border-gray-200 bg-gray-50 pl-5 pr-12 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600"
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
          <div className="flex items-center gap-3">
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
                className="relative inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 bg-white hover:bg-gray-50 text-gray-800"
              >
                <span className="relative">
                  {item.icon}
                  {typeof item.count === "number" && (
                    <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-emerald-600 text-white text-xs leading-5 text-center">
                      {item.count}
                    </span>
                  )}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="border-t border-gray-100">
          <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
            {/* Categories button */}
            <button className="inline-flex items-center gap-3 rounded-md bg-amber-400 text-gray-900 px-4 py-2 font-medium">
              <span className="text-xl">≡</span>
              <span>Danh mục sản phẩm</span>
            </button>

            {/* Links */}
            <nav className="flex items-center gap-2 flex-1">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
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
            <button className="rounded-full bg-red-600 text-white px-5 py-2 font-semibold hover:bg-red-700">
              Mua hàng nhanh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Danh mục nổi bật */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">Danh mục nổi bật</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
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
                className="group rounded-2xl border border-gray-200 bg-white p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-3 h-24 w-24 rounded-full bg-emerald-50 flex items-center justify-center text-3xl">
                  🥗
                </div>
                <div className="space-y-1">
                  <div className="font-medium">{cat.name}</div>
                  <div className="text-sm text-gray-500">{cat.count} sản phẩm</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Khối sản phẩm và banner */}
        <section className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
            {/* Banner bên trái */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-300 to-emerald-300 p-6 flex flex-col justify-between min-h-[360px]">
              <div>
                <h3 className="text-2xl font-semibold leading-snug">Bán chạy nhất hàng ngày</h3>
                <p className="mt-3 text-emerald-900">
                  Ưu đãi độc quyền - Giảm giá 20%
                </p>
                <p className="mt-3 text-sm text-emerald-900/80 max-w-xs">
                  Mua sắm thoải mái chỉ từ 20.000 VNĐ. Chỉ trong tuần này, đừng bỏ lỡ.
                </p>
              </div>
              <button className="self-start mt-6 rounded-full bg-white text-emerald-700 px-5 py-2 font-medium shadow hover:shadow-md">
                Mua ngay
              </button>
            </div>

            {/* Lưới sản phẩm */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <div key={idx} className="relative rounded-2xl border border-gray-200 bg-white p-5 flex flex-col">
                  {/* Nhãn giảm giá / mới */}
                  <div className="absolute left-4 top-4 flex gap-2">
                    {p.discount ? (
                      <span className="rounded-full bg-red-500 text-white text-xs px-2 py-1">
                        {p.discount}%
                      </span>
                    ) : null}
                    {p.isNew ? (
                      <span className="rounded-full bg-amber-200 text-amber-900 text-xs px-2 py-1">
                        Mới
                      </span>
                    ) : null}
                  </div>

                  {/* Ảnh sản phẩm */}
                  <div className="my-8 flex-1 flex items-center justify-center">
                    <div className="h-40 w-40 rounded-full bg-gray-50 flex items-center justify-center text-5xl">🥬</div>
                  </div>

                  {/* Tên + giá */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-lg">{p.name}</h4>
                    <div className="flex items-baseline gap-3">
                      <span className="text-gray-400 line-through text-sm">{p.oldPrice}</span>
                      <span className="text-emerald-600 font-semibold">{p.price}</span>
                    </div>
                  </div>

                  {/* Hành động */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button className="col-span-1 rounded-full bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700">
                      Thêm vào giỏ
                    </button>
                    <button className="col-span-1 rounded-full border border-emerald-200 text-emerald-700 px-4 py-2 text-sm font-medium hover:bg-emerald-50">
                      Tùy chọn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10" />
    </div>
  );
};

export default Home;
