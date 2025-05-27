import React from "react";
import Image from "next/image";

interface Props {
  collections: ProductData;
}

interface ProductData {
  data: {
    id: number;
    name: string;
    images: {
      id: number;
      image_url: string;
    }[];
  }[];
}

const ProductsSection = ({ collections }) => {
  console.log(collections);
  return (
    <div className={`mt-[96px]`}>
      <div className={`flex justify-between w-full`}>
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
          {collections.data.map((collection: any, index) => (
            <div key={collection.product_id} className={``}>
              {
                <div className="h-[280px] w-[280px]">
                  <Image
                    src={`${collection.images[0].image_url}`}
                    alt={`image`}
                    width={280}
                    height={280}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
              }

              <div className={`flex flex-col mt-4`}>
                <p className={`text-xs text-neutral-600 capitalize pb-[2px]`}>
                  {collection.images[0].color}
                </p>
                <p className={`font-medium text-lg pb-3`}>{collection.name}</p>
                <p className={`text-lg font-base text-neutral-600 pb-3`}>
                  ${collection.priceRange.highest}
                </p>
                <div className={`flex gap-x-3 mb-[30px]`}>
                  {collection.colors.map((color: any, index) => (
                    <div key={index} className={`p-1`}>
                      <button
                        className={`w-4 h-4 rounded-full focus:outline focus:outline-offset-2 focus:outline-indigo-600`}
                        style={{ backgroundColor: color }}
                        key={`${color}`}
                      />
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
