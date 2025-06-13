import React from "react";
import type { CartItem as CartItemType } from "@/types/cart";
import Image from "next/image";

interface CartItemProps {
  cartItem: CartItemType;
  isLastItem: boolean;
}

const CartItem = ({ cartItem, isLastItem }: CartItemProps) => {
  const currentImage = cartItem.product.images.find(
    (img) => img.color === cartItem.variant,
  );
  return (
    <div>
      <div className={`flex justify-between gap-x-6`}>
        <div className={`max-w-[92px]`}>
          <Image
            src={currentImage?.image_url || ""}
            alt={`product image`}
            className={`rounded-lg w-[80px] object-cover h-[80px]`}
            width={80}
            height={80}
          />
        </div>
        <div className={`flex flex-1 flex-col gap-y-2`}>
          <div>
            <p className={`text-base md:text-xl font-medium text-neutral-900`}>
              {cartItem.product.name}
            </p>
          </div>
          <div className={`flex`}>
            <p
              className={`text-base font-medium text-neutral-600 capitalize flex gap-x-1 items-center`}
            >
              {cartItem.variant}{" "}
              {cartItem.size && (
                <span className={`capitalize`}>• {cartItem.size}</span>
              )}
            </p>
          </div>
          <div>
            <p className={`text-base font-medium text-neutral-600`}>
              Quantity: {cartItem.quantity}
            </p>
          </div>
        </div>
        <div>
          <p className={`text-lg font-semibold text-neutral-900`}>
            ${cartItem.totalPrice?.toFixed(2)}
          </p>
          {cartItem.discount && cartItem.discount > 0 ? (
            <p className={`text-lg font-normal text-neutral-600 line-through`}>
              ${(cartItem.price * cartItem.quantity).toFixed(2)}
            </p>
          ) : null}
        </div>
      </div>
      <div
        className={`h-[1px] ${isLastItem ? "border-solid" : "border-dashed"}  border border-neutral-200 my-8`}
      />
    </div>
  );
};

export default CartItem;
