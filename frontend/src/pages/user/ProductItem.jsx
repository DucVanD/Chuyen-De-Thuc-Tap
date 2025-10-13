import { imageURL } from "../../api/config";
import { Link } from "react-router-dom";
import useAddToCart from "../../hooks/useAddToCart";
import "react-toastify/dist/ReactToastify.css";

function ProductItem({ product }) {
  const handleAddToCart = useAddToCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full p-3 sm:p-4">
      {/* Ảnh sản phẩm */}
      <div className="overflow-hidden rounded-xl relative group">
        <Link to={`/product/${product.slug}`}>
          <img
            src={
              product.thumbnail
                ? `${imageURL}/product/${product.thumbnail}`
                : "/assets/images/no-image.png"
            }
            alt={product.name}
            className="w-full h-[160px] sm:h-[200px] lg:h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i className="fa-solid fa-eye text-white text-xl sm:text-2xl"></i>
          </div>
        </Link>

        {/* Góc hiển thị % giảm giá */}
        {product.discount_percent > 0 && (
          <div className="absolute top-2 left-2 bg-rose-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-tr-lg rounded-bl-lg shadow-md">
            -{product.discount_percent}%
          </div>
        )}
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-grow py-3">
        {/* Tên sản phẩm */}
        <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium line-clamp-2 text-gray-800">
          {product.name}
        </p>

        {/* Giá */}
        <div className="flex justify-between items-start mt-3">
          <div className="flex flex-col gap-1">
            {product.price_sale && product.price_sale > 0 ? (
              <>
                <p className="text-red-600 font-semibold text-[15px] sm:text-[16px]">
                  {product.price_sale?.toLocaleString()}₫
                </p>
                <p className="text-gray-500 text-xs sm:text-sm line-through">
                  {product.price_root?.toLocaleString()}₫
                </p>
              </>
            ) : (
              <p className="text-red-600 font-semibold text-[15px] sm:text-[16px]">
                {product.price_root?.toLocaleString()}₫
              </p>
            )}
          </div>
        </div>

        {/* Nút thêm giỏ hàng */}
        <button
          onClick={() => handleAddToCart(product)}
          disabled={product.qty === 0}
          className={`w-full py-2.5 sm:py-3 mt-4 rounded-2xl text-sm sm:text-base font-medium transition-colors duration-300 ${product.qty === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-yellow-500"
            }`}
        >
          {product.qty === 0 ? "Hết hàng" : "Thêm vào giỏ"}
        </button>

      </div>
    </div>

  );
}

export default ProductItem;
