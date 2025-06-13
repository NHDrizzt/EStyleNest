import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlicer";
import selectedColorReducer from "@/store/colorSlicer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      selectedColor: selectedColorReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
