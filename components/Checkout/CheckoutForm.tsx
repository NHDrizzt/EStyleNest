"use client";
import React from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

const CheckoutForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const shippingMethod = watch("shippingMethod");

  const handleShippingSelect = (method: "standard" | "express") => {
    setValue("shippingMethod", method);
  };

  return (
    <div className="flex-1">
      <div className="space-y-6">
        <p className="text-lg font-medium text-neutral-600">
          Contact Information
        </p>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-700"
          >
            Email
          </label>
          <input
            id="email"
            placeholder="user@email.com"
            type="text"
            className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
              errors.email
                ? "focus:border-red-500 focus:outline-0"
                : "border-neutral-200"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="h-[2px] my-10 bg-neutral-200" />

      <div className="space-y-6">
        <div>
          <p className="text-lg font-medium text-neutral-600">
            Shipping Information
          </p>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="text-sm font-medium text-neutral-700"
          >
            Country / Region
          </label>
          <input
            id="country"
            placeholder="United States"
            type="text"
            className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
              errors.country
                ? "focus:border-red-500 focus:outline-0"
                : "border-neutral-200"
            }`}
            {...register("country")}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="flex gap-x-8">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-neutral-700"
            >
              First name
            </label>
            <input
              id="firstName"
              placeholder="John"
              type="text"
              className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                errors.firstName
                  ? "focus:border-red-500 focus:outline-0"
                  : "border-neutral-200"
              }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-neutral-700"
            >
              Last name
            </label>
            <input
              id="lastName"
              placeholder="Doe"
              type="text"
              className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                errors.lastName
                  ? "focus:border-red-500 focus:outline-0"
                  : "border-neutral-200"
              }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="address1"
            className="text-sm font-medium text-neutral-700"
          >
            Address
          </label>
          <input
            id="address1"
            placeholder="Street Address"
            type="text"
            className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
              errors.address1
                ? "focus:border-red-500 focus:outline-0"
                : "border-neutral-200"
            }`}
            {...register("address1")}
          />
          {errors.address1 && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address1.message}
            </p>
          )}

          <input
            id="address2"
            placeholder="Apartment, suite, unit etc. (optional)"
            type="text"
            className="w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border border-neutral-200"
            {...register("address2")}
          />
        </div>

        <div className="flex gap-x-8">
          <div className="flex-1">
            <label
              htmlFor="city"
              className="text-sm font-medium text-neutral-700"
            >
              City
            </label>
            <input
              id="city"
              placeholder="City"
              type="text"
              className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                errors.city
                  ? "focus:border-red-500 focus:outline-0"
                  : "border-neutral-200"
              }`}
              {...register("city")}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="state"
              className="text-sm font-medium text-neutral-700"
            >
              State
            </label>
            <input
              id="state"
              placeholder="State"
              type="text"
              className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                errors.state
                  ? "focus:border-red-500 focus:outline-0"
                  : "border-neutral-200"
              }`}
              {...register("state")}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="zip"
              className="text-sm font-medium text-neutral-700"
            >
              ZIP
            </label>
            <input
              id="zip"
              placeholder="12345"
              type="text"
              className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                errors.zip
                  ? "focus:border-red-500 focus:outline-0"
                  : "border-neutral-200"
              }`}
              {...register("zip")}
            />
            {errors.zip && (
              <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="h-[2px] my-10 bg-neutral-200" />

      <div className="space-y-6">
        <p className="text-lg font-medium text-neutral-600">Delivery Method</p>
        {errors.shippingMethod && (
          <p className="text-red-500 text-sm">
            {errors.shippingMethod.message}
          </p>
        )}

        <div className="flex gap-x-8">
          <div
            className={`flex-1 cursor-pointer rounded-lg p-4 space-y-2 hover:bg-neutral-50 ${
              shippingMethod === "standard"
                ? "border-indigo-600 border-[2px]"
                : "border border-neutral-200"
            }`}
            onClick={() => handleShippingSelect("standard")}
          >
            <div className="pb-3 flex gap-x-2">
              <div className="w-full">
                <p className="text-base font-medium text-neutral-900">
                  Standard
                </p>
                <p className="text-sm text-neutral-600">4-10 business days</p>
              </div>
              {shippingMethod === "standard" && (
                <div>
                  <Image
                    src="/checkbox-circle-fill.svg"
                    alt="selected icon"
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-base font-medium text-neutral-900">FREE</p>
            </div>
          </div>

          <div
            className={`flex-1 rounded-lg cursor-pointer p-4 space-y-2 hover:bg-neutral-50 ${
              shippingMethod === "express"
                ? "border-indigo-600 border-[2px]"
                : "border border-neutral-200"
            }`}
            onClick={() => handleShippingSelect("express")}
          >
            <div className="pb-3 flex gap-x-2">
              <div className="w-full">
                <p className="text-base font-medium text-neutral-900">
                  Express
                </p>
                <p className="text-sm text-neutral-600">2-5 business days</p>
              </div>
              {shippingMethod === "express" && (
                <div>
                  <Image
                    src="/checkbox-circle-fill.svg"
                    alt="selected icon"
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-base font-medium text-neutral-900">$15.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[2px] my-10 bg-neutral-200" />

      <div className="space-y-6">
        <p className="text-lg font-medium text-neutral-600">Payment Method</p>
        <div className="space-y-6">
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
              className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                errors.cardNumber
                  ? "focus:border-red-500 focus:outline-0"
                  : "border-neutral-200"
              }`}
              {...register("cardNumber")}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="cardName"
              className="text-sm font-medium text-neutral-700"
            >
              Name on card
            </label>
            <input
              id="cardName"
              placeholder="Full name on card"
              type="text"
              className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                errors.cardName
                  ? "focus:border-red-500 focus:outline-0"
                  : "border-neutral-200"
              }`}
              {...register("cardName")}
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardName.message}
              </p>
            )}
          </div>

          <div className="flex gap-x-8">
            <div className="flex-1">
              <label
                htmlFor="expiry"
                className="text-sm font-medium text-neutral-700"
              >
                Expiry
              </label>
              <input
                id="expiry"
                placeholder="MM/YY"
                type="text"
                className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                  errors.expiry
                    ? "focus:border-red-500 focus:outline-0"
                    : "border-neutral-200"
                }`}
                {...register("expiry")}
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiry.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="cvv"
                className="text-sm font-medium text-neutral-700"
              >
                CVV
              </label>
              <input
                id="cvv"
                placeholder="123"
                type="text"
                className={`w-full rounded-sm py-2.5 px-3.5 mt-1.5 placeholder:text-neutral-500 text-neutral-500 border ${
                  errors.cvv
                    ? "focus:border-red-500 focus:outline-0"
                    : "border-neutral-200"
                }`}
                {...register("cvv")}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
