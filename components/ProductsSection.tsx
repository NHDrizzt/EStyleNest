"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Props {
  collections: ProductData;
}

interface Inventory {
  sku: string;
  color: string;
  list_price: number;
  sale_price: number;
  sold: number;
  stock: number;
  discount_percentage: number;
}

interface ProductData {
  data: Product[];
}

interface Product {
  product_id: number;
  name: string;
  images: {
    color: string;
    image_url: string;
  }[];
  inventory: Inventory[];
  colors: string[];
}

const ProductsSection = ({ collections }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor((prev) => (prev === color ? null : color));
  };
  return (
    <div className={`px-3 md:px-0 mt-[96px]`}>
      <div className={`flex justify-between items-center w-full`}>
        <h1 className={`font-semibold text-2xl md:text-3xl`}>
          Latests Arrivals
        </h1>
        <button
          className={`cursor-pointer px-[18px] py-[10px] rounded-sm border border-neutral-200 drop-shadow-sm hover:bg-indigo-800 hover:text-white hover:border-indigo-800`}
        >
          View All
        </button>
      </div>
      <div className={`mt-8`}>
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4`}>
          {collections.data.map((collection: Product) => (
            <div key={collection.product_id} className={`cursor-pointer`}>
              {
                <div className="h-[225px] xl:h-[300px] w-full xl:w-[280px] overflow-hidden rounded-lg aspect-[14/15]">
                  <Image
                    src={`${collection.images[0].image_url}`}
                    alt={`image`}
                    width={280}
                    height={300}
                    className="h-full md:h-full w-full object-cover rounded-lg hover:scale-105 transition duration-300 ease-in-out"
                  />
                </div>
              }

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
                    <p
                      className={`text-xs font-base line-through text-neutral-600`}
                    >
                      ${collection.inventory[0].list_price}
                    </p>
                  )}
                </div>

                <div className="flex gap-x-1 mb-[30px]">
                  {collection.colors.map((color: string, index) => (
                    <div key={index} className="p-1">
                      <button
                        className={`relative w-4 h-4 rounded-full cursor-pointer  ${
                          selectedColor === color
                            ? "ring-offset-1 ring-2 ring-indigo-600"
                            : ""
                        } ${color === `white` ? "border-neutral-400 border" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                        aria-label={`Select color ${color}`}
                      >
                        {selectedColor === color && (
                          <svg
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 stroke-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
