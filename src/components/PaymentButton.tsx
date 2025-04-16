"use client";
import { useEffect } from "react";

interface PaymentButtonProps {
  email: string;
  amount: number;
  onSuccess: () => void;
}

// Define a type for the Paystack response
interface PaystackResponse {
  reference: string;
}

export default function PaymentButton({
  email,
  amount,
  onSuccess,
}: PaymentButtonProps) {
  useEffect(() => {
    console.log("🔑 Paystack key:", process.env.NEXT_PUBLIC_TEST_PAYSTACK_PUBLIC_KEY);
    
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Email validation function
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const payWithPaystack = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the form from submitting

    console.log("User Details:");
    console.log("Email:", email);
    console.log("Amount:", amount);

    if (!window.PaystackPop) {
      alert("Paystack script not loaded!");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Invalid payment amount.");
      return;
    }

    if (!email || !isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_TEST_PAYSTACK_PUBLIC_KEY!,
      email,
      amount,             // in kobo
      currency: "NGN",
      ref: `PS_${Date.now()}`,
      onClose: () => console.log("Payment closed"),
      callback: (res: PaystackResponse) => {
        console.log("Payment successful:", res.reference);
        onSuccess();
      },
    });

    handler.openIframe();
  };

  return (
    <form>
      <button
        onClick={payWithPaystack}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Pay ₦{(amount / 100).toLocaleString()}
      </button>
    </form>
  );
}
