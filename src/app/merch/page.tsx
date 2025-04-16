"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import "./page.css";

// Define the Item interface for your merchandise data
interface Item {
  _id: ObjectId;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  tag: string[];
  quantity: number;
}

const categories = [
  { id: 1, name: "TEES" },
  { id: 2, name: "TOTE BAGS" },
  { id: 3, name: "STICKERS" },
  { id: 4, name: "KEY CHAINS" },
];

export default function HomePage() {
  const [merchItems, setMerchItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const res = await fetch("/api/merchandise");
        const data = await res.json();
        setMerchItems(data);
      } catch (err) {
        console.error("Failed to load merchandise:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMerch();
  }, []);

  // Refs for category sections
  const categoryRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});

  // Initialize refs
  if (Object.keys(categoryRefs.current).length === 0) {
    categories.forEach((category) => {
      categoryRefs.current[category.name] = React.createRef<HTMLDivElement>();
    });
  }

  const handleCategoryClick = (catName: string) => {
    categoryRefs.current[catName].current?.scrollIntoView({ behavior: "smooth" });
  };

  const ProductCard = ({ item }: { item: Item }) => (
    <Link href={`/merch/${item._id}`}>
      <div className="flex flex-col w-full cursor-pointer">
        <div className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-md font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen bg-black text-white">
        <p>Loading merchandise...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col md:flex-row pt-10">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5 p-4 md:sticky md:top-40 self-start bg-black text-white">
        <div className="p-6 rounded-md border mb-6">
          <TfiLayoutLineSolid className="text-red-500 mb-2" />
          <h3 className="font-bold mb-4 text-xl sm:text-2xl md:text-3xl">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className="text-white hover:underline text-sm sm:text-base md:text-lg w-full text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Content */}
      <div className="w-full md:w-3/4 lg:w-4/5 p-4 space-y-12 pt-20">
        {categories.map((cat) => {
          const items = merchItems.filter((item) => item.category === cat.name);
          return (
            <section
              key={cat.id}
              ref={categoryRefs.current[cat.name]}
              className="py-12 px-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{cat.name}</h2>
              {items.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((item, idx) => (
                    <ProductCard key={idx} item={item} />
                  ))}
                </div>
              ) : (
                <p>No items available in this category.</p>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
