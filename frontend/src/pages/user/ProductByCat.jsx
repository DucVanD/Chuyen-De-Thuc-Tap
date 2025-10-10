import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiProduct from "../../api/apiProduct";
import { imageURL } from "../../api/config";

const ProductByCat = () => {
  const { slug } = useParams(); // 👈 lấy slug từ URL
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await apiProduct.getByCategorySlug(slug);
        console.log("Category Products:", res);
        if (res.status) {
          setProducts(res.data);
          setCategory(res.category);
        }
      } catch (error) {
        console.error("Lỗi khi load sản phẩm theo danh mục:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Đang tải...</p>;

  return (
    <div className="p-4 md:p-8">
  {/* Tiêu đề danh mục */}
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-700 border-b-2 border-green-200 pb-2">
    {category ? category.name : "Danh mục"}
  </h2>

  {/* Grid sản phẩm */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {products.length > 0 ? (
      products.map((product) => (
        <div
          key={product.id}
          className="border rounded-2xl p-3 shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col justify-between"
        >
          {/* Ảnh sản phẩm */}
          <div className="overflow-hidden rounded-xl mb-3">
            <img
              src={`${imageURL}/product/${product.thumbnail}`}
              alt={product.name}
              className="w-full h-40 md:h-48 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Tên và giá */}
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1 truncate">
              {product.name}
            </h3>
            <p className="text-red-600 font-bold text-sm md:text-base">
              {product.price_root.toLocaleString()} ₫
            </p>
          </div>

          {/* Nút mua */}
          <button className="mt-3 bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm font-medium py-1.5 rounded-lg w-full transition">
            Mua ngay
          </button>
        </div>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">
        Không có sản phẩm nào trong danh mục này
      </p>
    )}
  </div>
</div>

  );
};

export default ProductByCat;
