"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckoutFormData } from "@/schema/CheckoutSchema";
import { UseFormWatch } from "react-hook-form";
import { clearCart } from "@/store/cartSlicer";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import CartItem from "@/components/Checkout/CartItem";
import { CartState } from "@/types/cart";
import { clearAllSelectedColors } from "@/store/colorSlicer";

const OrderSuccess = ({
  orderData,
  shippingMethod,
}: {
  orderData: CheckoutFormData | undefined;
  watch: UseFormWatch<CheckoutFormData>;
  shippingMethod: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const shippingCost = shippingMethod === "standard" ? 0 : 15.0;

  const [orderCart, setOrderCart] = useState<CartState | null>(null);
  const currentCart = useAppSelector((state) => state.cart);

  useEffect(() => {
    setOrderCart(currentCart);

    return () => {
      dispatch(clearCart());
      dispatch(clearAllSelectedColors());
    };
  }, []);

  if (!orderCart) {
    return <div>Loading order details...</div>;
  }

  const cartTotalValue = orderCart.items.reduce((total, item) => {
    return total + (item.totalPrice || 0);
  }, 0);

  let couponDiscount = 0;

  if (orderCart.appliedCoupon) {
    if (orderCart.appliedCoupon.type === "percentage") {
      couponDiscount =
        (cartTotalValue * orderCart.appliedCoupon.discount) / 100;
    } else {
      couponDiscount = orderCart.appliedCoupon.discount;
    }
  }

  const total = cartTotalValue - couponDiscount + shippingCost;

  return (
    <div
      className={`px-4 md:px-0 flex flex-col xl:flex-row gap-y-12 gap-x-8 h-full`}
    >
      <div
        className={`relative h-[196px] w-full xl:max-w-[592px] xl:h-auto md:h-[420px]`}
      >
        <Image
          src={`/order-success.png`}
          alt={`order success image`}
          fill
          className={`object-cover object-[center_65%]  md:object-[center_60%]   xl:object-bottom`}
        />
      </div>

      <div className={`space-y-12 flex-grow overflow-y-auto`}>
        <div className={`space-y-4`}>
          <div>
            <p className={`text-4xl font-semibold text-neutral-900`}>
              Your order is confirmed
            </p>
          </div>
          <div>
            <p className={`text-base text-neutral-600`}>
              Your order is now in the queue and being processed. We&apos;ll let
              you know when we ship it out!
            </p>
          </div>
        </div>

        <div className={`space-y-1.5`}>
          <p className={`text-base text-neutral-600`}>Order Number</p>
          <div className={`flex gap-x-1.5`}>
            <p className={`text-base font-medium text-neutral-900`}>
              {Math.floor(Math.random() * 10000000000)
                .toString()
                .padStart(10, "0")}
            </p>
          </div>
        </div>

        <div>
          <div className="flex-1 sticky top-4 h-fit">
            <div className={`border border-neutral-200 p-6 space-y-8`}>
              <div className={`space-y-8`}>
                <div className="">
                  <p className="text-2xl font-semibold text-neutral-900">
                    Order Summary
                  </p>
                </div>

                <div>
                  {orderCart.items.map((item) => {
                    const isLastItem =
                      orderCart.items.indexOf(item) ===
                      orderCart.items.length - 1;
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
                  {orderCart.appliedCoupon && (
                    <div className={`flex justify-between`}>
                      <p className={`text-base font-normal text-neutral-600`}>
                        Coupon ({orderCart.appliedCoupon.code})
                      </p>
                      <p className={`text-lg font-semibold text-green-600`}>
                        -${couponDiscount.toFixed(2)}
                      </p>
                    </div>
                  )}
                  <div className={`flex justify-between`}>
                    <p className={`text-base font-normal text-neutral-600`}>
                      Shipping
                    </p>
                    <p
                      className={`text-lg font-semibold text-neutral-900 uppercase`}
                    >
                      {shippingCost === 0
                        ? "FREE"
                        : `$${shippingCost.toFixed(2)}`}
                    </p>
                  </div>
                </div>

                <div className={`h-[2px] bg-neutral-200`} />
                <div className={`flex justify-between`}>
                  <p className={`text-base font-normal text-neutral-900`}>
                    Total
                  </p>
                  <p className={`text-2xl font-semibold text-neutral-900`}>
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex gap-x-8`}>
          <div className={`flex-1 text-base text-neutral-600`}>
            <div className={`pb-4`}>
              <p className="font-medium">Shipping address</p>
            </div>
            <p className="text-neutral-900">
              {orderData?.firstName} {orderData?.lastName}
            </p>
            <p className="text-neutral-900">
              {orderData?.address1} {orderData?.address2}
            </p>
            <p className="text-neutral-900">
              {orderData?.city}, {orderData?.state} {orderData?.zip}
            </p>
            <p className="text-neutral-900">{orderData?.country}</p>
          </div>

          <div className={`flex-1`}>
            <div className={`pb-4`}>
              <p className={`font-medium text-base text-neutral-600`}>
                Payment
              </p>
            </div>
            <p className={`text-sm font-normal text-neutral-900`}>
              {orderData?.cardNumber
                ? `Ending with ${" "} ${orderData.cardNumber.slice(-4)}`
                : "N/A"}
            </p>
            <p className={`text-sm font-normal text-neutral-900`}>
              Expires {orderData?.expiry || "N/A"}
            </p>
          </div>
        </div>

        <div className={`mt-auto`}>
          <button
            className={`flex items-center gap-x-2 w-full justify-center shadow py-2.5 rounded-sm cursor-pointer bg-white hover:bg-neutral-50 transition-colors`}
            onClick={() => router.push("/")}
          >
            <span>Continue Shopping</span>
            <Image
              src={`/arrow-right.svg`}
              alt={`arrow right icon`}
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
