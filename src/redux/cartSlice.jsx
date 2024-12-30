// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cartItems")) || [],
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        // Jika produk sudah ada, update quantity
        state[existingProductIndex].quantity += action.payload.quantity;
      } else {
        // Jika produk belum ada, tambahkan produk baru
        state.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const productIndex = state.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        state[productIndex].quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    checkoutCart: (state) => {
      localStorage.removeItem("cartItems");
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, checkoutCart } =
  cartSlice.actions;
export default cartSlice.reducer;
