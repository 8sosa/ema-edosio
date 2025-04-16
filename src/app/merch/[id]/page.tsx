"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

// Define the Item interface for your merchandise data
interface Item {
  _id: ObjectId;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  image: string;
  images?: { [key: string]: string };
  tag?: string[];
  rating?: number;
}

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  // For the modal: selected image and modal state
  const [modalImage, setModalImage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // State for recommended products
  const [recommended, setRecommended] = useState<Item[]>([]);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

  // Fetch the specific item data based on the URL id.
  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const res = await fetch(`/api/merchandise/${id}`);
          const data = await res.json();
          const itemData = data as Item;
          if (itemData.images && Object.values(itemData.images).length > 0) {
            setModalImage(Object.values(itemData.images)[0]);
          } else {
            setModalImage(itemData.image);
          }
          setItem(itemData);
        } catch (error) {
          console.error("Error fetching item data", error);
        }
      };

      fetchItem();
    }
  }, [id]);

  // Once the item is loaded, fetch recommended products from all merchandise.
  useEffect(() => {
    if (item) {
      const fetchRecommended = async () => {
        try {
          const res = await fetch("/api/merchandise");
          const allItems = (await res.json()) as Item[];
          const recItems = allItems
            .filter((p: Item) => p.category === item.category && p._id !== item._id)
            .slice(0, 4);
          setRecommended(recItems);
        } catch (error) {
          console.error("Error fetching recommended items", error);
        }
      };

      fetchRecommended();
    }
  }, [item]);

  const handleAdd = () => {
    if (!item) return;

    const newItem = {
      id: item._id.toString(),
      title: item.name,
      price: item.price,
      quantity: quantity,
      image: item.image,
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

  return (
    <main className="max-w-screen-xl pt-20 lg:pt-20 mx-auto p-4 sm:p-6 lg:p-8 text-white">
      {/* Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <div
            className="relative max-w-3xl w-full aspect-[1/1]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal image area
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10"
            >
              &times;
            </button>
            <Image
              src={modalImage}
              alt="Modal Image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-200">
        <button onClick={() => router.back()} className="underline hover:text-gray-300">
          &larr; Back
        </button>
      </div>

      {/* Main Section: Images + Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Thumbnails column */}
        {item.images && Object.values(item.images).length > 0 && (
          <div className="hidden md:flex flex-col gap-2 w-16">
            {Object.values(item.images).map((img, index) => (
              <div
                key={index}
                className="relative w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-300"
                onClick={() => {
                  setModalImage(img);
                  setShowModal(true);
                }}
              >
                <Image
                  src={img}
                  alt={`${item.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="w-full md:w-1/2 lg:w-1/2 relative max-w-lg mx-auto aspect-square bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-4 mx-auto md:mx-0">
          <h1 className="text-2xl sm:text-3xl font-bold title">{item.name}</h1>
          <p className="text-sm text-gray-400">{item.description}</p>
          <div className="text-3xl font-semibold text-green-100">
            ${item.price.toFixed(2)}
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(item.rating || 4)].map((_, i) => (
              <AiFillStar key={i} />
            ))}
            <span className="ml-2 text-sm text-gray-300">
              {(item.rating || 4).toFixed(1)} Rating
            </span>
          </div>
          {/* Size Selector */}
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Select Size</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded text-sm border transition-colors ${
                      isSelected
                        ? "border-white bg-white text-black"
                        : "border-gray-500 text-gray-100 hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

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
              className="w-16 p-1 border border-gray-500 rounded text-white bg-black"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={handleAdd}
              className="bg-white text-black font-semibold px-4 py-3 rounded hover:bg-gray-200 transition"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 border-t border-gray-600 pt-6 text-sm text-gray-100 space-y-2">
        <p>
          <strong>Category:</strong> {item.category}
        </p>
        {item.tag && (
          <p>
            <strong>Tags:</strong> {item.tag.join(", ")}
          </p>
        )}
        <p>
          <strong>Shipping:</strong> Only available in Lagos, Nigeria.
        </p>
        <p>
          <strong>Returns:</strong> 30-day return policy
        </p>
      </div>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <div className="mt-10 border-t border-gray-600 pt-6">
          <h2 className="text-xl font-semibold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommended.map((recItem) => (
              <div
                key={recItem._id.toString()}
                onClick={() => router.push(`/merch/${recItem._id}`)}
                className="cursor-pointer rounded-md p-4 hover:shadow-md transition flex flex-col bg-gray-800"
              >
                <div className="relative w-full aspect-square bg-gray-200 rounded overflow-hidden">
                  <Image
                    src={recItem.image}
                    alt={recItem.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
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
