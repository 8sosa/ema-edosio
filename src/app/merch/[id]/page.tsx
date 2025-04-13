"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

// Define your item interface based on your JSON structure.
interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  image: string;
  images?: {
    [key: string]: string;
  };
  tag?: string[];
  rating?: number;
}

// Define the overall merchandise data shape
interface MerchandiseData {
  merchandise: Item[];
}

// Import your JSON and assert its type
import rawMerch from "@/components/merch.json";
const Merchandise = rawMerch as MerchandiseData;

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundItem = Merchandise.merchandise.find(
        (itm: Item) => itm.id === Number(id)
      );
      if (foundItem) {
        setItem(foundItem);
      } else {
        console.error("Item not found");
      }
    }
  }, [id]);

  const handleAdd = () => {
    if (!item) return;

    const newItem = {
      id: item.id.toString(),
      title: item.name,
      price: item.price,
      quantity: quantity,
      image: item.image
    };

    addToCart(newItem);
    console.log("added", newItem);
  };

  if (!item) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen text-white">
        Loading item details...
      </div>
    );
  }

  // Filter recommended items: same category, not the current item.
  const recommended: Item[] = Merchandise.merchandise
    .filter((p: Item) => p.category === item.category && p.id !== item.id)
    .slice(0, 4);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-15 text-white">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-200 body">
        <button onClick={() => router.back()} className="underline">
          &larr; Back
        </button>
      </div>

      {/* Main Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Image */}
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

        {/* Product Details */}
        <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-4 body">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 title">
              {item.name}
            </h1>
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(item.rating || 4)].map((_, i) => (
                <AiFillStar key={i} />
              ))}
              <span className="ml-2 text-sm text-gray-200">
                {(item.rating || 4).toFixed(1)} Rating
              </span>
            </div>
          </div>

          <div className="text-3xl font-semibold text-green-100">
            ${item.price.toFixed(2)}
          </div>

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
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-1 border rounded text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
            <button className="border border-red-600 text-gray-100 px-4 py-2 rounded hover:bg-red-700 transition">
              Buy Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 border-t pt-4 text-sm text-gray-100 space-y-2">
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            {item.tag && (
              <p>
                <strong>Tags:</strong> {item.tag.join(", ")}
              </p>
            )}
            <p>
              <strong>Shipping:</strong> Free shipping on orders over $100
            </p>
            <p>
              <strong>Returns:</strong> 30-day return policy
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4 title">Product Details</h2>
        <p className="text-gray-200 body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
          mauris eget felis euismod, et placerat velit fermentum.
        </p>
      </div>

      {/* More Images Section */}
      {item.images && Object.values(item.images).length > 0 && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-6 title">More Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.values(item.images).map((img, index) => (
              <div
                key={index}
                className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${item.name} - image ${index + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <div className="mt-10 border-t pt-6 body">
          <h2 className="text-xl font-semibold mb-6 body">You may also like</h2>
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
                  <h3 className="font-semibold text-gray-200">
                    {recItem.name}
                  </h3>
                  <p className="text-gray-100">
                    ${recItem.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
