import React, { useEffect, useState } from "react";
import { CartItem, CartState, Coupon } from "@/types/cart";
import Image from "next/image";
import CounterQuantity from "@/components/Reusable/CounterQuantity";
import { useAppDispatch } from "@/hooks/storeHooks";
import {
  applyCoupon,
  removeCoupon,
  removeItem,
  updateTotalPrice,
} from "@/store/cartSlicer";
import { useRouter } from "next/navigation";

const ShoppingCart = ({ cart }: { cart: CartState }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(
    cart.appliedCoupon || null,
  );
  const [couponError, setCouponError] = useState("");

  const validCoupons: Coupon[] = [
    { code: "SAVE10", discount: 10, type: "percentage" },
    { code: "SAVE20", discount: 20, type: "percentage" },
    { code: "FREESHIP", discount: 5, type: "fixed" },
    { code: "WELCOME", discount: 15, type: "percentage" },
  ];

  const subTotal = cart.items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    const discountMultiplier = (100 - (item.discount || 0)) / 100;
    return total + itemTotal * discountMultiplier;
  }, 0);

  const applyCoupons = () => {
    const coupon = validCoupons.find((c) => c.code === couponCode.trim());

    if (coupon) {
      setAppliedCoupon(coupon);
      dispatch(applyCoupon(coupon));
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }

    setCouponCode("");
    setShowCouponInput(false);
  };

  const removeCoupons = () => {
    dispatch(removeCoupon());
    setAppliedCoupon(null);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percentage") {
      return (subTotal * appliedCoupon.discount) / 100;
    } else {
      return appliedCoupon.discount;
    }
  };

  const discountAmount = calculateDiscount();
  const total = subTotal - discountAmount;

  const calculatePrices = (item: CartItem) => {
    const originalTotal = item.price * item.quantity;
    const discountMultiplier = (100 - (item.discount || 0)) / 100;
    const discountedTotal = originalTotal * discountMultiplier;
    const discountValue = item.discount || 0;

    return {
      originalTotal: originalTotal.toFixed(2),
      discountedTotal: discountedTotal.toFixed(2),
      showDiscount: discountValue,
    };
  };

  useEffect(() => {
    cart.items.forEach((item) => {
      const originalTotal = item.price * item.quantity;
      const discountMultiplier = (100 - (item.discount || 0)) / 100;
      const discountedTotal = originalTotal * discountMultiplier;

      dispatch(updateTotalPrice({ id: item.id, price: discountedTotal }));
    });
  }, [cart.items, dispatch]);

  return (
    <div className={`py-28 px-3 md:px-0`}>
      <p className={`text-3xl md:text-5xl font-semibold text-neutral-900`}>
        Shopping Cart
      </p>

      <div className={`mt-16 flex flex-col xl:flex-row gap-x-8`}>
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
                <div className="flex md:flex-row flex-col gap-x-8 gap-y-4 md:gap-y-0 max-w-[800px]">
                  <div className="w-full md:max-w-[280px] h-[200px]">
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
                        {showDiscount > 0 && (
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
          className={`border flex-1 max-h-[470px] border-neutral-200 rounded-lg p-8`}
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

              {appliedCoupon ? (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <p className={`text-base text-green-600`}>
                      Coupon: {appliedCoupon.code} ({appliedCoupon.discount}
                      {appliedCoupon.type === "percentage" ? "%" : "$"} off)
                      <span
                        onClick={removeCoupons}
                        className="ml-2 cursor-pointer text-red-600 text-sm hover:underline"
                      >
                        {" "}
                        Remove
                      </span>
                    </p>
                  </div>
                  <p className={`text-lg font-semibold text-green-600`}>
                    -${discountAmount.toFixed(2)}
                  </p>
                </div>
              ) : showCouponInput ? (
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="border border-neutral-200 rounded-sm px-3 py-1.5 flex-1"
                    />
                    <button
                      onClick={applyCoupons}
                      className="bg-indigo-700 text-white px-3 py-1.5 rounded-sm hover:bg-indigo-800"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => setShowCouponInput(false)}
                      className="text-neutral-600 px-3 py-1.5 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm">{couponError}</p>
                  )}
                </div>
              ) : (
                <div>
                  <div></div>
                  <div
                    className={`ml-auto flex  justify-between  cursor-pointer`}
                    onClick={() => setShowCouponInput(true)}
                  >
                    <div className={`flex flex-col gap-y-2`}>
                      <p>
                        Add <span className={`text-indigo-700`}>WELCOME</span>{" "}
                        for 15% off
                      </p>
                      <div className={`flex  gap-x-1.5`}>
                        <Image
                          src={`/coupon-line.svg`}
                          alt={`coupon icon`}
                          width={20}
                          height={20}
                        />
                        <p className={`text-indigo-700 hover:underline`}>
                          Add coupon code
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={`flex justify-between items-center`}>
              <p className={`text-2xl font-medium text-neutral-900`}>Total</p>
              <p className={`text-4xl font-semibold text-neutral-900`}>
                ${total.toFixed(2)}
              </p>
            </div>
            <div>
              <button
                className={`bg-indigo-700 text-white w-full rounded-sm py-4 hover:bg-indigo-800 cursor-pointer`}
                onClick={() => router.push(`/checkout`)}
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
