"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductImageGallery({
  images,
}: {
  images: { image_url: string }[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) return <div>No images available</div>;

  console.log(images);
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
        <div
          className="flex gap-3 overflow-x-auto max-w-full pb-3 scrollbar-hide"
          style={{
            maskImage:
              "linear-gradient(to right, black 0%, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 75%, transparent 100%)",
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-full flex-shrink-0 cursor-pointer transition-all duration-200 ${
                currentImageIndex === index
                  ? "border-3 border-indigo-600 rounded-lg"
                  : "opacity-80 hover:opacity-100"
              }`}
              style={{
                width: "160px",
                height: "190px",
                clipPath: index === 3 ? "inset(0 0 0 0)" : "none",
              }}
              onClick={() => setCurrentImageIndex(index)}
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

        {images.length > 4 && (
          <div className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center pointer-events-none">
            <span className="text-2xl text-gray-400">→</span>
          </div>
        )}
      </div>
    </div>
  );
}
