"use client";
import React from "react";
import { ProductData } from "@/types/product";
import ProductCard from "@/components/Reusable/ProductCard";

interface Props {
  collections: ProductData;
  id: string;
}

const ProductsSection = ({ collections, id }: Props) => {
  return (
    <section id={id} className={`px-3 md:px-0 mt-[96px]`}>
      <div className={`flex justify-between items-center w-full`}>
        <div className={`h-[45px]`}>
          <h1 className={`font-semibold text-2xl md:text-3xl`}>
            Latests Arrivals
          </h1>
        </div>
      </div>
      <div className={`mt-8`}>
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4`}>
          {collections.data.map((collection) => (
            <ProductCard key={collection.product_id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
