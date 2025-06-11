// components/ProductCard.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useColorSelection } from "@/hooks/useColorSelection";
import { useAppDispatch } from "@/hooks/storeHooks";

interface ProductCardProps {
  collection: Product;
}

const ProductCard = ({ collection }: ProductCardProps) => {
  const router = useRouter();
  const { toggleColor, isSelected, currentColor } = useColorSelection(
    collection.product_id,
  );

  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right"
  >("right");
  const prevColorRef = useRef(currentColor);

  const handleProductDetail = () => {
    router.push(`/product/${collection.product_id}`);
  };

  const matchedImage = collection.images.find(
    (img) => img.color === currentColor,
  );

  const displayImage = matchedImage || collection.images[0];

  useEffect(() => {
    if (prevColorRef.current !== currentColor) {
      const prevIndex = collection.images.findIndex(
        (img) => img.color === prevColorRef.current,
      );
      const currentIndex = collection.images.findIndex(
        (img) => img.color === currentColor,
      );

      setTransitionDirection(prevIndex < currentIndex ? "right" : "left");
      prevColorRef.current = currentColor;
    }
  }, [currentColor, collection.images]);

  return (
    <div className={`flex flex-col`}>
      <div className={`cursor-pointer`} onClick={handleProductDetail}>
        <div className="h-[225px] xl:h-[300px] w-full xl:w-[280px] overflow-hidden rounded-lg aspect-[14/15]">
          <div
            key={displayImage.image_url}
            className={`w-full h-full ${
              transitionDirection === "right"
                ? "animate-slide-in-right"
                : "animate-slide-in-left"
            }`}
          >
            <Image
              src={displayImage.image_url}
              alt={`image`}
              width={280}
              height={300}
              className="h-full md:h-full w-full object-cover rounded-lg hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className={`flex flex-col mt-4`}>
          <p className={`text-xs text-neutral-600 capitalize pb-[2px]`}>
            {collection.images[0].color}
          </p>
          <p className={`font-medium text-lg pb-3 hover:text-indigo-600`}>
            {collection.name}
          </p>
          <div className={`flex gap-x-2 items-center`}>
            <p className={`text-lg font-base text-neutral-600 `}>
              ${collection.inventory[0].sale_price}
            </p>
            {collection.inventory[0].discount_percentage && (
              <p className={`text-xs font-base line-through text-neutral-600`}>
                ${collection.inventory[0].list_price}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-x-1 mb-[30px]">
        {collection.colors.map((color: string, index) => (
          <div key={index} className="p-1">
            <button
              className={`relative w-4 h-4 rounded-full cursor-pointer ${
                isSelected(color) ? "ring-offset-1 ring-2 ring-indigo-600" : ""
              } ${color === `white` ? "border-neutral-400 border" : ""}`}
              style={{ backgroundColor: color }}
              onClick={(e) => {
                e.stopPropagation();
                toggleColor(color);
              }}
              aria-label={`Select color ${color}`}
            >
              {isSelected(color) && (
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 stroke-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  aria-hidden="true"
                  style={{
                    stroke:
                      color === "white" || color === "beige"
                        ? "black"
                        : "white",
                  }}
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
