"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Merchandise from "@/components/merch.json";
import { AiFillStar } from "react-icons/ai";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string; // single image URL
  description?: string;
  category?: string;
  tag?: string[];
  rating?: number;
}

export default function ItemPage() {
  const { id } = useParams<{ id: string }>(); // Get dynamic id from URL
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (id) {
      const foundItem: Item | undefined = Merchandise.merchandise.find(
        (itm: Item) => itm.id === Number(id)
      );
      if (foundItem) {
        setItem(foundItem);
      } else {
        console.error("Item not found");
      }
    }
  }, [id]);

  if (!item) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        Loading item details...
      </div>
    );
  }

  // Recommended products of the same category, excluding the current item
  const recommended: Item[] = Merchandise.merchandise
    .filter((p: Item) => p.category === item.category && p.id !== item.id)
    .slice(0, 4);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-15">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-200">
        <button onClick={() => router.back()} className="underline">
          &larr; Back
        </button>
      </div>

      {/* Main Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Image */}
        <div className="md:col-span-5 lg:col-span-6">
          <div className="relative w-full aspect-[1/1] bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-4">
          {/* Title and Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{item.name}</h1>
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(item.rating || 4)].map((_, i: number) => (
                <AiFillStar key={i} />
              ))}
              <span className="ml-2 text-sm text-gray-200">
                {(item.rating || 4).toFixed(1)} Rating
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-semibold text-green-100">
            ${item.price.toFixed(2)}
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-gray-200 mt-2">{item.description}</p>
          )}

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center gap-4">
            <label htmlFor="quantity" className="font-semibold">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              defaultValue={1}
              min={1}
              className="w-16 p-1 border rounded"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Add to Cart
            </button>
            <button className="border border-red-600 text-gray-100 px-4 py-2 rounded hover:bg-red-700 transition">
              Buy Now
            </button>
          </div>

          {/* Additional Details */}
          <div className="mt-8 border-t pt-4 text-sm text-gray-100 space-y-2">
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Tags:</strong> {item.tag?.join(", ")}
            </p>
            <p>
              <strong>Shipping:</strong> Free shipping on orders over $100
            </p>
            <p>
              <strong>Returns:</strong> 30-day return policy
            </p>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <p className="text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
          mauris eget felis euismod, et placerat velit fermentum. Suspendisse
          potenti. Aliquam porta urna sit amet augue vulputate, at tempus sapien
          tempus. Phasellus ac orci a erat euismod tristique et eget metus.
        </p>
      </div>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommended.map((recItem: Item) => (
              <div
                key={recItem.id}
                onClick={() => router.push(`/merch/${recItem.id}`)}
                className="cursor-pointer rounded-md p-4 hover:shadow-md transition flex flex-col"
              >
                <div className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={recItem.image}
                    alt={recItem.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold text-gray-200">{recItem.name}</h3>
                  <p className="text-gray-100">${recItem.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
