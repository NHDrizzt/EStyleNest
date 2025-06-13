"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { loadState } from "@/utils/localStorage";
import { setCart } from "@/store/cartSlicer";

export const useCartPersist = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedCart = loadState();
    if (savedCart) {
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);
};
