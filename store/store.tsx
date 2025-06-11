import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlicer";
import { persistReducer, persistStore } from "redux-persist";
import selectedColorReducer from "@/store/colorSlicer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "items",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: persistedReducer,
      selectedColor: selectedColorReducer,
    },
  });
};

const persistor = persistStore(makeStore());
export { persistor };

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
