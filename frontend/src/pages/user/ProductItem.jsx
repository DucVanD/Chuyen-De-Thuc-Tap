import { imageURL } from "../../api/config";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-3 flex flex-col h-full">
      <div className="overflow-hidden rounded-t-2xl relative group">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.thumbnail ? `${imageURL}/product/${product.thumbnail}` : "/assets/images/no-image.png"}
            alt={product.name}
            className="w-full transition-transform duration-300 group-hover:scale-105 h-[170px]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i className="fa-solid fa-eye text-white text-2xl"></i>
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-between flex-grow py-3 px-2">
        <p className="text-[15px] flex-grow">{product.name}</p>

        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1">
            {product.price_sale && product.price_sale > 0 ? (
              <>
                <p className="text-red-600 font-bold">{product.price_sale?.toLocaleString()}₫</p>
                <p className="text-gray-500 text-sm line-through">{product.price_root?.toLocaleString()}₫</p>
              </>
            ) : (
              <p className="text-red-600 font-bold">{product.price_root?.toLocaleString()}₫</p>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-4 py-2 rounded-2xl mt-2 hover:bg-yellow-500"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
