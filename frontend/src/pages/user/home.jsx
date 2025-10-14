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
      <main className="max-w-7xl mx-auto py-10 px-2 sm:px-0">
        {/* Slide */}
        <section className="slide flex justify-center mt-3 px-0">
          <img
            src={slide}
            alt="banner"
            className="
             w-full object-cover h-auto rounded-2xl max-h-[420px]"
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
                state={{
                  categorySlug: "rau-cu-qua",
                  categoryName: "Rau củ quả",
                }}
                className="whitespace-nowrap text-sm sm:text-base"
              >
                Rau củ quả
              </Link>

              <Link
                to="/products"
                state={{
                  categorySlug: "thuc-pham-tuoi-song",
                  categoryName: "Thực phẩm tươi sống",
                }}
                className="whitespace-nowrap text-sm sm:text-base"
              >
                Thực phẩm tươi sống
              </Link>
            </div>

            <div className="hidden md:flex gap-2 sm:gap-3 justify-end">
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
                .filter((category) => category.parent_id !== 0)
                .map((category) => (
                  <div
                    key={category.id}
                    onClick={() =>
                      navigate(`/products?category=${category.slug}`, {
                        state: { categoryName: category.name },
                      })
                    }
                    className="h-44 w-40 flex-shrink-0 rounded-xl flex flex-col items-center justify-center 
                     p-3 cursor-pointer transition-transform duration-200 hover:scale-105 bg-gray-100"
                  >
                    <div className="w-full h-28 sm:h-32 flex items-center justify-center">
                      <img
                        src={`${imageURL}/category/${category.image}`}
                        alt={category.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 text-center mt-2">
                      {category.name}
                    </h3>
                  </div>
                ))}
            </div>
          </div>

        </section>

        {/* Sale 1 */}
        <section className="mt-12 bg-gray-100 rounded-2xl px-3 sm:px-4 lg:px-1 py-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
            {/* 🎨 Banner bên trái */}
            <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-amber-300 to-emerald-300 p-6 flex flex-col justify-between relative overflow-hidden min-h-[200px] sm:min-h-[380px]">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
              <div className="relative z-10">
                <h3 className="text-lg sm:text-2xl font-semibold leading-snug text-emerald-900">
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
              <button className="relative z-10 self-start mt-5 sm:mt-6 rounded-full bg-white text-emerald-700 px-5 py-2 text-sm sm:text-base font-medium shadow hover:scale-105 hover:shadow-lg transition">
                Mua ngay
              </button>
            </div>

            {/* 🛒 Danh sách sản phẩm */}
            <div className="lg:col-span-3">
              {/* Mobile: scroll ngang */}
              <div className="lg:hidden">
                <div
                  className="flex gap-3 sm:gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {productNew.map((product) => (
                    <div
                      key={product.id}
                      className="min-w-[170px] sm:min-w-[210px]"
                    >
                      <ProductItem product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Laptop: dạng grid */}
              <div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-3">
                {productNew.slice(0, 8).map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>

              {/* Nút xem tất cả */}
              <div className="text-center mt-6">
                <Link to="/products">
                  <button className="bg-white px-4 sm:px-5 py-1.5 rounded-2xl border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition text-sm sm:text-base flex items-center justify-center gap-1 mx-auto">
                    Xem tất cả <span>→</span>
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
        <section className="mt-9">
          <div className="rounded-lg shadow-md overflow-hidden border border-dashed border-green-800">
            {/* Header */}
            <div className="bg-green-700 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  Khuyến mãi đặc biệt ⚡
                </h2>
                <p className="text-xs sm:text-base">
                  Đừng bỏ lỡ cơ hội giảm giá đặc biệt!
                </p>
              </div>

              {/* Countdown */}
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

            {/* ===== Mobile layout (scroll ngang) ===== */}
            <div className="p-4 md:hidden">
              <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
                {saleProducts.slice(0, 6).map((product) => {
                  const percent = product.discount_percent || 0;
                  const soldPercent = product.stock
                    ? Math.round((product.sold / product.stock) * 100)
                    : 0;

                  return (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-[75%] sm:w-[45%] border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg transition bg-white"
                    >
                      <div className="relative grid grid-cols-2 gap-3 h-full">
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                          -{percent}%
                        </span>

                        <div className="flex items-center justify-center">



                          <Link to={`/product/${product.slug}`}>
                            <img
                              src={`${imageURL}/product/${product.thumbnail}`}
                              alt={product.name}
                              className="w-full h-24 object-contain"
                            />
                          </Link>


                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-xs line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-1">
                              Đã bán: {product.sold}/{product.stock}{" "}
                              <span className="text-green-600 font-semibold">
                                {soldPercent}%
                              </span>
                            </p>
                            <p className="text-gray-400 line-through text-[11px]">
                              {product.price_root.toLocaleString()}₫
                            </p>
                            <p className="text-red-600 font-bold text-xs">
                              {product.price_sale.toLocaleString()}₫
                            </p>
                          </div>

                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${soldPercent}%` }}
                              ></div>
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={product.qty === 0}
                              className={`w-full py-3 mt-4 rounded-2xl text-sm sm:text-base font-medium transition-colors duration-300 ${product.qty === 0
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-yellow-500"
                                }`}
                            >
                              {product.qty === 0 ? "Hết hàng" : "Thêm vào giỏ"}
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===== Laptop layout (3 cột) ===== */}
            <div className="hidden md:grid grid-cols-3 gap-4 p-4">
              {saleProducts.slice(0, 6).map((product) => {
                const percent = product.discount_percent || 0;
                const soldPercent = product.stock
                  ? Math.round((product.sold / product.stock) * 100)
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg transition bg-white"
                  >
                    <div className="relative grid grid-cols-2 gap-3 h-full">
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                        -{percent}%
                      </span>

                      <div className="flex items-center justify-center">
                        <Link to={`/product/${product.slug}`}>
                          <img
                            src={`${imageURL}/product/${product.thumbnail}`}
                            alt={product.name}
                            className="w-full h-24 object-contain"
                          />
                        </Link>
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Đã bán: {product.sold}/{product.stock}{" "}
                            <span className="text-green-600 font-semibold">
                              {soldPercent}%
                            </span>
                          </p>
                          <p className="text-gray-400 line-through text-xs">
                            {product.price_root.toLocaleString()}₫
                          </p>
                          <p className="text-red-600 font-bold text-sm">
                            {product.price_sale.toLocaleString()}₫
                          </p>
                        </div>

                        <div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${soldPercent}%` }}
                            ></div>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.qty === 0}
                            className={`w-full py-2  mt-4 rounded-2xl text-sm sm:text-base font-medium transition-colors duration-300 ${product.qty === 0
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-green-600 text-white hover:bg-yellow-500"
                              }`}
                          >
                            {product.qty === 0 ? "Hết hàng" : "Thêm vào giỏ"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Video hướng dẫn */}
        <section className="bg-gray-100 p-4 sm:p-6 rounded-2xl mt-10">
          <h2 className="text-lg sm:text-2xl font-bold mb-5">Video hướng dẫn</h2>

          {/* Scroll ngang ở mobile, grid khi desktop */}
          <div className="flex md:grid md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible scroll-smooth pb-2 scrollbar-hide rounded-lg">
            {videos.map((v, i) => (
              <div
                key={i}
                className="min-w-[60%] xs:min-w-[50%] sm:min-w-0 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-50 sm:h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
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

          {/* Nút xem tất cả */}
          <div className="text-center mt-5">
            <button
              onClick={() => navigate("/videos")}
              className="px-4 sm:px-6 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition text-xs sm:text-base"
            >
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
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 sm:px-0">
          {producsCat.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{cat.name}</h4>
                <a
                  href={`/category/${cat.slug}`}
                  className="text-emerald-700 text-xs hover:underline"
                >
                  Xem thêm »
                </a>
              </div>

              <div className="flex flex-col gap-3">
                {cat.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 border border-gray-200 p-3 rounded-xl hover:shadow-md transition bg-white relative"
                  >
                    {/* Ảnh sản phẩm */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative">
                      <Link to={`/product/${p.slug}`}>
                        <img
                          src={`${imageURL}/product/${p.thumbnail}`}
                          alt={p.name}
                          className="object-cover w-full h-full rounded-lg"
                        />


                      </Link>
                      {/* Góc hiển thị % giảm giá */}
                      {p.discount_percent > 0 && (
                        <div className="absolute top-0 left-0 bg-rose-500 text-white text-xs sm:text-sm font-semibold px-1 rounded-tr-lg rounded-bl-lg shadow-md">
                          -{p.discount_percent}%
                        </div>
                      )}
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="flex-1">
                      <p className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                        {p.name}
                      </p>
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <span className="text-rose-600 font-bold">
                          {p.price_sale.toLocaleString()}₫
                        </span>
                        <span className="text-gray-400 line-through text-xs sm:text-sm">
                          {p.price_root.toLocaleString()}₫
                        </span>
                      </div>
                    </div>
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
              {Brands.length > 0 ? (
                Brands.map((brand, i) => (
                  <div
                    key={i}
                    className="h-10 sm:h-12 rounded-md border flex items-center justify-center text-xs sm:text-sm text-gray-600 bg-gray-50"
                  >
                    {brand.name}
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
