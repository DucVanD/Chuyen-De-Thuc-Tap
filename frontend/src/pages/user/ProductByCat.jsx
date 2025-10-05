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
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        {category ? category.name : "Danh mục"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-2 shadow hover:shadow-lg transition"
            >
              <img
                src={`${imageURL}/product/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-sm font-semibold">{product.name}</h3>
              <p className="text-red-600 font-bold">{product.price_root} ₫</p>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này</p>
        )}
      </div>
    </div>
  );
};

export default ProductByCat;
