import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.items.find((item) => item.id === product.id);

      if (exist) {
        // ✅ Kiểm tra tồn kho trước khi cộng thêm
        const newQty = exist.qty + product.qty;
        if (newQty > product.product_qty) {
          exist.qty = product.product_qty; // Giới hạn tối đa bằng tồn kho
          toast.warning(
            `⚠️ Chỉ còn ${product.product_qty} sản phẩm trong kho!`,
            { position: "top-right", autoClose: 1500 }
          );
        } else {
          exist.qty = newQty;
        }
      } else {
        // ✅ Nếu là sản phẩm mới, thêm vào với giới hạn tồn kho
        const addedQty =
          product.qty > product.product_qty
            ? product.product_qty
            : product.qty;

        state.items.push({ ...product, qty: addedQty });

        if (product.qty > product.product_qty) {
          toast.warning(
            `⚠️ Chỉ có ${product.product_qty} sản phẩm trong kho!`,
            { position: "top-right", autoClose: 1500 }
          );
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && qty >= 1) {
        // ✅ Giới hạn không vượt tồn kho
        item.qty = Math.min(qty, item.product_qty);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
