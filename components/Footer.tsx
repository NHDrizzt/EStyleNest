import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={`px-3 md:px-0`}>
      <div
        className={`flex xl:flex-row flex-col gap-y-12 gap-x-16 border-b-2 border-neutral-200 pb-16`}
      >
        <div className={`flex flex-col gap-y-8 max-w-[352px]`}>
          <Image
            src={`/logo.svg`}
            alt={``}
            priority
            quality={100}
            width={105}
            height={32}
          />
          <p className={`text-base text-neutral-600`}>
            Craft stunning style journeys that weave more joy into every thread.
          </p>
        </div>

        <div className={`flex gap-x-8 xl:ml-auto w-full max-w-[592px]`}>
          <div className={`flex flex-col w-full`}>
            <div className={`pb-4`}>
              <p className={`text-sm text-neutral-500`}>SHOP CATEGORIES</p>
            </div>
            <div
              className={`flex flex-col gap-y-3 font-medium text-base text-neutral-600`}
            >
              <p>Unisex</p>
              <p>Women</p>
              <p>Men</p>
            </div>
          </div>
          <div className={`flex flex-col w-full`}>
            <div className={`pb-4`}>
              <p className={`text-sm text-neutral-500`}> SHOP COLLECTIONS</p>
            </div>
            <div
              className={`flex flex-col gap-y-3 font-medium text-neutral-600`}
            >
              <p>Latest arrivals</p>
              <p>Urban Oasis </p>
              <p>Cozy Comfort </p>
              <p>Fresh Fusion</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex md:flex-row flex-col gap-y-8 justify-between gap-x-8 mt-8`}
      >
        <div className={``}>
          <p className={`text-neutral-500 text-base`}>
            © 2024 StyleNest, Inc. All rights reserved.
          </p>
        </div>
        <div>
          <div className={`flex gap-x-6`}>
            <Image
              src={`/youtube.svg`}
              alt={`youtube icon`}
              width={24}
              height={24}
            />
            <Image
              src={`/insta.svg`}
              alt={`instagram icon`}
              width={24}
              height={24}
            />
            <Image
              src={`/facebook.svg`}
              alt={`facebook icon`}
              width={24}
              height={24}
            />
            <Image
              src={`/github.svg`}
              alt={`github icon`}
              width={24}
              height={24}
            />
            <Image
              src={`/twitter.svg`}
              alt={`twitter icon`}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
