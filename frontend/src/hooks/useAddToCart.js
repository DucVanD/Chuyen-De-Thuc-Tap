import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { toast } from "react-toastify";

export default function useAddToCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product, quantity = 1) => {
    // Kiểm tra nếu sản phẩm không có tồn kho
    if (!product.qty || product.qty <= 0) {
      toast.info("Sản phẩm tạm hết hàng!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    // Tìm sản phẩm trong giỏ hàng (nếu đã có)
    const existingItem = cartItems.find((item) => item.id === product.id);
    const currentQty = existingItem ? existingItem.qty : 0;

    // Nếu tổng > tồn kho → cảnh báo
    if (currentQty + quantity > product.qty) {
      toast.warn(`Chỉ còn ${product.qty} sản phẩm trong kho!`, {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    // Nếu hợp lệ → thêm vào giỏ
    dispatch(
      addToCart({
        ...product,
        qty: quantity,
        product_qty: product.qty, // ✅ dùng đúng tên và giá trị tồn kho
      })
    );

    toast.success(`🛒 Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`, {
      position: "top-right",
      autoClose: 1500,
    });
  };

  return handleAddToCart;
}
