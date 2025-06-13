"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/storeHooks";
import CartItem from "@/components/Checkout/CartItem";
import Image from "next/image";
import { toast } from "react-toastify";

const OrderSummary = ({
  isOrderSuccess,
  watch,
  isSubmitting,
}: {
  isOrderSuccess: boolean;
  watch: any;
  isSubmitting?: boolean;
}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const shippingMethod = watch("shippingMethod");
  const shippingCost = shippingMethod === "standard" ? 0 : 15.0;
  const cart = useAppSelector((state) => state.cart);
  const cartTotalValue = cart.items.reduce((total, item) => {
    if (!item.totalPrice) {
      return total;
    }
    return total + item.totalPrice;
  }, 0);

  useEffect(() => {
    console.log(isSubmitting);
  }, [isSubmitting]);

  return (
    <div className="flex-1 sticky top-4 h-fit">
      <div
        className={`${!isOrderSuccess ? " border border-neutral-200 p-6" : ""} rounded-lg  space-y-8`}
      >
        <div className={`space-y-8 `}>
          <div className="">
            <p className="text-2xl font-semibold text-neutral-900">
              Order Summary
            </p>
          </div>

          <div>
            {cart.items.map((item) => {
              const isLastItem =
                cart.items.indexOf(item) === cart.items.length - 1;
              return (
                <CartItem
                  key={item.id}
                  cartItem={item}
                  isLastItem={isLastItem}
                />
              );
            })}
          </div>

          <div className={`space-y-4 overflow-y-auto flex-1 h-full`}>
            <div className={`flex justify-between`}>
              <p className={`text-base font-normal text-neutral-600`}>
                Subtotal
              </p>
              <p className={`text-lg font-semibold text-neutral-900`}>
                ${cartTotalValue.toFixed(2)}
              </p>
            </div>
            <div className={`flex justify-between`}>
              <p className={`text-base font-normal text-neutral-600`}>
                Shipping
              </p>
              <p className={`text-lg font-semibold text-neutral-900 uppercase`}>
                {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
              </p>
            </div>
            {/*<p className={`text-base font-normal text-neutral-600`}>*/}
            {/*  Coupon discount*/}
            {/*</p>*/}
          </div>
          <div className={`h-[2px] bg-neutral-200 `} />
          <div className={`flex justify-between`}>
            <p
              className={`${isOrderSuccess ? "text-base font-normal" : "text-2xl"} font-medium text-neutral-900`}
            >
              Total
            </p>
            <p
              className={`${isOrderSuccess ? "text-2xl" : "text-4xl"}  font-semibold text-neutral-900`}
            >
              ${(cartTotalValue + Number(shippingCost)).toFixed(2)}
            </p>
          </div>
          {!isOrderSuccess && (
            <button
              type="submit"
              disabled={showSpinner}
              className="w-full flex cursor-pointer items-center justify-center gap-x-1.5 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <div
                  className="flex items-center justify-center gap-x-1.5"
                  // onClick={(e) => handleSubmit(e)}
                >
                  <Image
                    src={`/lock.svg`}
                    alt={`confirm order icon`}
                    width={20}
                    height={20}
                  />
                  Confirm order
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
