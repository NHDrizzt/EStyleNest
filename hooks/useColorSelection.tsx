import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { setSelectedColor, clearSelectedColor } from "@/store/colorSlicer";

export const useColorSelection = (productId: number | string) => {
  const dispatch = useAppDispatch();
  const selectedColors = useAppSelector((state) => state.selectedColor);
  const productIdStr =
    typeof productId === "number" ? productId.toString() : productId;

  const currentColor = selectedColors[productIdStr];

  const toggleColor = (color: string) => {
    if (currentColor === color) {
      dispatch(clearSelectedColor(productIdStr));
    } else {
      dispatch(setSelectedColor({ productId: productIdStr, color }));
    }
  };

  return {
    currentColor,
    toggleColor,
    isSelected: (color: string) => currentColor === color,
  };
};
