import React from "react";
import { CartItem, CartState } from "@/types/cart";
import Image from "next/image";
import CounterQuantity from "@/components/Reusable/CounterQuantity";
import { useAppDispatch } from "@/hooks/storeHooks";
import { removeItem } from "@/store/cartSlicer";

const ShoppingCart = ({ cart }: { cart: CartState }) => {
  const dispatch = useAppDispatch();
  const subTotal = cart.items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    const discountMultiplier = (100 - (item.discount || 0)) / 100;
    return total + itemTotal * discountMultiplier;
  }, 0);
  const calculatePrices = (item: CartItem) => {
    const originalTotal = item.price * item.quantity;
    const discountMultiplier = (100 - (item.discount || 0)) / 100;
    const discountedTotal = originalTotal * discountMultiplier;

    return {
      originalTotal: originalTotal.toFixed(2),
      discountedTotal: discountedTotal.toFixed(2),
      showDiscount: item.discount > 0,
    };
  };

  return (
    <div className={`pt-28`}>
      <p className={`text-3xl md:text-5xl font-semibold text-neutral-900`}>
        Shopping Cart
      </p>

      <div className={`mt-16 flex flex-col md:flex-row gap-x-8`}>
        <div className="flex flex-col mb-12">
          {cart.items.map((item, index) => {
            const isLast = index === cart.items.length - 1;
            const { originalTotal, discountedTotal, showDiscount } =
              calculatePrices(item);
            const currentImage = item.product.images.find(
              (img) => img.color === item.variant,
            );
            return (
              <div
                key={item.id}
                className={`pb-8 ${!isLast ? "border-b border-neutral-200 mb-8" : ""}`}
              >
                <div className="flex gap-x-8 max-w-[800px]">
                  <div className="w-full max-w-[280px] h-[200px]">
                    <Image
                      src={currentImage?.image_url || ""}
                      alt={item.product.name}
                      width={280}
                      height={280}
                      className="object-cover h-full w-full rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <p className="text-2xl text-neutral-900 font-medium">
                      {item.product.name}
                    </p>
                    <p className="text-base font-medium text-neutral-600 capitalize">
                      {item.variant}
                    </p>
                    <p className="text-sm font-medium text-neutral-600">
                      {item.product.description}
                    </p>
                    <div className={`flex items-center mt-auto`}>
                      <div className={`flex items-center w-full gap-x-4`}>
                        <CounterQuantity
                          id={item.id}
                          quantity={item.quantity}
                        />
                        <button
                          onClick={() => {
                            dispatch(removeItem(item.id));
                          }}
                          className={`text-sm font-medium text-neutral-600 cursor-pointer hover:text-neutral-900`}
                        >
                          Remove
                        </button>
                      </div>
                      <div className={`flex gap-x-2 items-center`}>
                        <p className={`text-lg font-medium text-neutral-900`}>
                          ${discountedTotal}
                        </p>
                        {showDiscount && (
                          <p
                            className={`text-xs font-base line-through text-neutral-600`}
                          >
                            ${originalTotal}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`border flex-1 max-h-[438px] border-neutral-200 rounded-lg p-8`}
        >
          <div className={`flex flex-col gap-y-8`}>
            <p className={`text-2xl font-semibold text-neutral-900`}>
              Order Summary
            </p>
            <div
              className={`border-b border-neutral-200 pb-8 flex flex-col gap-y-4`}
            >
              <div className={`flex justify-between items-center`}>
                <p className={`text-base text-neutral-600`}>Subtotal</p>
                <p className={`text-lg font-semibold text-neutral-900`}>
                  ${subTotal.toFixed(2)}
                </p>
              </div>
              <div className={`flex justify-between items-center`}>
                <p className={`text-base text-neutral-600`}>Shipping</p>
                <p className={`text-lg font-semibold text-neutral-900`}>FREE</p>
              </div>
              <div className={`ml-auto flex gap-x-1.5`}>
                <Image
                  src={`/coupon-line.svg`}
                  alt={`coupon icon`}
                  width={20}
                  height={20}
                />
                <p className={`text-indigo-700 cursor-pointer hover:underline`}>
                  Add coupon code
                </p>
              </div>
            </div>
            <div className={`flex justify-between items-center`}>
              <p className={`text-2xl font-medium text-neutral-900`}>Total</p>
              <p className={`text-4xl font-semibold text-neutral-900`}>
                ${subTotal.toFixed(2)}
              </p>
            </div>
            <div>
              <button
                className={`bg-indigo-700 text-white w-full rounded-sm py-4 hover:bg-indigo-800 cursor-pointer`}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
