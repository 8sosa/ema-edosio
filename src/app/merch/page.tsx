"use client"

import { useState, useRef, useEffect, RefObject } from "react";
import Image from "next/image";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import Merchandise from "@/components/merch.json";
import "./page.css";

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
  // State to track which tag is selected (if any)
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Create a ref for each category section for scrolling
  const categoryRefs: Record<string, RefObject<HTMLDivElement | null>> = categories.reduce(
    (acc, category) => {
      acc[category.name] = useRef<HTMLDivElement>(null);
      return acc;
    },
    {} as Record<string, RefObject<HTMLDivElement | null>>
  );

  // Ref for the tag section
  const tagSectionRef = useRef<HTMLDivElement>(null);

  // Handler for category click – scroll to the respective section
  const handleCategoryClick = (catName: string) => {
    categoryRefs[catName].current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handler for tag click – set the selected tag and scroll to tag section
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  // Scroll to the tag section when selectedTag changes and is not null
  useEffect(() => {
    if (selectedTag) {
      tagSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTag]);

  // Helper to render a product card
  const ProductCard = ({ item }: { item: any }) => (
    <div className="flex flex-col w-full">
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
  );

  return (
    <main className="flex flex-col md:flex-row py-15">
      {/* Aside - on mobile this will be at the top, on desktop on the left */}
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

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 space-y-12">
        {/* New Arrivals Section */}
        <section className="py-12 px-6 max-w-8xl">
          <h2 className="title text-2xl md:text-3xl font-bold mb-6 text-center">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Merchandise.merchandise.slice(0, 8).map((item, idx) => (
              <ProductCard key={idx} item={item} />
            ))}
          </div>
        </section>

        {/* Sections for each category */}
        {categories.map((cat) => {
          const items = Merchandise.merchandise.filter(
            (item: any) => item.category === cat.name
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
                  {items.map((item: any, idx: number) => (
                    <ProductCard key={idx} item={item} />
                  ))}
                </div>
              ) : (
                <p>No items available in this category.</p>
              )}
            </section>
          );
        })}

        {/* Tag filtered items section */}
        {selectedTag && (
          <section
            ref={tagSectionRef}
            className="py-12 px-6 max-w-8xl border-t pt-12"
          >
            <h2 className="title text-2xl md:text-3xl font-bold mb-6">
              {selectedTag}
            </h2>
            {Merchandise.merchandise.filter((item: any) =>
              item.tag.includes(selectedTag)
            ).length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Merchandise.merchandise
                  .filter((item: any) => item.tag.includes(selectedTag))
                  .map((item: any, idx: number) => (
                    <ProductCard key={idx} item={item} />
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
