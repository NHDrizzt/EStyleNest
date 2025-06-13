import { configureStore, Middleware } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlicer";
import selectedColorReducer from "@/store/colorSlicer";
import { throttle } from "lodash";
import { loadState, saveState } from "@/utils/localStorage";

const preloadedState = {
  cart: loadState()?.cart,
};

const localStorageSync: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const cartActions = [
    "cart/addItem",
    "cart/removeItem",
    "cart/updateQuantity",
    "cart/clearCart",
    "cart/updatePrice",
    "cart/updateTotalPrice",
  ];

  if (cartActions.includes(action.type)) {
    saveState(store.getState());
  }

  return result;
};

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      selectedColor: selectedColorReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageSync),
    preloadedState,
  });

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000),
  );

  return store;
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
