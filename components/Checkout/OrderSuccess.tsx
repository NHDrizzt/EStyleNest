"use client";
import React from "react";
import Image from "next/image";
import OrderSummary from "@/components/Checkout/OrderSummary";
import { useRouter } from "next/navigation";
import { CheckoutFormData } from "@/schema/CheckoutSchema";

const OrderSuccess = ({
  orderData,
  watch,
}: {
  orderData: CheckoutFormData | undefined;
  watch: any;
}) => {
  console.log();
  const router = useRouter();
  return (
    <div className={`flex gap-x-8 h-full`}>
      <div className={`relative w-full max-w-[592px]`}>
        <Image
          src={`/order-success.png`}
          alt={`order success image`}
          fill
          className={`object-cover object-bottom`}
        />
      </div>

      <div className={`space-y-12  flex-grow overflow-y-auto`}>
        <div className={`space-y-4`}>
          <div>
            <p className={`text-4xl font-semibold text-neutral-900`}>
              Your order is confirmed
            </p>
          </div>
          <div>
            <p className={`text-base text-neutral-600`}>
              Your order is now in the queue and being processed. We'll let you
              know when we ship it out!
            </p>
          </div>
        </div>

        <div className={`space-y-1.5`}>
          <p className={`text-base text-neutral-600`}>Order Number</p>
          <div className={`flex gap-x-1.5`}>
            <p className={`text-base font-medium text-neutral-900`}>
              1928371928
            </p>
            {/*<Image*/}
            {/*  src={`/order-code.svg`}*/}
            {/*  alt={`order code icon`}*/}
            {/*  width={20}*/}
            {/*  height={20}*/}
            {/*/>*/}
          </div>
        </div>
        <div>
          <OrderSummary watch={watch} isOrderSuccess={true} />
        </div>

        <div className={`flex gap-x-8`}>
          <div className={`flex-1`}>
            <p>Shipping address</p>
            <p>{orderData?.state}</p>
            <p>
              {orderData?.address1} {orderData?.address2}
            </p>
            <p>{orderData?.zip}</p>
            <p>{orderData?.city}</p>
          </div>

          <div className={`flex-1`}>
            <p>Payment</p>
            <p>{orderData?.cardName.slice(4, orderData.cardName.length - 1)}</p>
            <p>{orderData?.expiry}</p>
          </div>
        </div>

        <div className={`mt-auto`}>
          <button
            className={`flex  items-center gap-x-2 w-full justify-center shadow py-2.5 rounded-sm cursor-pointer`}
            onClick={() => router.push("/")}
          >
            <span>Continue Shopping </span>
            <span>
              <Image
                src={`/arrow-right.svg`}
                alt={`arrow right icon`}
                width={20}
                height={20}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
