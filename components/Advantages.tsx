import React from "react";
import AdvantageCard from "@/components/Reusable/AdvantageCard";

const Advantages = () => {
  return (
    <div className={`px-3 md:px-0`}>
      <div className={`w-full`}>
        <div
          className={`flex flex-col gap-y-3 items-center max-w-[896px] mx-auto text-center pb-16`}
        >
          <p className={`text-base font-semibold text-indigo-700`}>
            Elevate Your Experience
          </p>
          <div className={`mb-2`}>
            <p
              className={`text-neutral-900 font-semibold text-3xl md:text-5xl`}
            >
              Our Commitment to Exceptional Service
            </p>
          </div>

          <p className={`text-neutral-600 text-lg md:text-xl`}>
            We pride ourselves on a foundation of exceptional customer service,
            where every interaction is a testament to our dedication to
            excellence.
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-x-8 gap-y-8`}>
        <AdvantageCard
          icon_src={`/complimentary-shipping.svg`}
          title={`Complimentary Shipping`}
          text={`Enjoy the convenience of free shipping for all orders. We believe in
            transparent pricing, and the price you see is the price you pay— no
            surprise fees`}
        />
        <AdvantageCard
          icon_src={`/quality-promise.svg`}
          title={`2-Year Quality Promise`}
          text={`Shop with confidence knowing that we stand behind our products.
            Should any issue arise within the first two years, rest assured
            we're here to help with a hassle-free replacement.`}
        />
        <AdvantageCard
          icon_src={`/easy-exchanges.svg`}
          title={`Easy Exchanges`}
          text={`If your purchase isn't quite right, pass it on to a friend who
            might love it, and let us know. We're happy to facilitate an
            exchange to ensure you have the perfect item to complement your
            lifestyle.`}
        />
      </div>
    </div>
  );
};

export default Advantages;
