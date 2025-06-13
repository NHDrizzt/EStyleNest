"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  const emailSchema = z
    .string()
    .email({ message: "Please enter a valid email address" });

  const validateEmail = () => {
    try {
      emailSchema.parse(email);
      setValidationError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      toast.error(validationError || "Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success(
        "🎉 Subscription successful! Thank you for joining our newsletter.",
      );
      setEmail("");
      setIsSubmitting(false);
      setValidationError("");
    }, 1000);
  };

  const handleBlur = () => {
    if (email) {
      validateEmail();
    }
  };

  return (
    <div className={`px-3 md:px-0`}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className={`flex flex-col gap-y-5 xl:flex-row justify-between`}>
        <div className={`flex flex-col gap-y-2.5`}>
          <p className={`text-neutral-900 text-xl font-semibold`}>
            Join our newsletter
          </p>
          <p className={`text-neutral-600 text-base`}>
            We&apos;ll send you a nice letter once per week. No spam.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex gap-y-4 flex-col md:flex-row gap-x-4`}
        >
          <div className="relative">
            <input
              className={`h-10 w-full xl:w-auto placeholder:text-neutral-500 placeholder:text-sm rounded-sm px-3.5
                ${validationError ? "border-2 border-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" : "border border-neutral-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"}`}
              placeholder={`Enter your email`}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationError) setValidationError("");
              }}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {validationError && (
              <span className="absolute left-0 top-full mt-1 text-xs text-red-500">
                {validationError}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`px-3.5 h-10 rounded-sm cursor-pointer hover:bg-indigo-800 bg-indigo-700 text-white flex items-center justify-center ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
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
              "Subscribe"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
