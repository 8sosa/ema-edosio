// src/components/CartCheckout.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PaymentButton from "./PaymentButton";

export default function CartCheckout() {
  const { cart, clearCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading…</p>;
  if (!session?.user?.email)
    return <p>Please log in to checkout your cart.</p>;

  const email = session.user.email;
  const totalNaira = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const amountInKobo = Math.round(totalNaira * 100);

  const handleSuccess = () => {
    clearCart();
    router.push("/thank-you");
  };

  return (
  <form>
    <PaymentButton
      email={email}
      amount={amountInKobo}
      onSuccess={handleSuccess}
    />
  </form>
  );
}
