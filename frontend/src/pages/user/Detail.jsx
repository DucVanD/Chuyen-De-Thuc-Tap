import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../api/config";
import {
  FaTruck,
  FaUndoAlt,
  FaMoneyBillWave,
  FaHeadset,
  FaStar,
  FaHeart,
  FaShareAlt,
  FaCopy,
} from "react-icons/fa";
import { useState, useEffect } from "react";
// Assuming apiProduct is defined elsewhere
import apiProduct from "../../api/apiProduct"; // Keep if you need the real API
import useAddToCart from "../../hooks/useAddToCart";
import "react-toastify/dist/ReactToastify.css";
import ProductItem from "./ProductItem";

const Detail = () => {
  const { slug } = useParams(); // lấy slug từ URL
  const [product, setProduct] = useState(null); // Changed to use DUMMY_PRODUCT
  const [loading, setLoading] = useState(false); // Set to false since we use dummy data
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const handleAddToCart = useAddToCart();
  // Simulate API fetch. You should uncomment and use your real API call.
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await apiProduct.getProductBySlug(slug);
        console.log("du lieu api", res); // xem console thật trong trình duyệt

        if (res.status && res.data) {
          setProduct(res.data); // ✅ chính xác

          // ✅ Gọi sản phẩm liên quan khi có category_id
          if (res.data.category_id) {
            const related = await apiProduct.getRelatedProducts(res.data.category_id);
            if (related.status && related.data) {
              setRelatedProducts(related.data);
            }
          }
        } else {
          setError("Không tìm thấy sản phẩm.");
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi khi lấy thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);





  // console.log("Product Details:", product);
  // Quantity handlers
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };
  const handleQuantityInput = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(Math.max(1, value || 1));
  };

  if (loading) {
    return <div className="text-center py-20">Đang tải...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 text-red-500">
        {error || "Sản phẩm không tồn tại."}
      </div>
    );
  }

  // Helper for discount calculation

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb đơn giản */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/collections/all" className="hover:text-green-600">
            {product.category_name || "Danh mục"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Ảnh sản phẩm (Left Column) */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white p-5">
              {/* Discount Tag */}
              {product.discount_percent > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full z-10">
                  -{product.discount_percent}%
                </div>
              )}


              {/* Main Image - Adjusted to better fit the layout */}
              <div className="flex justify-center items-center h-auto">
                <div className="aspect-square w-[250px] sm:w-[300px] lg:w-[400px]">
                  <img
                    src={`${imageURL}/product/${product.thumbnail}`}
                    alt={product.name}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Thông tin sản phẩm (Right Column) */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Brand and Stock Status (Matching image layout) */}
            <p className="text-base text-gray-600 mb-4">
              Thương hiệu:{" "}
              <span className="text-green-600 font-semibold">
                {product.brand_name || "Đang cập nhật"}
              </span>{" "}
              | Tình trạng:{" "}
              <span
                className={`font-semibold ${product.qty > 0 ? "text-green-600" : "text-red-500"
                  }`}
              >
                {product.qty > 0 ? "Còn hàng" : "Hết hàng"}
              </span>
              <span className="text-gray-500 text-sm ml-4">
                | Mã SKU: Đang cập nhật
              </span>
            </p>

            <hr className="my-4" />

            {/* Price Block (Matching image layout) */}
            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                {/* Nếu có giảm giá */}
                {product.price_sale > 0 && product.price_sale < product.price_root ? (
                  <>
                    <span className="text-4xl font-bold text-red-600">
                      {product.price_sale.toLocaleString("vi-VN")}₫
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {product.price_root.toLocaleString("vi-VN")}₫
                    </span>
                  </>
                ) : (
                  // Không có giảm giá
                  <span className="text-4xl font-bold text-red-600">
                    {product.price_root.toLocaleString("vi-VN")}₫
                  </span>
                )}
              </div>

              {/* Phần "tiết kiệm" */}
              {product.price_sale > 0 && product.price_sale < product.price_root && (
                <p className="text-sm text-gray-600 mt-1">
                  Tiết kiệm{" "}
                  <span className="font-bold text-red-600">
                    {(product.price_root - product.price_sale).toLocaleString("vi-VN")}₫
                  </span>{" "}
                  so với giá thị trường
                </p>
              )}
            </div>


            {/* Views Count */}
            <p className="text-sm text-gray-500 mb-4 flex items-center">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="font-semibold text-gray-700 mr-2">4.5</span>
              (27 người xem sản phẩm này)
            </p>

            {/* Usage/Instruction Box (New section from image) */}
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-sm mb-6">
              <p className="font-semibold mb-2">Mô tả:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>{product.description}.</li>
                
              </ul>
              <button className="text-green-600 text-sm mt-3 flex items-center hover:text-green-700">
                <i className="fa-solid fa-store mr-2"></i>
                Tìm cửa hàng gần bạn nhất
              </button>
            </div>

            {/* Quantity + Add to Cart + Actions (Combined and Styled) */}

            <div className="flex items-center gap-4 mb-6">
              {/* Bộ chọn số lượng */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-3 text-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  −
                </button>

                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityInput}
                  className="w-16 text-center border-x border-gray-300 py-3 text-lg font-semibold focus:outline-none"
                  min="1"
                />

                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-3 text-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              {/* Nút thêm giỏ hàng */}
              <button
                onClick={() => handleAddToCart(product, quantity)} // ✅ truyền quantity
                disabled={product.qty === 0}
                className={`flex-grow text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition ${product.qty === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
                <i className="fa-solid fa-cart-shopping mr-2"></i>
                {product.qty === 0 ? "Hết hàng" : "THÊM VÀO GIỎ"}
              </button>

              {/* Nút yêu thích + chia sẻ */}
              <button className="border border-gray-300 text-gray-600 p-3 rounded-lg hover:bg-gray-100 transition">
                <FaHeart className="text-red-500 text-xl" />
              </button>
              <button className="border border-gray-300 text-gray-600 p-3 rounded-lg hover:bg-gray-100 transition">
                <FaShareAlt className="text-xl" />
              </button>
            </div>

            {/* Guarantee/Policy (Matching image layout) */}
            <div className="flex justify-between items-center text-sm text-gray-600 border-t border-b py-3 mb-6">
              <div className="flex items-center">
                <i className="fa-solid fa-truck text-green-600 mr-2"></i>
                Miễn phí vận chuyển tại TPHCM
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-shield-halved text-green-600 mr-2"></i>
                Bảo hành chính hãng toàn quốc
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-check text-green-600 mr-2"></i>
                Cam kết chất lượng 100%
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-rotate-left text-green-600 mr-2"></i>
                1 đổi 1 nếu sản phẩm lỗi
              </div>
            </div>


            {/* Note/Memo Field */}
            <div className="mb-8">
              <label htmlFor="product-note" className="text-sm font-semibold text-gray-700 mb-2 block">Ghi chú:</label>
              <input
                id="product-note"
                type="text"
                placeholder="Thêm ghi chú sản phẩm"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* --- Mã giảm giá (Coupon Code Section) --- */}
        <div className="bg-green-50 rounded-xl p-6 my-10 border border-green-200">
          <h3 className="font-bold text-xl text-center text-green-800 mb-4">
            MÃ GIẢM GIÁ
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { code: "BEA50", desc: "Nhập mã BEA50 giảm 50K đơn từ 750K", type: "Lưu mã" },
              { code: "BEA15", desc: "Nhập mã BEA15 giảm 15% đơn từ 1.500.000₫", type: "Lưu mã" },
              { code: "BEAN99K", desc: "Nhập mã BEAN99K giảm ngay 99K", type: "Lưu mã" },
              { code: "FREESHIP", desc: "Nhập mã FREESHIP miễn phí vận chuyển", type: "OK" },
            ].map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white border-2 border-dashed border-green-500 rounded-lg p-4 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs text-gray-600 mb-1">{coupon.desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-extrabold text-xl text-green-600">
                      {coupon.code}
                    </p>
                    <button
                      onClick={() => navigator.clipboard.writeText(coupon.code)}
                      className={`text-sm font-bold px-3 py-1 rounded-full transition ${coupon.type === "Lưu mã"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                      {coupon.type}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* --- End Mã giảm giá --- */}

        {/* Tabs Mô tả / Hướng dẫn / Đánh giá */}
        <div className="border-b flex gap-8 mb-6 mt-12">
          <button className="pb-3 border-b-3 border-green-600 font-semibold text-green-600 text-lg">
            Mô tả sản phẩm
          </button>
          <button className="pb-3 hover:text-green-600 text-gray-700 text-lg">
            Hướng dẫn mua hàng
          </button>
          <button className="pb-3 hover:text-green-600 text-gray-700 text-lg">
            Đánh giá (0)
          </button>
        </div>

        {/* Nội dung mô tả */}
        <div className="text-gray-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: product.detail }} />

          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>Xuất xứ: Đức (Thương hiệu Rabenhorst)</li>
            <li>Đóng gói: Chai thủy tinh 750ml</li>
            <li>Bảo quản: Nơi khô ráo, thoáng mát</li>
            <li>Hạn sử dụng: In trên bao bì</li>
          </ul>
        </div>

        {/* Sản phẩm liên quan - Using original component's related products */}
        <h2 className="text-2xl font-bold mt-12 mb-5 text-gray-800">
          Sản phẩm liên quan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <ProductItem key={item.id} product={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Không có sản phẩm liên quan.
            </p>
          )}
        </div>



        {/* --- Chính sách hỗ trợ (Retained and slightly improved) --- */}
        <h2 className="text-2xl font-bold mt-12 mb-5 text-gray-800">
          Chính sách hỗ trợ
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <FaTruck className="text-green-600 text-3xl" />,
              text: "Vận chuyển miễn phí",
              sub: "Hóa đơn trên 1.000.000₫", // Changed for a more realistic condition
            },
            {
              icon: <FaUndoAlt className="text-green-600 text-3xl" />,
              text: "Đổi trả miễn phí",
              sub: "Trong vòng 7 ngày",
            },
            {
              icon: <FaMoneyBillWave className="text-green-600 text-3xl" />,
              text: "100% Hoàn tiền",
              sub: "Nếu sản phẩm lỗi",
            },
            {
              icon: <FaHeadset className="text-green-600 text-3xl" />,
              text: "Hotline: 1900 6750",
              sub: "Hỗ trợ 24/7",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition"
            >
              {item.icon}
              <div>
                <p className="font-bold text-gray-800">{item.text}</p>
                <p className="text-sm text-gray-600 mt-1">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail;