"use client";
import React from "react";
import { ProductData } from "@/types/product";
import ProductCard from "@/components/Reusable/ProductCard";

interface Props {
  collections: ProductData;
}

const ProductsSection = ({ collections }: Props) => {
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
          {collections.data.map((collection) => (
            <ProductCard key={collection.product_id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
