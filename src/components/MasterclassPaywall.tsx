"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface MasterclassPaywallProps {
  masterclassId: string;
  amount: number; // Amount in kobo
  children: React.ReactNode;
}

// Define a type for the Paystack response
interface PaystackResponse {
  reference: string;
}

export default function MasterclassPaywall({
  masterclassId,
  amount,
  children,
}: MasterclassPaywallProps) {
  const { data: session } = useSession();
  const [userHasAccess, setUserHasAccess] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }

    const checkAccess = async () => {
      try {
        const response = await fetch("/api/check-masterclass-access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            masterclassId,
          }),
        });

        const data = await response.json();
        if (data.hasAccess) {
          setUserHasAccess(true);
        }
      } catch (error) {
        console.error("Error checking access:", error);
      }
    };

    if (session?.user?.id) {
      checkAccess();
    }
  }, [masterclassId, session]);

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference, email }),
      });

      const data = await response.json();
      console.log("Payment verification response:", data);

      if (data.verified) {
        // Grant access to the user for the masterclass
        const updateResponse = await fetch("/api/access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, masterclassId, grantAccess: true }),
        });

        const updateData = await updateResponse.json();

        if (updateData.success) {
          setUserHasAccess(true);
          console.log("User access updated:", updateData);
        } else {
          console.error("Failed to update user access in the database.");
        }
      } else {
        console.error("Payment verification failed:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  const payWithPaystack = (event: React.MouseEvent) => {
    event.preventDefault();
    if (userHasAccess) {
      alert("You already have access to this masterclass.");
      return;
    }

    if (!window.PaystackPop) {
      alert("Paystack script not loaded!");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Invalid payment amount.");
      return;
    }

    setIsPaymentLoading(true); // Set loading state to true

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_TEST_PAYSTACK_PUBLIC_KEY!,
      email,
      amount,
      currency: "NGN",
      ref: `PS_${Date.now()}`,
      onClose: () => {
        console.log("Payment closed");
        setIsPaymentLoading(false); // Set loading state to false when payment closes
      },
      callback: (res: PaystackResponse) => {
        console.log("Payment successful:", res.reference);
        verifyPayment(res.reference);
        setIsPaymentLoading(false); // Set loading state to false when payment is verified
      },
    });

    handler.openIframe();
  };

  return (
    <div>
      {userHasAccess ? (
        <div>{children}</div>
      ) : (
        <div>
          <form>
            <button
              onClick={payWithPaystack}
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Pay ₦{(amount / 100).toLocaleString()}
            </button>
            {isPaymentLoading && <p>Processing payment...</p>}
          </form>
        </div>
      )}
    </div>
  );
}
