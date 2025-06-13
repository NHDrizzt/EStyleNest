import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { CartState } from "@/types/cart";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        product: Product;
        variant: string;
        quantity: number;
        size?: string;
        price: number;
        discount?: number;
      }>,
    ) => {
      const { product, variant, size, price, quantity, discount } =
        action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.product.product_id === product.product_id &&
          item.variant === variant,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: `${product.product_id}_${variant}`,
          product,
          quantity,
          variant,
          size,
          price,
          discount,
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(action.payload.quantity, 1);
      }
    },
    updatePrice: (
      state,
      action: PayloadAction<{ id: string; price: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.price = action.payload.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateTotalPrice: (
      state,
      action: PayloadAction<{ id: string; price: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.totalPrice = action.payload.price;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  updatePrice,
  updateTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
