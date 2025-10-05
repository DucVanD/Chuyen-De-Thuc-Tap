
import { createSlice } from "@reduxjs/toolkit";

// Load giỏ hàng từ localStorage nếu có
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
        exist.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
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
        item.qty = qty;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [], // [{id, name, price_root, price_sale, qty, thumbnail}]
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const product = action.payload;
//       const exist = state.items.find((item) => item.id === product.id);
//       if (exist) {
//         exist.qty += 1;
//       } else {
//         state.items.push({ ...product, qty: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     updateQuantity: (state, action) => {
//       const { id, qty } = action.payload;
//       const item = state.items.find((i) => i.id === id);
//       if (item && qty >= 1) {
//         item.qty = qty;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
