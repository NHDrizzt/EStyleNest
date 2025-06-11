"use client";
import React from "react";
import { useAppSelector } from "@/hooks/storeHooks";
import ShoppingCart from "@/components/Cart/ShoppingCart";
import EmptyShoppingCart from "@/components/Cart/EmptyShoppingCart";

const Page = () => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <div>
      {cart.items && cart.items.length > 0 ? (
        <ShoppingCart cart={cart} />
      ) : (
        <EmptyShoppingCart />
      )}
    </div>
  );
};

export default Page;
