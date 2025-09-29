import { FaSortAmountDownAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiCategory from "../../api/apiCategory";
import apiProduct from "../../api/apiProduct";
import ProductItem from "./ProductItem";
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
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiProduct.getAll();
        if (res.data.status) {
          console.log(res.data.data);
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4  lg:px-20">
        {/* Sidebar */}
        <aside className="col-span-3 space-y-4">
          {/* Danh mục sản phẩm */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-bold text-green-700 mb-3">DANH MỤC SẢN PHẨM</h2>
            <ul className="space-y-2">
              <li className="flex justify-between hover:text-green-600 cursor-pointer">
                <span>Rau củ quả</span> <span>+</span>
              </li>
              <li className="flex justify-between hover:text-green-600 cursor-pointer">
                <span>Trái cây</span> <span>+</span>
              </li>
              <li className="flex justify-between hover:text-green-600 cursor-pointer">
                <span>Thịt và hải sản</span> <span>+</span>
              </li>
              <li className="flex justify-between hover:text-green-600 cursor-pointer">
                <span>Đồ khô</span> <span>+</span>
              </li>
              <li className="flex justify-between hover:text-green-600 cursor-pointer">
                <span>Thức uống</span> <span>+</span>
              </li>
              <li className="flex justify-between hover:text-green-600 cursor-pointer">
                <span>Sản phẩm chế biến</span> <span>+</span>
              </li>
            </ul>
          </div>

          {/* Bộ lọc sản phẩm */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-bold text-green-700 mb-3">BỘ LỌC SẢN PHẨM</h2>

            <h3 className="font-semibold">CHỌN MỨC GIÁ</h3>
            <div className="flex flex-col gap-1 mt-2 text-sm">
              <label>
                <input type="checkbox" className="accent-green-600" /> Dưới
                100.000đ
              </label>
              <label>
                <input type="checkbox" className="accent-green-600" /> Từ
                100.000đ - 200.000đ
              </label>
              <label>
                <input type="checkbox" className="accent-green-600" /> Từ
                200.000đ - 300.000đ
              </label>
              <label>
                <input type="checkbox" className="accent-green-600" /> Từ
                300.000đ - 500.000đ
              </label>
              <label>
                <input type="checkbox" className="accent-green-600" /> Từ
                500.000đ - 1 triệu
              </label>
              <label>
                <input type="checkbox" className="accent-green-600" /> Từ 1
                triệu - 2 triệu
              </label>
            </div>

            <h3 className="font-semibold mt-4">LOẠI</h3>
            <div className="flex flex-col gap-1 mt-2 text-sm">
              <label>
                <input type="checkbox" className="accent-green-600" /> Nấm các
                loại
              </label>
              <label>
                <input type="checkbox" className="accent-green-600" /> Thịt gà
              </label>
            </div>
            <h3 className="font-semibold mt-4 uppercase">Thương hiệu</h3>
            <div className="flex flex-col gap-1 mt-2 text-sm">
              <label>
                <input type="checkbox" className="accent-green-600" /> Nấm các
                loại
              </label>
              <label>
                <input type="checkbox" className="accent-green-600" /> Thịt gà
              </label>
            </div>
            <h3 className="font-semibold mt-4">LOẠI</h3>
            <div className="flex flex-col gap-1 mt-2 text-sm">
              <label>
                <input type="checkbox" className="accent-green-600" /> Nấm các
                loại
              </label>
              <label>
                <input type="checkbox" className="accent-green-600" /> Thịt gà
              </label>
            </div>
          </div>
        </aside>

        {/* Product list */}
        <main className="col-span-9">
          <div className="flex justify-between items-center mb-4 bg-gray-200 p-3 rounded-2xl">
            <h1 className="text-xl font-bold">TẤT CẢ SẢN PHẨM</h1>

            <div className="flex items-center gap-2 text-gray-600">
              <FaSortAmountDownAlt />
              <select className="">
                <option>Mặc định</option>
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
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

          <div className="flex justify-center mt-8 space-x-3">
            <button className="px-3 py-1 border rounded">«</button>
            <button className="px-3 py-1 border rounded bg-gray-200">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">»</button>
          </div>
        </main>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10">
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
