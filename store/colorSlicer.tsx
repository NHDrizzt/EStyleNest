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
  },
});

export const { setSelectedColor, clearSelectedColor } =
  selectedColorSlice.actions;
export default selectedColorSlice.reducer;
