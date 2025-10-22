import { imageURL } from "../../api/config";
import { Link } from "react-router-dom";
import useAddToCart from "../../hooks/useAddToCart";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";

function ProductItem({ product }) {
  const handleAddToCart = useAddToCart();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-100 p-3 sm:p-4">
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
            className="w-full h-[160px] sm:h-[190px] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* Lớp phủ khi hover */}
          <div className="absolute inset-0 flex items-center justify-center  group-hover:opacity-100 transition-opacity duration-300">
            {/* <FaEye className="text-white text-xl sm:text-2xl drop-shadow-md opacity-50" /> */}
{/* bg-black/10 opacity-0 */}

          </div>
        </Link>

        {/* Góc hiển thị % giảm giá */}
        {product.discount_percent > 0 && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] sm:text-xs font-bold px-1.5 py-0.5 rounded-tr-lg rounded-bl-lg shadow">
            -{product.discount_percent}%
          </div>
        )}
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-grow py-2">
        {/* Tên sản phẩm */}
        <Link
          to={`/product/${product.slug}`}
          className="text-[14px] sm:text-[15px] font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-green-700 transition-colors"
        >
          {product.name}
        </Link>

        {/* Giá */}
        <div className="mt-2">
          {product.price_sale && product.price_sale > 0 ? (
            <>
              <p className="text-red-500 font-semibold text-[15px] sm:text-[16px]">
                {product.price_sale?.toLocaleString()}₫
              </p>
              <p className="text-gray-400 text-xs line-through">
                {product.price_root?.toLocaleString()}₫
              </p>
            </>
          ) : (
            <p className="text-red-500 font-semibold text-[15px] sm:text-[16px]">
              {product.price_root?.toLocaleString()}₫
            </p>
          )}
        </div>

        {/* Nút thêm giỏ hàng */}
        <button
          onClick={() => handleAddToCart(product)}
          disabled={product.qty === 0}
          className={`w-full py-2 mt-3 rounded-xl text-sm font-medium shadow transition-all duration-300 ${product.qty === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-yellow-500 text-white hover:from-green-500 hover:to-yellow-400 hover:shadow-lg"
            }`}
        >
          {product.qty === 0 ? "Hết hàng" : "Thêm vào giỏ"}
        </button>
      </div>
    </div>



  );
}

export default ProductItem;
