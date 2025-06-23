import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  setSelectedColor,
  clearSelectedColor,
  clearAllSelectedColors,
} from "@/store/colorSlicer";

export const useColorSelection = (productId: number | string) => {
  const dispatch = useAppDispatch();
  const selectedColors = useAppSelector((state) => state.selectedColor);
  const productIdStr =
    typeof productId === "number" ? productId.toString() : productId;

  const currentColor = selectedColors[productIdStr];

  const toggleColor = (color: string) => {
    dispatch(setSelectedColor({ productId: productIdStr, color }));
  };

  const clearColorSelection = () => {
    dispatch(clearAllSelectedColors());
  };

  return {
    currentColor,
    toggleColor,
    clearColorSelection,
    isSelected: (color: string) => currentColor === color,
  };
};
