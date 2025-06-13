import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { CartState, Coupon } from "@/types/cart";

const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("cartState");
    return saved ? JSON.parse(saved) : { items: [] };
  }
  return { items: [] };
};

const initialState: CartState = getInitialState();

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
      if (state.items.length === 0) {
        state.appliedCoupon = null;
      }
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
      state.appliedCoupon = null;
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
    applyCoupon: (state, action: PayloadAction<Coupon>) => {
      state.appliedCoupon = action.payload;
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
    },
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
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
  setCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
