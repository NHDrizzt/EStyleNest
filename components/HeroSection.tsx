import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <main className={`container md:py-[64px] xl:py-[112px] xl:pb-[96px]`}>
      <div
        className={`flex flex-col px-3 md:px-0 mt-16 md:mt-0 xl:flex-row xl:items-center gap-y-8 xl:gap-y-0 xl:gap-x-8`}
      >
        <div className={`max-w-[488px] space-y-6`}>
          <h1
            className={`font-semibold text-4xl md:text-5xl xl:text-6xl text-neutral-900`}
          >
            Summer styles are finally here
          </h1>
          <h3 className={`font-normal text-lg md:text-xl`}>
            This year, our new summer collection will be your haven from the
            world's harsh elements.
          </h3>
          <button
            className={`mt-2  md:mt-10 rounded-sm cursor-pointer bg-indigo-700 px-9 text-white py-3 md:py-4 md:px-16 xl:px-11 text-lg font-medium hover:bg-indigo-800`}
          >
            Shop now
          </button>
        </div>

        <div className={`w-full`}>
          <Image
            src={`/heroimage.png`}
            alt={``}
            width={693}
            height={526}
            className={`w-full xl:max-w-[693px] max-h-[526px]`}
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
