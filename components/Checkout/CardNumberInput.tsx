import React from "react";

const CardNumberInput = ({ register, errors }) => {
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    e.target.value = value;
  };

  return (
    <div className="flex-1">
      <label
        htmlFor="cardNumber"
        className="text-sm font-medium text-neutral-700"
      >
        Card Number
      </label>
      <input
        id="cardNumber"
        placeholder="1234 1234 1234 1234"
        type="text"
        maxLength={19}
        className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
          errors.cardNumber
            ? "border-red-500 focus:border-red-500 focus:outline-0"
            : "border-neutral-200 focus:border-neutral-900 focus:border-3 focus:outline-0"
        }`}
        {...register("cardNumber")}
        onChange={handleCardNumberChange}
      />
      {errors.cardNumber && (
        <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
      )}
    </div>
  );
};

export default CardNumberInput;
