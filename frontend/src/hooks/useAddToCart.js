import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { toast } from "react-toastify";

export default function useAddToCart() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (product.qty === 0) {
      toast.info("Sản phẩm đang cập nhật!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    dispatch(
      addToCart({
        ...product,
        qty: 1,
        product_qty: product.qty,
      })
    );

    toast.success(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`, {
      position: "top-right",
      autoClose: 1500,
    });
  };

  return handleAddToCart;
}

