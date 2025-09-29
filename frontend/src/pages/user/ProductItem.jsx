import { imageURL } from "../../api/config";
import { Link } from "react-router-dom";
// import { imageURL } from "../../api/config";


function ProductItem({ product}) {
     const addToCart = (productId) => {
    console.log("🛒 Đã thêm sản phẩm vào giỏ:", productId);
    // TODO: gọi API hoặc dispatch Redux để thêm sản phẩm vào giỏ
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-3 flex flex-col h-full">
      {/* Ảnh sản phẩm */}
      <div className="overflow-hidden rounded-t-2xl relative group">
        <Link to={`/product-detail/${product.slug}`}>
          <img
            src={
              product.thumbnail
                ? `${imageURL}/product/${product.thumbnail}`
                : "/assets/images/no-image.png"
            }
            alt={product.name}
            className="w-full transition-transform duration-300 group-hover:scale-105 h-[170px]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i className="fa-solid fa-eye text-white text-2xl"></i>
          </div>
        </Link>
      </div>

      {/* Nội dung sản phẩm */}
      <div className="flex flex-col justify-between flex-grow py-3 px-2">
        <p className="text-[15px] flex-grow">{product.name}</p>

        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1">
            {product.price_sale && product.price_sale > 0 ? (
              <>
                <p className="text-red-600 font-bold">
                  {product.price_sale?.toLocaleString() || 0}
                  <sup>₫</sup>
                </p>
                <p className="text-gray-500 text-sm line-through">
                  {product.price_root?.toLocaleString() || 0}
                  <sup>₫</sup>
                </p>
              </>
            ) : (
              <p className="text-red-600 font-bold">
                {product.price_root?.toLocaleString() || 0}
                <sup>₫</sup>
              </p>
            )}
          </div>
        </div>

        {addToCart && (
          <button
            // onClick={() => addToCart(product.id)}
            className="bg-green-600 text-white px-4 py-2 rounded-2xl mt-2 hover:bg-yellow-500"
          >
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
