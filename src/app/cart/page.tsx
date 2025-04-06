"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { X } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
      >
        Cart ({cart.length})
      </button>

      {/* Cart Panel */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gray-900 text-white p-6 z-50 shadow-lg overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-400 text-sm">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <>
              <div className="mt-6 text-xl font-bold">
                Total: ${total.toFixed(2)}
              </div>
              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded text-white font-semibold">
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="mt-2 w-full text-red-500 hover:underline"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
