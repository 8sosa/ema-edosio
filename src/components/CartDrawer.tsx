"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PaymentButton from "./PaymentButton"; // Import PaymentButton

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, isCartOpen, closeCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  // State for shipping details
  const [showModal, setShowModal] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  // State indicating whether we've submitted shipping details and are ready for payment.
  const [isProcessing, setIsProcessing] = useState(false);

  const email = session?.user?.email;
  if (!email) {
    return (
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-50 p-6 shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <p>Please log in to checkout.</p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Sign In
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const amountInKobo = Math.round(total * 100);

  // Payment success handler – clears cart and redirects to thank-you page.
  const handlePaymentSuccess = async () => {
    clearCart();
    closeCart();
    router.push("/thank-you");
  };

  // Handles submission of shipping details and creates the order in the backend.
  const handleShippingDetailsSubmit = async () => {
    if (
      shippingDetails.address &&
      shippingDetails.city &&
      shippingDetails.postalCode
    ) {
      const orderData = {
        userId: session.user.id,
        items: cart.map(item => ({
          productId: item.id, // assuming item.id is in the correct format
          quantity: item.quantity,
          price: item.price,
        })),
        shippingDetails,
        totalAmount: total,
        status: "pending", // Payment not done yet
      };

      // Create the order in the backend
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        alert("There was an issue creating your order.");
        return;
      }
      const order = await response.json();
      console.log("Order created:", order);
      // Now that order creation has succeeded, we trigger the payment phase.
      setIsProcessing(true);
    } else {
      alert("Please fill in all the shipping details.");
    }
  };

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

          {/* Cart Drawer */}
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
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-b pb-4 flex justify-between"
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
                      <p className="text-sm text-gray-600">
                        ₦{item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <button
                      className="text-sm text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="mt-4 font-semibold">
                  Total: ₦{total.toLocaleString()}
                </div>

                {/* Button to open the shipping modal */}
                <button
                  onClick={() => {
                    console.log("Proceed to Checkout clicked");
                    setShowModal(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>

          {/* Shipping Details Modal */}
          <AnimatePresence>
            {isCartOpen && showModal && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)} // Close modal if clicked outside
                key="modal-overlay"
              />
            )}

            {isCartOpen && showModal && (
              <motion.div
                className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white text-black z-50 p-6 shadow-lg overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                key="shipping-modal"
              >
                {/* // Shipping Details Modal Section */}
                {!isProcessing ? (
                  <>
                    <h3 className="text-2xl font-semibold pb-10">Enter Shipping Details</h3>
                    <div className="mt-4">
                      <label className="block mb-2">Address</label>
                      <input
                        type="text"
                        className="border p-2 w-full mb-2"
                        value={shippingDetails.address}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, address: e.target.value })
                        }
                        placeholder="Enter your address"
                      />
                      <label className="block mb-2">City</label>
                      <input
                        type="text"
                        className="border p-2 w-full mb-2"
                        value={shippingDetails.city}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, city: e.target.value })
                        }
                        placeholder="Enter your city"
                      />
                      <label className="block mb-2">Postal Code</label>
                      <input
                        type="text"
                        className="border p-2 w-full mb-2"
                        value={shippingDetails.postalCode}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, postalCode: e.target.value })
                        }
                        placeholder="Enter your postal code"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        className="text-red-500"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleShippingDetailsSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                ) : (
                  // Render the PaymentButton in place of the Submit button when processing
                  <>
                    <h3 className="text-2xl font-semibold pb-10">Make your Payment</h3>
                    <div className="mt-4">
                      <PaymentButton
                        email={email}
                        amount={amountInKobo}
                        onSuccess={handlePaymentSuccess}
                      />
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
