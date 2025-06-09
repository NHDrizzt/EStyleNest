"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function ProductImageGallery({
  images,
}: {
  images: { image_url: string }[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) return <div>No images available</div>;

  return (
    <div>
      <div className="relative w-full h-[800px] mb-4">
        <Image
          src={images[currentImageIndex].image_url}
          alt="Main product image"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto max-w-full pb-3 scrollbar-hide">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-200 ${
                currentImageIndex === index
                  ? "border-3 border-indigo-600 rounded-lg"
                  : "opacity-80 hover:opacity-100"
              }`}
              style={{
                width: "160px",
                height: "190px",
              }}
              onClick={(e) => {
                setCurrentImageIndex(index);
                e.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }}
            >
              <Image
                src={image.image_url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
