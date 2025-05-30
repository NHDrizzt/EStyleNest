import React from "react";

const Newsletter = () => {
  return (
    <div className={`px-3`}>
      <div className={`flex flex-col gap-y-5 xl:flex-row justify-between`}>
        <div className={`flex flex-col gap-y-2.5`}>
          <p className={`text-neutral-900 text-xl font-semibold`}>
            Join our newsletter
          </p>
          <p className={`text-neutral-600 text-base`}>
            We’ll send you a nice letter once per week. No spam.
          </p>
        </div>

        <div className={`flex gap-y-4 flex-col md:flex-row gap-x-4`}>
          <input
            className={`h-10 w-full xl:w-auto placeholder:text-neutral-500 placeholder:text-sm border border-neutral-200 rounded-sm px-3.5`}
            placeholder={`Enter your email`}
            type="text"
          />
          <button className={`px-3.5 h-10 rounded-sm bg-indigo-700 text-white`}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
