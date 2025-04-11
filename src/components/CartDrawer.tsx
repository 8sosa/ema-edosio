// CartDrawer.tsx
"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
    
  const {
    cart,
    removeFromCart,
    clearCart,
    isCartOpen,
    closeCart,
  } = useCart();


  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-50 p-6 shadow-lg overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="title text-2xl font-bold">Your Cart</h2>
              <button onClick={closeCart}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 text-black">
                {cart.map((item) => {
                      console.log("image URL:", item.image);
                      return (
                  <div
                    key={item.id}
                    className="border-b pb-2 flex justify-between body"
                  >
                    <div>
                      <div className="relative w-full aspect-[1/1] bg-gray-100 rounded-md overflow-hidden">
                        <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-black-600">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <button
                      className="text-sm text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                      )
                })}

                <div className="mt-4 font-semibold">
                  Total: ${total.toFixed(2)}
                </div>

                <button
                  className="bg-red-600 text-white px-4 py-2 mt-4 rounded"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
