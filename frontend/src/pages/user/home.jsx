import { use, useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import slide from "../../assets/images/slide.png";
import thitheo from "../../assets/images/thitheo.png";
import rau from "../../assets/images/rau.png";
import raucu from "../../assets/images/raucu.png";
import cuqua from "../../assets/images/cuqua.png";
import suatuoi from "../../assets/images/suatuoi.png";
import bannerproduct5 from "../../assets/images/img_banner_index.webp";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import apiCategory from "../../api/apiCategory";
import apiProduct from "../../api/apiProduct";
import apiBrand from "../../api/apiBrand";
import ProductItem from "./ProductItem";
import { imageURL } from "../../api/config";
import { useNavigate } from "react-router-dom";
import useAddToCart from "../../hooks/useAddToCart";
import "react-toastify/dist/ReactToastify.css";

const videos = [
  {
    thumbnail: "https://thuanchay.vn/wp-content/uploads/2024/04/6-Cach-Nau-Sua-Hat-Sen-Thom-Ngon-Me-Ly-Nen-Thu-Ngay-29.webp",
    title: "Hướng dẫn cách làm sữa hạt sen ngon mê ly ngay tại nhà",
    url: "https://www.youtube.com/watch?v=4zH5iYM4wJo",
  },
  {
    thumbnail: "https://bearviet.vn/wp-content/uploads/2024/06/cach-lam-sua-dau-do-bang-may-lam-sua-hat.jpg",
    title: "Hướng dẫn cách làm sữa hạt đậu đỏ thơm ngon, béo ngậy",
    url: "https://www.youtube.com/watch?v=yA1B7rF-yZc",
  },
  {
    thumbnail: "https://file.hstatic.net/200000700229/article/lam-sua-hat-dieu-thumb_8769d4e4cb954630980272c75789bf39.jpg",
    title: "Hướng dẫn cách làm sữa hạt điều đơn giản mà không phải ai cũng biết",
    url: "https://www.youtube.com/watch?v=EwZkzGkQj2s",
  },
  {
    thumbnail: "https://matika.vn/wp-content/uploads/2023/05/uong-sua-hat-giam-can-tot-cho-suc-khoe.jpg",
    title: "Hướng dẫn cách làm sữa hạt đậu đen siêu ngon cho cả gia đình",
    url: "https://www.youtube.com/watch?v=BtK9O6Hh2vw",
  },
];



const Home = () => {
  const [categorys, setcategorys] = useState([]);
  const [productNew, setProductNew] = useState([]);
  const [saleProducts, setProductSale] = useState([]);
  const navigate = useNavigate();
  const handleAddToCart = useAddToCart();
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

  const [producsCat, setProductsCat] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await apiProduct.categoryhome();
        console.log("Data từ API:", res.data);
        setProductsCat(res.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm theo danh mục:", err);
      }
    };

    fetchProductsByCategory();
  }, []); // ⚠️ RẤT QUAN TRỌNG: [] để chỉ chạy 1 lần

  const [Brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await apiBrand.getAll();
        setBrands(res.data.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy thương hiệu:", err);
      }
    };
    fetchBrands();
  }, []);




  return (
    <div>
      <main className="max-w-7xl mx-auto pt-10 px-2 sm:px-0">
        {/* Slide */}
        <section className="slide flex justify-center mt-3 px-0">
          <img
            src={slide}
            alt="banner"
            className="
             w-full object-cover h-auto rounded-2xl max-h-[420px]"
          />
        </section>


        {/* 🌿 Danh mục nổi bật */}
        <section className="mt-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 px-2 sm:px-0">
            <div className="flex items-center gap-2">
              <span
                className="text-yellow-400 text-2xl sm:text-3xl drop-shadow-lg"
                style={{ animation: "shake 0.5s infinite" }}
              >
                🛒
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-emerald-600 tracking-tight">
                Danh mục nổi bật
              </h2>
            </div>

            {/* Link nhóm danh mục */}
            <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
              <Link
                to="/products?category=trai-cay"
                state={{ categorySlug: "trai-cay", categoryName: "Trái cây" }}
                className="whitespace-nowrap text-sm sm:text-base text-emerald-700 hover:text-yellow-600 transition font-medium"
              >
                Trái cây
              </Link>

              <Link
                to="/products?category=rau-cu-qua"
                state={{
                  categorySlug: "rau-cu-qua",
                  categoryName: "Rau củ quả",
                }}
                className="whitespace-nowrap text-sm sm:text-base text-emerald-700 hover:text-yellow-600 transition font-medium"
              >
                Rau củ quả
              </Link>

              <Link
                to="/products?category=thit"
                state={{
                  categorySlug: "thit",
                  categoryName: "Thịt",
                }}
                className="whitespace-nowrap text-sm sm:text-base text-emerald-700 hover:text-yellow-600 transition font-medium"
              >
                Thịt
              </Link>
            </div>
          </div>

          {/* Danh sách danh mục */}
          <div className="relative">
            {/* Nút trái */}
            <button
              onClick={() =>
                document
                  .getElementById("category-list")
                  .scrollBy({ left: -180, behavior: "smooth" })
              }
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow hover:bg-gray-100 items-center justify-center"
            >
              <MdArrowBackIos className="text-gray-600" />
            </button>

            <div
              id="category-list"
              className="flex gap-3 sm:gap-5 overflow-x-auto scroll-smooth pb-2 scrollbar-hide px-2 sm:px-0 relative"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categorys
                .filter((category) => category.parent_id !== 0)
                .map((category) => (
                  <div
                    key={category.id}
                    onClick={() =>
                      navigate(`/products?category=${category.slug}`, {
                        state: { categoryName: category.name },
                      })
                    }
                    className="h-44 w-40 flex-shrink-0 rounded-2xl flex flex-col items-center justify-center 
            p-3 cursor-pointer bg-gradient-to-br from-white via-green-50 to-emerald-50 border border-green-100 
            shadow-sm hover:shadow-lg hover:border-green-400 hover:-translate-y-1 transition-all duration-300 mt-4"
                  >
                    {/* Ảnh danh mục */}
                    <div className="w-full h-28 sm:h-32 flex items-center justify-center">
                      <img
                        src={`${imageURL}/category/${category.image}`}
                        alt={category.name}
                        className="h-full w-full object-contain transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    {/* Tên danh mục */}
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center mt-2 hover:text-green-700 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                ))}
            </div>

            {/* Nút phải */}
            <button
              onClick={() =>
                document
                  .getElementById("category-list")
                  .scrollBy({ left: 180, behavior: "smooth" })
              }
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow hover:bg-gray-100 items-center justify-center"
            >
              <MdArrowForwardIos className="text-gray-600" />
            </button>
          </div>
        </section>


        {/* Sale 1 */}
        <section className="mt-10 bg-gray-50 rounded-2xl px-3 sm:px-4 lg:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-stretch">
            {/* 🎨 Banner bên trái */}
            <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-amber-300 to-emerald-300 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[220px] sm:min-h-[360px]">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
              <div className="relative z-10">
                <h3 className="text-lg sm:text-2xl font-semibold leading-snug text-emerald-900 drop-shadow-sm">
                  Bán chạy nhất hôm nay
                </h3>
                <p className="mt-2 sm:mt-3 text-emerald-900 text-sm sm:text-base">
                  Ưu đãi độc quyền - Giảm giá 20%
                </p>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-emerald-900/80 max-w-[220px]">
                  Mua sắm thoải mái chỉ từ 20.000₫. Chỉ trong tuần này – đừng bỏ lỡ!
                </p>
              </div>
              <button className="relative z-10 self-start mt-5 sm:mt-6 rounded-full bg-white text-emerald-700 px-5 py-2 text-sm sm:text-base font-medium shadow hover:scale-105 hover:shadow-lg transition">
                Mua ngay
              </button>
            </div>

            {/* 🛒 Danh sách sản phẩm */}
            <div className="lg:col-span-3">
              {/* Mobile: scroll ngang */}
              <div className="lg:hidden">
                <div
                  className="flex gap-3 sm:gap-5 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {productNew.map((product) => (
                    <div key={product.id} className="min-w-[160px] sm:min-w-[200px]">
                      <ProductItem product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Laptop: dạng grid full chuẩn */}
              <div className="hidden lg:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {productNew.slice(0, 8).map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>


              {/* Nút xem tất cả */}
              <div className="text-center mt-6">
                <Link to="/products">
                  <button className="bg-white px-4 sm:px-5 py-1.5 rounded-2xl border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition text-sm sm:text-base flex items-center justify-center gap-1 mx-auto shadow-sm hover:shadow-md">
                    Xem tất cả
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Banner */}
        <section className="mt-8 px-2 sm:px-0">
          {/* Grid desktop, scroll horizontal mobile */}
          <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible scroll-smooth pb-2 scrollbar-hide">

            {/* Card 1 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-all duration-300 min-w-[260px] sm:min-w-0">
              <img
                src={cuqua}
                alt="Nông sản tươi mới"
                className="w-full h-36 sm:h-56 object-cover transform group-hover:scale-105 group-hover:brightness-90 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 bg-black/30 text-white transition-all duration-300 group-hover:bg-black/40">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Nông sản tươi mới
                  </h3>
                  <p className="text-xs sm:text-sm mt-1">
                    Sản phẩm 100% từ Thiên nhiên
                  </p>
                </div>
                <Link
                  to="/products"
                  className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md self-start text-xs sm:text-sm hover:bg-yellow-500 transition-colors duration-300"
                >
                  Xem ngay
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-all duration-300 min-w-[260px] sm:min-w-0">
              <img
                src={suatuoi}
                alt="Sữa nguyên chất"
                className="w-full h-36 sm:h-56 object-cover transform group-hover:scale-105 group-hover:brightness-90 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 bg-black/20 text-white transition-all duration-300 group-hover:bg-black/40">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Bữa sáng lành mạnh
                  </h3>
                  <p className="text-xs sm:text-sm mt-1">
                    Sữa tươi nguyên chất Tiệt trùng
                  </p>
                </div>
                <Link
                  to="/products"
                  className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md self-start text-xs sm:text-sm hover:bg-yellow-500 transition-colors duration-300"
                >
                  Xem ngay
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-all duration-300 min-w-[260px] sm:min-w-0">
              <img
                src={raucu}
                alt="Rau củ hữu cơ"
                className="w-full h-36 sm:h-56 object-cover transform group-hover:scale-105 group-hover:brightness-90 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 bg-black/20 text-white transition-all duration-300 group-hover:bg-black/40">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Rau củ hữu cơ 100%
                  </h3>
                  <p className="text-xs sm:text-sm mt-1">
                    Sạch sẽ và an toàn, Chất lượng
                  </p>
                </div>
                <Link
                  to="/products"
                  className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md self-start text-xs sm:text-sm hover:bg-yellow-500 transition-colors duration-300"
                >
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sale sản phẩm */}
        <section className="mt-10">
          <div className="rounded-2xl shadow-lg overflow-hidden border border-green-300 bg-gradient-to-br from-white via-green-50 to-emerald-100">
            {/* ===== Header ===== */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-center sm:text-left flex items-center gap-2">
                {/* ⚡ Icon rung */}
                <span
                  className="text-yellow-300 text-2xl sm:text-3xl drop-shadow-lg"
                  style={{
                    animation: "shake 0.5s infinite",
                  }}
                >
                  ⚡
                </span>

                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Khuyến mãi đặc biệt
                  </h2>
                  <p className="text-sm sm:text-base opacity-90 mt-1">
                    Giảm giá hấp dẫn — Số lượng có hạn, nhanh tay kẻo lỡ!
                  </p>
                </div>
              </div>

              {/* Countdown */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                {[
                  { label: "Ngày", value: countdown.days },
                  { label: "Giờ", value: countdown.hours },
                  { label: "Phút", value: countdown.minutes },
                  { label: "Giây", value: countdown.seconds },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="bg-white text-green-700 rounded-lg px-3 sm:px-4 py-1 sm:py-1.5 font-semibold text-sm sm:text-base shadow-md flex flex-col items-center"
                  >
                    <span className="text-lg sm:text-xl font-extrabold">
                      {String(t.value).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-medium opacity-80">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== MOBILE layout ===== */}
            <div className="p-4 md:hidden bg-white">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2">
                {saleProducts.slice(0, 6).map((p) => {
                  const percent = p.discount_percent || 0;
                  const soldPercent = p.stock
                    ? Math.round((p.sold / p.stock) * 100)
                    : 0;

                  return (
                    <div
                      key={p.id}
                      className="flex-shrink-0 w-[78%] sm:w-[48%] bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
                    >
                      {/* Badge giảm giá */}
                      {percent > 0 && (
                        <div
                          className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 shadow-md animate-pulse badge-shake"
                          style={{
                            background:
                              "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)",
                            borderTopLeftRadius: "4px",
                            borderBottomLeftRadius: "4px",
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px",
                          }}
                        >
                          -{percent}%
                        </div>
                      )}

                      <Link to={`/product/${p.slug}`} className="block p-3">
                        <img
                          src={`${imageURL}/product/${p.thumbnail}`}
                          alt={p.name}
                          className="w-full h-28 object-contain mx-auto"
                        />
                      </Link>

                      <div className="px-3 pb-3 space-y-1">
                        <Link
                          to={`/product/${p.slug}`}
                          className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-green-700 transition-colors"
                        >
                          {p.name}
                        </Link>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Đã bán {p.sold}/{p.stock}{" "}
                          <span className="text-green-600 font-semibold">
                            {soldPercent}%
                          </span>
                        </p>
                        <p className="text-gray-400 line-through text-[11px]">
                          {p.price_root.toLocaleString()}₫
                        </p>
                        <p className="text-red-600 font-bold text-[13px]">
                          {p.price_sale.toLocaleString()}₫
                        </p>

                        {/* Progress */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full transition-all ${soldPercent > 70
                              ? "bg-red-500 animate-pulse"
                              : "bg-green-500"
                              }`}
                            style={{ width: `${soldPercent}%` }}
                          ></div>
                        </div>

                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={p.qty === 0}
                          className={`w-full py-2 mt-3 rounded-xl text-xs font-semibold transition-all ${p.qty === 0
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-yellow-500"
                            }`}
                        >
                          {p.qty === 0 ? "Hết hàng" : "Thêm vào giỏ"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===== LAPTOP layout ===== */}
            <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-white">
              {saleProducts.slice(0, 8).map((p) => {
                const percent = p.discount_percent || 0;
                const soldPercent = p.stock
                  ? Math.round((p.sold / p.stock) * 100)
                  : 0;

                return (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex gap-2"
                  >
                    {/* Badge giảm giá */}
                    {percent > 0 && (
                      <div
                        className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 shadow-md animate-pulse badge-shake"
                        style={{
                          background:
                            "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)",
                          borderTopLeftRadius: "4px",
                          borderBottomLeftRadius: "4px",
                          borderTopRightRadius: "12px",
                          borderBottomRightRadius: "12px",
                        }}
                      >
                        -{percent}%
                      </div>
                    )}

                    <div className="basis-5/12">
                      <Link to={`/product/${p.slug}`}>
                        <img
                          src={`${imageURL}/product/${p.thumbnail}`}
                          alt={p.name}
                          className="w-full h-32 object-contain"
                        />
                      </Link>
                    </div>

                    <div className="basis-7/12">
                      <Link
                        to={`/product/${p.slug}`}
                        className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-green-700 transition-colors"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        Đã bán: {p.sold}/{p.stock}{" "}
                        <span className="text-green-600 font-semibold">
                          {soldPercent}%
                        </span>
                      </p>
                      <p className="text-gray-400 line-through text-xs">
                        {p.price_root.toLocaleString()}₫
                      </p>
                      <p className="text-red-600 font-bold text-sm">
                        {p.price_sale.toLocaleString()}₫
                      </p>

                      {/* Progress */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full transition-all ${soldPercent > 70
                            ? "bg-red-500 animate-pulse"
                            : "bg-green-500"
                            }`}
                          style={{ width: `${soldPercent}%` }}
                        ></div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(p)}
                        disabled={p.qty === 0}
                        className={`w-full py-2 mt-3 rounded-lg text-sm font-semibold transition-all ${p.qty === 0
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-yellow-500"
                          }`}
                      >
                        {p.qty === 0 ? "Hết hàng" : "Thêm vào giỏ"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>





        {/* Video hướng dẫn */}

        <section className="bg-gradient-to-br from-white via-green-50 to-emerald-100 border border-green-200 shadow-lg p-4 sm:p-6 rounded-2xl mt-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span
                className="text-yellow-400 text-2xl sm:text-3xl drop-shadow-lg"
                style={{ animation: "shake 0.5s infinite" }}
              >
                🎬
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-emerald-600 tracking-tight">
                Video hướng dẫn
              </h2>
            </div>
            <button
              onClick={() => navigate("/videos")}
              className="hidden sm:inline-flex px-4 sm:px-6 py-2 border border-green-600 text-green-700 rounded-full hover:bg-green-600 hover:text-white transition text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
            >
              Xem tất cả
            </button>
          </div>

          {/* Scroll ngang ở mobile / Grid ở desktop */}
          <div className="flex md:grid md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible scroll-smooth pb-2 scrollbar-hide rounded-lg">
            {videos.map((v, i) => (
              <div
                key={i}
                className="min-w-[60%] xs:min-w-[50%] sm:min-w-0 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex-shrink-0 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative group">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-44 sm:h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="text-white w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg" />
                  </a>
                </div>

                {/* Tiêu đề video */}
                <div className="p-3">
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 hover:text-green-700 transition-colors">
                    {v.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nút xem tất cả (mobile) */}
          <div className="text-center mt-6 sm:hidden">
            <button
              onClick={() => navigate("/videos")}
              className="px-4 sm:px-6 py-2 border border-green-600 text-green-700 rounded-full hover:bg-green-600 hover:text-white transition text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
            >
              Xem tất cả
            </button>
          </div>
        </section>



        {/* Banner cuối */}
        <section className="mt-12 px-2 sm:px-0">
          <div className="overflow-hidden rounded-lg mb-3">
            <img
              className="w-full h-32 sm:h-full object-cover transform transition-transform duration-700 ease-in-out hover:scale-110"
              src={bannerproduct5}
              alt=""
            />
          </div>
        </section>

        {/* Nhóm danh mục nhỏ */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 sm:px-0">
          {producsCat.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border border-green-300  shadow-lg hover:shadow-xl transition-all duration-300 p-4"
            >
              {/* Tiêu đề danh mục */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-extrabold text-emerald-600 text-lg tracking-tight">
                  {cat.name}
                </h4>


                <Link
                  to={`/products?category=${cat.slug}`} // ✅ Sửa 'href' thành 'to' và đổi URL
                  state={{ categoryName: cat.name }}     // ✅ Thêm 'state' để trang kia biết tên
                  className="text-emerald-700 text-xs hover:underline"
                >
                  Xem thêm »
                </Link>
              </div>

              {/* Danh sách sản phẩm */}
              <div className="flex flex-col gap-3">
                {cat.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 border border-gray-200 bg-white p-3 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative"
                  >
                    {/* Ảnh sản phẩm */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative">
                      <Link to={`/product/${p.slug}`}>
                        <img
                          src={`${imageURL}/product/${p.thumbnail}`}
                          alt={p.name}
                          className="object-contain w-full h-full rounded-lg"
                        />
                      </Link>

                      {/* Badge giảm giá */}
                      {p.discount_percent > 0 && (
                        <div className="absolute top-1 left-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] sm:text-xs font-bold px-1.5 py-0.5 rounded-tr-lg rounded-bl-lg shadow animate-pulse">
                          -{p.discount_percent}%
                        </div>
                      )}
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${p.slug}`}
                        className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-green-700 transition-colors"
                      >
                        {p.name}
                      </Link>

                      {/* Giá hiển thị logic giống phần khuyến mãi */}
                      <div className="flex items-center gap-2 mt-1 text-sm sm:text-base">
                        {p.price_sale > 0 ? (
                          <>
                            <span className="text-red-600 font-bold">
                              {p.price_sale.toLocaleString()}₫
                            </span>
                            <span className="text-gray-400 line-through text-xs sm:text-sm">
                              {p.price_root.toLocaleString()}₫
                            </span>
                          </>
                        ) : (
                          <span className="text-red-600 font-bold">
                            {p.price_root.toLocaleString()}₫
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>



        <section className="mt-12 px-2 sm:px-0">
          <div className="rounded-2xl border border-green-200  shadow-lg p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-yellow-400 text-2xl sm:text-3xl drop-shadow-lg"
                style={{ animation: "shake 0.5s infinite" }}
              >
                🤝
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-emerald-600 tracking-tight">
                Đối tác của chúng tôi
              </h3>
            </div>

            {/* Danh sách đối tác */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 items-center">
              {Brands.length > 0 ? (
                Brands.map((brand, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-green-100 p-3 sm:p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    {brand.image ? (
                      <img
                        src={`${imageURL}/brand/${brand.image}`}
                        alt={brand.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
                      />
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-gray-400 text-xs border border-gray-200 rounded-full">
                        No Image
                      </div>
                    )}
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mt-2 text-center hover:text-green-700 transition">
                      {brand.name}
                    </p>
                  </div>
                ))
              ) : (
                <p className="col-span-6 text-center text-gray-400 text-sm">
                  Đang tải thương hiệu...
                </p>
              )}
            </div>
          </div>
        </section>



        {/* Service badges */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 px-2 sm:px-0 ">
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
