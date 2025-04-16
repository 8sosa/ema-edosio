// src/app/api/verify/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { reference } = body;

  try {
    console.log("Received payment verification request:", body);

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Paystack verification failed with status:", response.status);
      return NextResponse.json({ verified: false, error: "Failed to verify payment." }, { status: 500 });
    }

    const data = await response.json();
    console.log("Paystack verification response:", data);

    if (data?.data?.status === "success") {
      return NextResponse.json({ verified: true, data: data.data }, { status: 200 });
    } else {
      console.error("Payment verification failed:", data?.data?.status);
      return NextResponse.json({ verified: false, error: data?.data?.status }, { status: 400 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during payment verification:", error.message);
      return NextResponse.json({ verified: false, error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error during payment verification:", error);
      return NextResponse.json({ verified: false, error: "Unknown error" }, { status: 500 });
    }
  }
}
