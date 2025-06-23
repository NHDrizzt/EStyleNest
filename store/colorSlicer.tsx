import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedColorState {
  [productId: string]: string;
}

const initialState: SelectedColorState = {};

export const selectedColorSlice = createSlice({
  name: "selectedColor",
  initialState,
  reducers: {
    setSelectedColor: (
      state,
      action: PayloadAction<{ productId: string; color: string }>,
    ) => {
      const { productId, color } = action.payload;
      state[productId] = color;
    },
    clearSelectedColor: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    clearAllSelectedColors: (state) => {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    },
  },
});

export const { setSelectedColor, clearSelectedColor, clearAllSelectedColors } =
  selectedColorSlice.actions;
export default selectedColorSlice.reducer;
