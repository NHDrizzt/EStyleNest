import React, { useEffect, useState } from "react";
import { Info, Inventory, Product } from "@/types/product";
import RatingStars from "@/components/RatingStar";
import { ToggleOpenIcon, ToggleCloseIcon } from "@/components/ComponentsSVG";
import { useColorSelection } from "@/hooks/useColorSelection";

interface Props {
  productList: Product;
}

const ProductInformation = ({ productList }: Props) => {
  console.log(productList);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentSelectedInventory, setCurrentSelectedInventory] =
    useState<Inventory | null>(productList.inventory[0]);
  const { toggleColor, isSelected, currentColor } = useColorSelection(
    productList.product_id,
  );

  const handleSizeSelect = (size: string) => {
    setSelectedSize((prev) => (prev === size ? null : size));
  };

  const inventoryColourWithoutRepeats = productList.inventory.reduce(
    (acc: string[], item: Inventory) => {
      if (!acc.includes(item.color)) {
        acc.push(item.color);
      }
      return acc;
    },
    [],
  );

  const inventorySizeWithoutRepeats = productList.inventory.reduce(
    (acc: string[], item: Inventory) => {
      if (!acc.includes(item.size)) {
        acc.push(item.size);
      }
      return acc;
    },
    [],
  );

  useEffect(() => {
    if (currentColor && selectedSize) {
      const matchingInventoryItem = productList.inventory.find(
        (item) => item.color === currentColor && item.size === selectedSize,
      );
      if (matchingInventoryItem) {
        setCurrentSelectedInventory(matchingInventoryItem);
      }
    }
  }, [productList.inventory, currentColor, selectedSize]);

  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleDescription = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className={`max-w-[592px]`}>
      <p className={`text-3xl md:text-5xl font-semibold text-neutral-900`}>
        {productList.name}
      </p>
      <div>
        {currentSelectedInventory && (
          <div className={`flex flex-col mt-5`}>
            <div className={`flex`}>
              <p className={`text-3xl font-medium text-neutral-600`}>
                ${currentSelectedInventory.sale_price}
              </p>
              {currentSelectedInventory.sale_price !==
                currentSelectedInventory.list_price && (
                <p
                  className={`text-lg md:text-lg font-medium mt-auto text-neutral-400 line-through ml-2`}
                >
                  ${currentSelectedInventory.list_price}
                </p>
              )}
            </div>
            {currentSelectedInventory.discount_percentage && (
              <div
                className={`border-amber-200 border bg-amber-50 rounded-full text-amber-700 px-2.5 py-1 mt-2 max-w-[77px]`}
              >
                <p className={`text-sm whitespace-nowrap uppercase`}>
                  {currentSelectedInventory.discount_percentage}% OFF
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`mt-3`}>
        <div className={`flex gap-x-2 items-center`}>
          <p className={`text-xl text-neutral-900`}>
            {Math.round(productList.rating * 10) / 10}
          </p>
          <RatingStars
            rating={productList.rating}
            starSize={20}
            activeColor={"#FACC15"}
          />
          <p
            className={`text-sm font-medium text-indigo-600 hover:underline cursor-pointer hover:text-indigo-700`}
          >
            See all {productList.reviews} reviews
          </p>
        </div>
      </div>
      <div className={`py-8`}>
        <p className={`text-base text-neutral-600`}>
          {productList.description}
        </p>
      </div>
      <div className={``}>
        <p className={`text-sm text-neutral-500`}>Available Colors</p>
      </div>
      <div className={`flex gap-x-4 mt-4 mb-8`}>
        {inventoryColourWithoutRepeats.map((color: string) => (
          <div key={color} className="p-2.5">
            <button
              className={`relative w-9.5 h-9.5 rounded-full cursor-pointer  ${
                isSelected(color) ? "ring-offset-1 ring-2 ring-indigo-600" : ""
              } ${color === `white` ? "border-neutral-400 border" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => toggleColor(color)}
              aria-label={`Select color ${color}`}
            >
              {isSelected(color) && (
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 stroke-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  aria-hidden="true"
                  style={{
                    stroke: color === "white" ? "black" : "white",
                  }}
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>

      {inventorySizeWithoutRepeats[0] !== null && (
        <>
          <div>
            <p className={`text-sm text-neutral-500`}>Available Sizes</p>
          </div>
          <div className={`flex gap-x-4 mt-4 mb-8 flex-wrap gap-y-3`}>
            {inventorySizeWithoutRepeats.map((size: string) => (
              <div key={size} className={``}>
                <button
                  onClick={() => handleSizeSelect(size)}
                  aria-label={`Select size ${size}`}
                  className={`px-3 cursor-pointer py-2 rounded-lg border-2 w-16 h-12 items-center ${selectedSize === size ? "border-indigo-700 border-2" : "border-neutral-200"}  flex justify-center`}
                >
                  <p
                    className={`uppercase text-base font-medium text-neutral-900`}
                  >
                    {size}
                  </p>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div>
        <p className={`text-sm text-neutral-500`}>Quantity</p>
        <div
          className={`border-1 border-neutral-200 bg-neutral-50 py-1.5 mt-4 rounded-lg max-w-[125px]`}
        >
          <div className={`flex items-center justify-between`}>
            <div
              className={`flex items-center justify-between  w-full px-2 gap-x-2`}
            >
              <button
                className={`w-4 h-4 flex items-center justify-center cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-minus"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>

              <p className={`text-base text-neutral-600`}>1</p>
              <button
                className={`w-4 h-4 flex items-center justify-center cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full mt-8`}>
        <button
          className={`w-full bg-indigo-600 text-white text-lg font-medium px-3 py-4 rounded-lg cursor-pointer hover:bg-indigo-700`}
        >
          Add to Cart
        </button>
      </div>

      <div className={`mt-10 flex flex-col gap-y-6`}>
        {productList.info.map(({ title, description }, index) => (
          <div
            key={index}
            className={` ${productList.info.length - 1 === index ? "" : "border-b pb-8 border-neutral-200 "}`}
          >
            <div
              className={`flex items-center justify-between cursor-pointer   `}
              onClick={() => toggleDescription(index)}
            >
              <p className="text-lg font-medium text-neutral-900">{title}</p>
              {openIndexes.includes(index) ? (
                <ToggleOpenIcon />
              ) : (
                <ToggleCloseIcon />
              )}
            </div>

            {openIndexes.includes(index) &&
              description.map((desc, index) => (
                <div
                  className={`flex gap-x-2 items-center text-neutral-600 mt-2`}
                  key={index}
                >
                  <p>•</p>
                  <p className="text-base text-neutral-600">{desc}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInformation;
