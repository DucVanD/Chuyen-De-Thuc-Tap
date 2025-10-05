import {
  FaSortAmountDownAlt,
  FaTruck,
  FaUndoAlt,
  FaMoneyBillWave,
  FaHeadset,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import apiProduct from "../../api/apiProduct";
import ProductItem from "./ProductItem";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const keyword = searchParams.get("keyword");
const categorySlug = location.state?.categorySlug || searchParams.get("category");
const categoryName = location.state?.categoryName || "";

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let resData;

      if (keyword) {
        resData = await apiProduct.search(keyword);
      } else if (categorySlug) {
        resData = await apiProduct.getByCategorySlug(categorySlug);
      } else {
        resData = await apiProduct.getAll();
      }

      console.log("API Response:", resData);

      // Trường hợp API trả dạng { status: true, data: [...] }
      if (resData.status) {
        setProducts(resData.data);
      }
      // Trường hợp chỉ trả về mảng (backend không bọc status)
      else if (Array.isArray(resData)) {
        setProducts(resData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, [keyword, categorySlug]);


  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const categories = [
    "Rau củ quả",
    "Trái cây",
    "Thịt và hải sản",
    "Đồ khô",
    "Thức uống",
    "Sản phẩm chế biến",
  ];
  const priceFilters = [
    "Dưới 100.000đ",
    "100.000đ - 200.000đ",
    "200.000đ - 300.000đ",
    "300.000đ - 500.000đ",
    "500.000đ - 1 triệu",
    "1 triệu - 2 triệu",
  ];
  const types = ["Nấm các loại", "Thịt gà"];
  const brands = ["Brand A", "Brand B"];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile toggle */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h1 className="text-xl font-bold">Sản phẩm</h1>
          <button
            onClick={toggleSidebar}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Bộ lọc
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <aside
            className={`bg-white rounded-2xl shadow p-4 md:col-span-3 md:block ${
              showSidebar ? "block" : "hidden"
            } md:w-1/4`}
          >
            <h2 className="font-bold text-green-700 mb-3">DANH MỤC SẢN PHẨM</h2>
            <ul className="space-y-2">
              {categories.map((c, i) => (
                <li
                  key={i}
                  className="flex justify-between hover:text-green-600 cursor-pointer"
                >
                  <span>{c}</span> <span>+</span>
                </li>
              ))}
            </ul>

            {/* Bộ lọc */}
            <div className="mt-6">
              <h2 className="font-bold text-green-700 mb-3">BỘ LỌC SẢN PHẨM</h2>

              <h3 className="font-semibold">Chọn mức giá</h3>
              <div className="flex flex-col gap-1 mt-2 text-sm">
                {priceFilters.map((p, i) => (
                  <label key={i}>
                    <input type="checkbox" className="accent-green-600" /> {p}
                  </label>
                ))}
              </div>

              <h3 className="font-semibold mt-4">Loại</h3>
              <div className="flex flex-col gap-1 mt-2 text-sm">
                {types.map((t, i) => (
                  <label key={i}>
                    <input type="checkbox" className="accent-green-600" /> {t}
                  </label>
                ))}
              </div>

              <h3 className="font-semibold mt-4 uppercase">Thương hiệu</h3>
              <div className="flex flex-col gap-1 mt-2 text-sm">
                {brands.map((b, i) => (
                  <label key={i}>
                    <input type="checkbox" className="accent-green-600" /> {b}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product list */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-4 bg-gray-200 p-3 rounded-2xl">
              <h1 className="text-xl font-bold">
                {keyword
                  ? `KẾT QUẢ TÌM KIẾM: "${keyword}"`
                  : categorySlug
                  ? categoryName || "Danh mục sản phẩm"
                  : "TẤT CẢ SẢN PHẨM"}
              </h1>

              <div className="flex items-center gap-2 text-gray-600">
                <FaSortAmountDownAlt />
                <select className="border rounded px-2 py-1">
                  <option>Mặc định</option>
                  <option>Giá tăng dần</option>
                  <option>Giá giảm dần</option>
                </select>
              </div>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Đang tải...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                ) : (
                  <p className="col-span-4 text-center text-gray-500">
                    Không có sản phẩm nào
                  </p>
                )}
              </div>
            )}

            {/* Pagination demo */}
            <div className="flex justify-center mt-8 space-x-3">
              <button className="px-3 py-1 border rounded">«</button>
              <button className="px-3 py-1 border rounded bg-gray-200">
                1
              </button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">»</button>
            </div>
          </main>
        </div>

        {/* Section dịch vụ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
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

export default Products;
