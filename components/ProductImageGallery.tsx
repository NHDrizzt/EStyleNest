"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useColorSelection } from "@/hooks/useColorSelection";

type ImageType = {
  image_url: string;
  color?: string;
};

const Spinner = () => (
  <div className="flex items-center justify-center h-full">
    <svg
      className="animate-spin h-8 w-8 text-indigo-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
);

export default function ProductImageGallery({
  productId,
  images,
}: {
  productId: string;
  images: ImageType[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImageLoading, setMainImageLoading] = useState(true);
  const [thumbnailsLoading, setThumbnailsLoading] = useState<boolean[]>([]);
  const { currentColor } = useColorSelection(productId);

  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!currentColor || images.length === 0) return;

    const index = images.findIndex((img) => img.color === currentColor);
    if (index !== -1) {
      setCurrentImageIndex(index);
    }
  }, [currentColor, images]);

  useEffect(() => {
    setThumbnailsLoading((prev) => {
      if (prev.length !== images.length) {
        return Array(images.length).fill(true);
      }
      return prev;
    });
  }, [images]);

  const handleMainImageLoad = () => {
    setMainImageLoading(false);
  };

  const handleThumbnailLoad = (index: number) => {
    setThumbnailsLoading((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  if (!images || images.length === 0) return <div>No images available</div>;

  return (
    <div>
      <div className="relative w-full h-[800px] mb-4 bg-gray-100 rounded-lg">
        {mainImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Spinner />
          </div>
        )}

        <Image
          src={images[currentImageIndex].image_url}
          alt="Main product image"
          fill
          className={`object-cover rounded-lg transition-opacity duration-300 ${
            mainImageLoading ? "opacity-0" : "opacity-100"
          }`}
          priority
          onLoadingComplete={handleMainImageLoad}
          onError={() => setMainImageLoading(false)}
        />
      </div>

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto max-w-full pb-3 scrollbar-hide">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (thumbnailRefs.current[index] = el)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-200 ${
                currentImageIndex === index
                  ? "border-[3px] border-indigo-600 rounded-lg"
                  : "opacity-80 hover:opacity-100"
              }`}
              style={{ width: "160px", height: "190px" }}
              onClick={(e) => {
                setCurrentImageIndex(index);
                setMainImageLoading(true);
                e.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }}
            >
              {thumbnailsLoading[index] && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Spinner />
                </div>
              )}

              <Image
                src={image.image_url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className={`object-cover rounded-lg transition-opacity duration-300 ${
                  thumbnailsLoading[index] ? "opacity-0" : "opacity-100"
                }`}
                onLoadingComplete={() => handleThumbnailLoad(index)}
                onError={() => handleThumbnailLoad(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
