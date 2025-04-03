"use client";

import React, { useState, useEffect, useMemo, RefObject, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import Merchandise from "@/components/merch.json";
import "../page.css";

// Define an Item interface for your merchandise data
interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  tag: string[];
  quantity: number;
}

const categories = [
  { id: 1, name: "Shirts" },
  { id: 2, name: "Jackets" },
  { id: 3, name: "Trousers" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Stickers" },
  { id: 6, name: "miscellaneous" },
];

const tags = ["When Nigeria Happens", "Otiti", "Kasala"];

export default function HomePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Build refs for each category using React.createRef inside useMemo.
  // This ensures we aren’t calling hooks inside a loop or callback.
  const categoryRefs: Record<string, React.RefObject<HTMLDivElement | null>> = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    categories.forEach((category) => {
      refs[category.name] = React.createRef<HTMLDivElement>(); // This is fine
    });
    return refs;
  }, [categories]); // Add `categories` to the dependency array
  

  // Create a ref for the tag section; use React.createRef since this isn’t a hook.
  const tagSectionRef = useRef<HTMLDivElement | null>(null);

  // Handler for category click – scrolls to the respective section.
  const handleCategoryClick = (catName: string) => {
    categoryRefs[catName].current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handler for tag click – set the selected tag.
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  // When selectedTag changes, scroll to the tag section.
  useEffect(() => {
    if (selectedTag && tagSectionRef.current) {
      tagSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTag]);

  // ProductCard component with navigation to the item detail page.
  const ProductCard = ({ item }: { item: Item }) => (
    <Link href={`/merch/${item.id}`} passHref>
      <div className="flex flex-col w-full cursor-pointer">
        <div className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
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

  return (
    <main className="flex flex-col md:flex-row py-15">
      {/* Aside Section for Categories and Tags */}
      <aside className="w-full md:w-1/4 p-4">
        {/* Categories */}
        <div className="p-6 rounded-md border mb-6">
          <TfiLayoutLineSolid className="red line mb-2" />
          <h3 className="text-xl font-bold mb-4 title">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className="text-white hover:underline text"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Tags */}
        <div className="p-6 rounded-md border">
          <TfiLayoutLineSolid className="red line mb-2" />
          <h3 className="text-xl font-bold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 body"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Section */}
      <div className="w-full md:w-3/4 p-4 space-y-12">
        {/* New Arrivals */}
        <section className="py-12 px-6 max-w-8xl">
          <h2 className="title text-2xl md:text-3xl font-bold mb-6 text-center">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(Merchandise.merchandise as Item[]).slice(0, 8).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Sections for Each Category */}
        {categories.map((cat) => {
          const items = (Merchandise.merchandise as Item[]).filter(
            (item) => item.category === cat.name
          );
          return (
            <section
              key={cat.id}
              ref={categoryRefs[cat.name]}
              className="py-12 px-6 max-w-8xl"
            >
              <h2 className="title text-2xl md:text-3xl font-bold mb-6">
                {cat.name}
              </h2>
              {items.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p>No items available in this category.</p>
              )}
            </section>
          );
        })}

        {/* Tag Filtered Items Section */}
        {selectedTag && (
          <section
            ref={tagSectionRef}
            className="py-12 px-6 max-w-8xl border-t pt-12"
          >
            <h2 className="title text-2xl md:text-3xl font-bold mb-6">
              {selectedTag}
            </h2>
            {(Merchandise.merchandise as Item[]).filter((item) =>
              item.tag.includes(selectedTag)
            ).length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(Merchandise.merchandise as Item[])
                  .filter((item) => item.tag.includes(selectedTag))
                  .map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
              </div>
            ) : (
              <p>No items found for this tag.</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
