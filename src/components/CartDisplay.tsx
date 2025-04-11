"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function CartDisplay() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="body">Your cart is empty.</p>;
  }

  return (
    <div className="p-4 border rounded-md body">
      <h2 className="text-xl font-bold mb-4 title">Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p>
                ${item.price} x {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={clearCart}
        className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
      >
        Clear Cart
      </button>
    </div>
  );
}
