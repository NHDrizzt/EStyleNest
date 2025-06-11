import React from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { updateQuantity } from "@/store/cartSlicer";

const CounterQuantity = ({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`w-full max-w-[125px]`}>
      <div
        className={`border-1 border-neutral-200 bg-neutral-50 flex flex-col justify-center   h-9 rounded-lg max-w-[125px]`}
      >
        <div className={`flex items-center justify-between`}>
          <div
            className={`flex items-center justify-between  w-full px-2 gap-x-2`}
          >
            <button
              className={`w-4 h-4 flex items-center justify-center cursor-pointer`}
              onClick={() => {
                dispatch(updateQuantity({ id: id, quantity: quantity - 1 }));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-minus"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            <p className={`text-base text-neutral-600`}>{quantity}</p>
            <button
              className={`w-4 h-4 flex items-center justify-center cursor-pointer`}
              onClick={() => {
                dispatch(updateQuantity({ id: id, quantity: quantity + 1 }));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterQuantity;
