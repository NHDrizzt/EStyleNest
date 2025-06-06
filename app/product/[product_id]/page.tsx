"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";
import Image from "next/image";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductInformation from "@/components/ProductInformation";

export default function ProductPage() {
  const params = useParams();
  const productId = params.product_id as string;
  const [product, setProduct] = useState<Product | null>(null);

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
  console.log(product);
  if (!product) return <div>Loading...</div>;

  return (
    <div className={`pt-28`}>
      <div className={`flex gap-x-8`}>
        <div className={`max-w-[592px] w-full flex flex-col`}>
          <ProductImageGallery images={product.images} />
        </div>
        <div>{product && <ProductInformation productList={product} />}</div>
      </div>
    </div>
  );
}
