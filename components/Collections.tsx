"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Collection {
  collection_id: string;
  name: string;
  image_url: string;
  description: string;
}

interface ApiResponse {
  data: Collection[];
}

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch(
          "https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections",
          {
            next: { revalidate: 3600 },
          },
        );

        if (!res.ok) {
          throw new Error(`Failed to load: ${res.status} ${res.statusText}`);
        }

        const response: ApiResponse = await res.json();
        setCollections(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading collections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="container px-3 md:px-0 pt-20">
      <h2 className="text-3xl font-semibold mb-6">Our Collections</h2>

      {collections.length === 0 ? (
        <p>No collections available</p>
      ) : (
        <div className="flex md:flex-row flex-col  md:gap-y-0  gap-y-7 gap-x-7 md:max-h-[580px]">
          {collections[0] && (
            <div className="relative max-w-[594px] xl:w-full h-[580px]">
              <Image
                src={collections[0].image_url}
                alt={collections[0].description || "Collection image"}
                width={594}
                height={580}
                className="object-cover h-full w-full rounded-lg"
              />
              <div className="absolute z-50 bottom-0 left-0 p-4 text-white">
                <p>{collections[0].name}</p>
                <p>{collections[0].description}</p>
              </div>
              <div
                className={`absolute top-0 left-0 w-full cursor-pointer h-full filter-collection opacity-40 hover:opacity-60 transition-opacity duration-300 ease-in-out`}
              />
            </div>
          )}
          <div className={`flex flex-col gap-y-7 flex-1`}>
            {collections.slice(1, collections.length).map((collection) => (
              <div
                key={collection.collection_id}
                className={`relative max-w-[594px] h-[337px]  md:h-[276px] w-full shadow-md hover:shadow-lg transition-shadow`}
              >
                <Image
                  src={collection.image_url}
                  alt={collection.description || "Collection image"}
                  width={594}
                  height={276}
                  className="w-full h-full rounded-lg object-cover"
                />
                <div className={`absolute z-50 bottom-0 left-0 p-4 text-white`}>
                  <p>{collection.name}</p>
                  <p>{collection.description}</p>
                </div>
                <div
                  className={`absolute top-0 left-0 w-full cursor-pointer h-full filter-collection opacity-40 hover:opacity-60 transition-opacity duration-300 ease-in-out`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Collections;
