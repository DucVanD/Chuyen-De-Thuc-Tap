import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import slide from "../../assets/images/slide.png";
import thitheo from "../../assets/images/thitheo.png";
import rau from "../../assets/images/rau.png";
import raucu from "../../assets/images/raucu.png";
import cuqua from "../../assets/images/cuqua.png";
import suatuoi from "../../assets/images/suatuoi.png";
import thitbo from "../../assets/images/thitbo.png";
import bannerproduct1 from "../../assets/images/product2_img.webp";
import bannerproduct2 from "../../assets/images/product22_img.webp";
import bannerproduct3 from "../../assets/images/product32_img.webp";
import bannerproduct4 from "../../assets/images/product3_img.webp";
import bannerproduct5 from "../../assets/images/img_banner_index.webp";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import apiCategory from "../../api/apiCategory";
import apiProduct from "../../api/apiProduct";
import ProductItem from "./ProductItem";
import { imageURL } from "../../api/config";
import { useNavigate } from "react-router-dom";
const videos = [
  {
    thumbnail: "https://picsum.photos/400/250?1",
    title: "Hướng dẫn cách làm sữa hạt sen ngon mê ly ngay tại nhà",
    url: "https://www.youtube.com/watch?v=xxxxx",
  },
  {
    thumbnail: "https://picsum.photos/400/250?2",
    title: "Hướng dẫn cách làm sữa hạt đậu đỏ thơm ngon, béo ngậy",
    url: "https://www.youtube.com/watch?v=xxxxx",
  },
  {
    thumbnail: "https://picsum.photos/400/250?3",
    title: "Hướng dẫn cách làm sữa hạt điều đơn giản mà không phải ai cũng...",
    url: "https://www.youtube.com/watch?v=xxxxx",
  },
  {
    thumbnail: "https://picsum.photos/400/250?4",
    title: "Hướng dẫn cách làm sữa hạt đậu đen siêu ngon cho cả gia đình",
    url: "https://www.youtube.com/watch?v=xxxxx",
  },
];

const Home = () => {
  const [categorys, setcategorys] = useState([]);
  const [productNew, setProductNew] = useState([]);
  const [saleProducts, setProductSale] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    apiProduct
      .getNewest()
      .then((res) => setProductNew(res.data || []))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm mới:", err));
  }, []);

  useEffect(() => {
    apiCategory
      .getAll()
      .then((res) => setcategorys(res.data.data || []))
      .catch((err) => console.error("Lỗi khi lấy danh muc:", err));
  }, []);

  useEffect(() => {
    apiProduct.getSaleDiscount().then((res) => setProductSale(res.data || []));
  }, []);

  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 2,
    minutes: 33,
    seconds: 35,
  });

  useEffect(() => {
    // Thời gian kết thúc (99 ngày + 2 giờ + 33 phút + 35 giây từ lúc load trang)
    const end = new Date(
      Date.now() +
        5 * 24 * 3600 * 1000 +
        2 * 3600 * 1000 +
        33 * 60 * 1000 +
        35 * 1000
    );

    const timer = setInterval(() => {
      const now = new Date();
      const diff = end - now;
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (24 * 3600 * 1000));
        const hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
        const minutes = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <main className="max-w-7xl mx-auto py-10 px-2 sm:px-0">
        {/* Slide */}
        <section className="slide flex justify-center mt-3 px-0">
          <img
            src={slide}
            alt="banner"
            className="hidden sm:block w-full object-cover h-auto rounded-2xl max-h-[420px]"
          />
        </section>

        {/* Danh mục nổi bật */}
        <section className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 px-2 sm:px-0">
            <div>
              <Link className="text-[22px] sm:text-[25px] font-medium">
                Danh mục nổi bật
              </Link>
            </div>
           <div className="flex gap-2 sm:gap-4 overflow-x-auto">
  <Link
    to="/products"
    state={{ categorySlug: "trai-cay", categoryName: "Trái cây" }}
    className="whitespace-nowrap text-sm sm:text-base"
  >
    Trái cây
  </Link>

  <Link
    to="/products"
    state={{ categorySlug: "rau-cu-qua", categoryName: "Rau củ quả" }}
    className="whitespace-nowrap text-sm sm:text-base"
  >
    Rau củ quả
  </Link>

  <Link
    to="/products"
    state={{ categorySlug: "thuc-pham-tuoi-song", categoryName: "Thực phẩm tươi sống" }}
    className="whitespace-nowrap text-sm sm:text-base"
  >
    Thực phẩm tươi sống
  </Link>
</div>

            <div className="flex gap-2 sm:gap-3 justify-end">
              <button
                onClick={() =>
                  document
                    .getElementById("category-list")
                    .scrollBy({ left: -180, behavior: "smooth" })
                }
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
              >
                <MdArrowBackIos className="text-gray-600" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("category-list")
                    .scrollBy({ left: 180, behavior: "smooth" })
                }
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
              >
                <MdArrowForwardIos className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              id="category-list"
              className="flex gap-3 sm:gap-5 overflow-x-auto scroll-smooth pb-2 scrollbar-hide px-2 sm:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categorys
                .filter((category) => category.parent_id !== 0) // chỉ lấy category con
                .map((category) => (
                  <div
                    key={category.id}
                    onClick={() =>
                      navigate(`/products?category=${category.slug}`, {
                        state: { categoryName: category.name },
                      })
                    }
                    className="h-40 w-36 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md hover:bg-green-50 cursor-pointer transition"
                  >
                    <img
                      src={`${imageURL}/category/${category.image}`}
                      alt={category.name}
                      className="h-16 sm:h-20 object-contain mb-2 w-full"
                    />
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800 text-center">
                      {category.name}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Sale 1 */}
        <section className="mt-12 bg-gray-400 rounded-2xl px-2 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 items-stretch">
            {/* Banner bên trái */}
            <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-amber-300 to-emerald-300 p-4 sm:p-6 flex flex-col justify-between min-h-[180px] sm:min-h-[380px]">
              <div>
                <h3 className="text-lg sm:text-2xl font-semibold leading-snug">
                  Bán chạy nhất hàng ngày
                </h3>
                <p className="mt-2 sm:mt-3 text-emerald-900 text-sm sm:text-base">
                  Ưu đãi độc quyền - Giảm giá 20%
                </p>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-emerald-900/80 max-w-xs">
                  Mua sắm thoải mái chỉ từ 20.000 VNĐ. Chỉ trong tuần này, đừng
                  bỏ lỡ.
                </p>
              </div>
              <button className="self-start mt-4 sm:mt-6 rounded-full bg-white text-emerald-700 px-4 sm:px-5 py-2 text-sm sm:text-base font-medium shadow hover:shadow-md">
                Mua ngay
              </button>
            </div>
            {/* Lưới sản phẩm */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl px-2 sm:px-6 py-4">
                <div
                  id="product-list"
                  className="flex gap-3 sm:gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {productNew.map((product) => (
                    <div className="min-w-[170px] sm:min-w-[210px]">
                      <ProductItem key={product.id} product={product} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center mb-10">
                <button className="mt-2 bg-white px-4 sm:px-5 py-1 rounded-2xl border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition text-sm sm:text-base">
                  <Link to="products" className="">
                    Xem tất cả
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Banner */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 px-2 sm:px-0">
            {/* Card 1 */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow">
              <img
                src={cuqua}
                alt="Nông sản tươi mới"
                className="w-full h-32 sm:h-48 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black/30 text-white">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">
                    Nông sản tươi mới
                  </h3>
                  <p className="text-xs sm:text-base">
                    Sản phẩm 100% từ Thiên nhiên
                  </p>
                </div>
                <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md self-start text-xs sm:text-base">
                  Xem ngay
                </button>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow">
              <img
                src={suatuoi}
                alt="Sữa nguyên chất"
                className="w-full h-32 sm:h-48 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black/20 text-white">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">
                    Bữa sáng lành mạnh
                  </h3>
                  <p className="text-xs sm:text-base">
                    Sữa tươi nguyên chất Tiệt trùng
                  </p>
                </div>
                <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md self-start text-xs sm:text-base">
                  Xem ngay
                </button>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow">
              <img
                src={raucu}
                alt="Rau củ hữu cơ"
                className="w-full h-32 sm:h-48 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black/20 text-white">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">
                    Rau củ hữu cơ 100%
                  </h3>
                  <p className="text-xs sm:text-base">
                    Sạch sẽ và an toàn, Chất lượng
                  </p>
                </div>
                <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md self-start text-xs sm:text-base">
                  Xem ngay
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sale sản phẩm */}
        <section className="mt-9">
          <div className="rounded-lg shadow-md">
            <div className="bg-green-700 text-white p-4 flex flex-col sm:flex-row justify-between items-center rounded-t-lg gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  Khuyến mãi đặc biệt ⚡
                </h2>
                <p className="text-xs sm:text-base">
                  Đừng bỏ lỡ cơ hội giảm giá đặc biệt!
                </p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <span className="bg-white text-green-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-base">
                  {String(countdown.days).padStart(2, "0")} Ngày
                </span>
                <span className="bg-white text-green-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-base">
                  {String(countdown.hours).padStart(2, "0")} Giờ
                </span>
                <span className="bg-white text-green-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-base">
                  {String(countdown.minutes).padStart(2, "0")} Phút
                </span>
                <span className="bg-white text-green-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-base">
                  {String(countdown.seconds).padStart(2, "0")} Giây
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 border-b-2 border-r-2 border-l-2 border-dashed border-green-800 rounded-b-lg">
              {saleProducts.map((product) => {
                const percent = product.discount_percent || 0;
                const soldPercent = product.stock
                  ? Math.round((product.sold / product.stock) * 100)
                  : 0;
                return (
                  <div
                    key={product.id}
                    className="relative border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg grid grid-cols-2 gap-3 h-[200px]"
                  >
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full">
                      -{percent}%
                    </span>
                    <div>
                      <img
                        src={`${imageURL}/product/${product.thumbnail}`}
                        alt={product.name}
                        className="w-full h-20 sm:h-32 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mt-2 text-xs sm:text-base">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Đã bán: {product.sold}/{product.stock}{" "}
                        <span className="text-green-600 font-semibold">
                          {soldPercent}%
                        </span>
                      </p>
                      <p className="text-gray-400 line-through text-xs sm:text-sm">
                        {product.price_root.toLocaleString()}₫
                      </p>
                      <p className="text-red-600 font-bold text-xs sm:text-base">
                        {product.price_sale.toLocaleString()}₫
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${soldPercent}%` }}
                        ></div>
                      </div>
                      <button className="bg-green-600 text-white w-full mt-2 py-2 rounded-md hover:bg-green-700 text-xs sm:text-base">
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Video hướng dẫn */}
        <section className="bg-gray-200 p-4 sm:p-6 rounded-2xl mt-10">
          <h2 className="text-lg sm:text-2xl font-bold mb-5">
            Video hướng dẫn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {videos.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-32 sm:h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <Play className="text-white w-10 h-10 sm:w-12 sm:h-12" />
                  </a>
                </div>
                <div className="p-3">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2">
                    {v.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button className="px-4 sm:px-6 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition text-xs sm:text-base">
              Xem tất cả
            </button>
          </div>
        </section>

        {/* Banner cuối */}
        <section className="mt-12 px-2 sm:px-0">
          <div className="overflow-hidden rounded-lg mb-3">
            <img
              className="w-full h-32 sm:h-full object-cover transform transition-transform duration-600 ease-in-out hover:scale-110"
              src={bannerproduct5}
              alt=""
            />
          </div>
        </section>

        {/* Nhóm danh mục nhỏ */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
          {[
            { title: "Đồ khô" },
            { title: "Thức uống" },
            { title: "Bún các loại" },
          ].map((block, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{block.title}</h4>
                <a href="#" className="text-emerald-700 text-xs sm:text-sm">
                  Xem thêm »
                </a>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {new Array(4).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[44px,1fr,auto] sm:grid-cols-[56px,1fr,auto] items-center gap-2 sm:gap-3 rounded-lg border border-gray-100 p-2"
                  >
                    <div className="h-10 w-10 sm:h-14 sm:w-14 rounded bg-gray-50 flex items-center justify-center text-lg sm:text-2xl">
                      🧺
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm">Sản phẩm {i + 1}</div>
                      <div className="text-xs text-gray-400 line-through">
                        35.000₫
                      </div>
                      <div className="text-emerald-700 font-semibold text-xs sm:text-sm">
                        29.000₫
                      </div>
                    </div>
                    <button className="rounded-full bg-emerald-600 text-white text-xs px-2 sm:px-3 py-1.5">
                      Thêm vào giỏ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Đối tác */}
        <section className="mt-12 px-2 sm:px-0">
          <div className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Đối tác của chúng tôi
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 items-center">
              {["BIBO", "Organica", "Nhà Quê", "emart", "LOTTE", "NAMAN"].map(
                (p, i) => (
                  <div
                    key={i}
                    className="h-10 sm:h-12 rounded-md border flex items-center justify-center text-xs sm:text-sm text-gray-600 bg-gray-50"
                  >
                    {p}
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Service badges */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 px-2 sm:px-0">
          {[
            { t: "Vận chuyển miễn phí", s: "Hóa đơn trên 3 triệu" },
            { t: "Đổi trả miễn phí", s: "Trong vòng 7 ngày" },
            { t: "100% Hoàn tiền", s: "Nếu sản phẩm lỗi" },
            { t: "Hotline: 1900 6750", s: "Hỗ trợ 24/7" },
          ].map((b, i) => (
            <div
              key={i}
              className="rounded-xl border border-emerald-100 bg-emerald-50 p-2 sm:p-3 flex items-center gap-2 sm:gap-3"
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs sm:text-sm">
                ✓
              </div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-emerald-800">
                  {b.t}
                </div>
                <div className="text-xs text-emerald-700/80">{b.s}</div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
