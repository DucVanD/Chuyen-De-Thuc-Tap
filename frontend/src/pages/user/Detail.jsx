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
import apiProduct from "../../api/apiProduct";

const Detail = () => {
  const { slug } = useParams(); // lấy slug từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {


        const res = await apiProduct.getProductBySlug(slug); // gọi API
        console.log("du lieu api",res);
        if (res.status) {
          setProduct(res.data); // backend trả về {status, message, data}
        } else {
          setError("Không tìm thấy sản phẩm.");
        }
      } catch (err) {
        setError("Lỗi khi lấy thông tin sản phẩm.");
        console.error(err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb đơn giản */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-green-600">
            Trang chủ
          </a>
          <span className="mx-2">/</span>
          <a href="/collections/all" className="hover:text-green-600">
            Tất cả sản phẩm
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-semibold">Thịt vai</span>
        </nav>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ảnh sản phẩm */}
        <div className="space-y-3">
          <div className="rounded-xl overflow-hidden border  justify-center flex border-gray-300">
            <img
              src={`${imageURL}/product/${product.thumbnail}`}
              alt={product.name}
              className="object-cover"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500 mb-1">
            Thương hiệu:{" "}
            <span className="text-green-600">{product.brand?.name || "Đang cập nhật"}</span>{" "}
            | Tình trạng:{" "}
            <span className="text-green-600">
              {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>

          {/* Giá */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl font-bold text-red-600">
              {product.price.toLocaleString()}₫
            </span>
            {product.old_price && (
              <>
                <span className="text-gray-400 line-through">
                  {product.old_price.toLocaleString()}₫
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4">{product.description}</p>

          {/* Số lượng + nút */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button className="px-3 py-2 hover:bg-gray-100">−</button>
              <input
                type="number"
                className="w-16 text-center border-x py-2"
                defaultValue={1}
              />
              <button className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Thêm vào giỏ
            </button>
          </div>

          <p className="text-sm text-gray-500">
            <i className="fa-solid fa-shield-halved text-green-600 mr-2"></i>
            Cam kết hàng tươi 100%
          </p>
        </div>
      </div>


        {/* Mã giảm giá */}
        <div className="bg-green-50 rounded-xl p-4 my-8">
          <h3 className="font-semibold mb-3">MÃ GIẢM GIÁ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["BEAN50", "FREESHIP", "SALE20", "COMBO5"].map((code) => (
              <div
                key={code}
                className="border border-green-500 rounded-lg p-3 text-center hover:bg-green-100 cursor-pointer"
              >
                <p className="font-bold text-green-600">{code}</p>
                <p className="text-xs text-gray-500">Sao chép</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Mô tả / Hướng dẫn / Đánh giá */}
        <div className="border-b flex gap-8 mb-4">
          <button className="pb-2 border-b-2 border-green-600 font-semibold text-green-600">
            Mô tả sản phẩm
          </button>
          <button className="pb-2 hover:text-green-600">
            Hướng dẫn mua hàng
          </button>
          <button className="pb-2 hover:text-green-600">Đánh giá</button>
        </div>

        {/* Nội dung mô tả */}
        <div className="text-gray-700 leading-relaxed">
          <p>
            {product.detail}
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Xuất xứ: Việt Nam</li>
            <li>Đóng gói: Hút chân không</li>
            <li>Hạn sử dụng: 3 ngày kể từ ngày sản xuất</li>
          </ul>
        </div>

        {/* Sản phẩm liên quan */}
        <h2 className="text-xl font-bold mt-10 mb-4">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white shadow rounded-lg p-3 hover:shadow-lg transition"
            >
              <img
                src={`/assets/images/sp-${i}.jpg`}
                alt="Sản phẩm"
                className="w-full h-36 object-cover rounded mb-3"
              />
              <p className="font-semibold mb-1">Tên sản phẩm {i}</p>
              <p className="text-red-600 font-bold">99.000₫</p>
              <button className="bg-green-600 text-white w-full py-2 rounded-lg mt-2 hover:bg-green-700">
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>

        {/* Sản phẩm đã xem */}
        <h2 className="text-xl font-bold mt-10 mb-4">Sản phẩm đã xem</h2>
        <div className="bg-gray-50 rounded-xl p-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg shadow p-3">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -17%
              </span>
              <img
                src="/assets/images/cha-muc.jpg"
                alt="Chả mực"
                className="w-full h-28 object-cover rounded mt-2 mb-3"
              />
              <p className="text-gray-700 mb-1">Chả mực</p>
              <div className="text-sm">
                <p className="line-through text-gray-400">420.000₫</p>
                <p className="text-red-600 font-bold">350.000₫</p>
              </div>
              <button className="bg-green-600 text-white w-full py-1 rounded-lg mt-2 hover:bg-green-700">
                Thêm vào giỏ
              </button>
            </div>
          </div>
          {/* Nút điều hướng */}
          <button className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            ‹
          </button>
          <button className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            ›
          </button>
        </div>

        {/* Chính sách hỗ trợ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            {
              icon: <FaTruck className="text-green-600 text-2xl" />,
              text: "Vận chuyển miễn phí",
              sub: "Hóa đơn trên 5 triệu",
            },
            {
              icon: <FaUndoAlt className="text-green-600 text-2xl" />,
              text: "Đổi trả miễn phí",
              sub: "Trong vòng 7 ngày",
            },
            {
              icon: <FaMoneyBillWave className="text-green-600 text-2xl" />,
              text: "100% Hoàn tiền",
              sub: "Nếu sản phẩm lỗi",
            },
            {
              icon: <FaHeadset className="text-green-600 text-2xl" />,
              text: "Hotline: 1900 6750",
              sub: "Hỗ trợ 24/7",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:shadow-md transition"
            >
              {item.icon}
              <div>
                <p className="font-semibold">{item.text}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail;
