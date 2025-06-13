"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EmptyShoppingCart = () => {
  const router = useRouter();
  return (
    <div className={`pt-28`}>
      <div>
        <p className={`text-5xl font-semibold`}>Shopping Cart</p>
      </div>

      <div
        className={`flex xl:flex-row flex-col gap-x-8 gap-y-8 items-center justify-center mt-16 mb-24`}
      >
        <div
          className={`flex flex-col items-center justify-center gap-y-5 flex-1 max-w-[488px]`}
        >
          <Image
            src={`/shoppingcart.svg`}
            alt={`shoppingcart icon`}
            width={48}
            height={48}
          />
          <p className={`text-xl font-medium text-neutral-900`}>
            Your cart is empty
          </p>
          <p className={`text-base font-normal text-neutral-900`}>
            Let's go explore some products
          </p>
          <button
            className={`flex hover:bg-indigo-800 gap-x-1.5 cursor-pointer items-center justify-center text-white  py-2.5 w-full max-w-[192px] rounded-sm bg-indigo-700 shadow`}
            onClick={() => router.push("/")}
          >
            <span>Explore products</span>
            <span>
              <Image
                src={`/arrow-right-white.svg`}
                alt={`arrow right`}
                width={20}
                height={20}
              />
            </span>
          </button>
        </div>
        <div className={`flex-1`}>
          <Image
            src={`/empty-shopping-cart.png`}
            alt={`empty shopping cart image`}
            width={696}
            height={432}
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyShoppingCart;
