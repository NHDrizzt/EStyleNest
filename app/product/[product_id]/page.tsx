"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductInformation from "@/components/ProductInformation";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { setSelectedColor } from "@/store/colorSlicer";

export default function ProductPage() {
  const params = useParams();
  const productId = params.product_id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const selectedColor = useAppSelector((state) => state.selectedColor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}`,
      );
      const data = await res.json();
      setProduct(data);
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    if (product) {
      const currentSelectedColor = selectedColor[product.product_id];
      if (!currentSelectedColor) {
        const defaultColor = product.images[0].color;
        dispatch(
          setSelectedColor({
            productId: product.product_id,
            color: defaultColor,
          }),
        );
      }
    }
  }, [product]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className={`pt-28`}>
      <div className={`flex gap-x-8`}>
        <div className={`max-w-[592px] w-full flex flex-col`}>
          <ProductImageGallery productId={productId} images={product.images} />
        </div>
        <div>{product && <ProductInformation productList={product} />}</div>
      </div>
    </div>
  );
}
