"use client";
import React, { useLayoutEffect, useRef } from "react";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import OrderSummary from "./OrderSummary";
import { FormProvider, useForm } from "react-hook-form";
import checkoutSchema, { CheckoutFormData } from "@/schema/CheckoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import OrderSuccess from "@/components/Checkout/OrderSuccess";
import { useAppDispatch } from "@/hooks/storeHooks";
import { clearCart } from "@/store/cartSlicer";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: "standard",
    },
  });
  const router = useRouter();
  const [isOrderSuccess, setIsOrderSuccess] = React.useState(false);
  const [orderData, setOrderData] = React.useState<CheckoutFormData>();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (data: CheckoutFormData) => {
    setOrderData(data);
    setIsProcessing(true);

    setTimeout(() => {
      setIsOrderSuccess(true);
      setIsProcessing(false);
      dispatch(clearCart());
    }, 2000);
  };

  const topRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isOrderSuccess) {
      topRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isOrderSuccess]);

  return (
    <div ref={topRef} className="mt-28">
      {isOrderSuccess ? (
        <OrderSuccess orderData={orderData} watch={methods.watch} />
      ) : (
        <>
          <div className={`pb-8`}>
            <button
              onClick={() => router.push("/cart")}
              className={`text-indigo-700 text-sm font-medium cursor-pointer hover:underline`}
            >
              {"< "}Back to Shopping Cart
            </button>
          </div>
          <div className={`mb-8`}>
            <p className={`text-4xl font-semibold text-neutral-900`}>
              Checkout
            </p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex gap-x-8 flex-1">
                <CheckoutForm />
                <OrderSummary
                  watch={methods.watch}
                  isSubmitting={methods.formState.isSubmitting || isProcessing}
                  isOrderSuccess={false}
                />
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default Checkout;
