import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import { ObjectId } from "mongodb";

// Define the types for the request payload
interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderRequest {
  items: OrderItem[];
  totalAmount: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: OrderRequest = await req.json(); // Use req to get JSON data
    console.log("Order POST payload:", body);
    const { items, totalAmount } = body;

    // Check if user exists by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate items, ensuring productId is valid and price exists.
    const validatedItems = items.map((item) => {
      if (!ObjectId.isValid(item.productId)) {
        throw new Error(`Invalid productId: ${item.productId}`);
      }
      if (item.price === undefined) {
        throw new Error(`Missing price for productId: ${item.productId}`);
      }
      return {
        productId: item.productId,  // use the valid productId string directly
        quantity: item.quantity,
        priceAtPurchase: item.price,  // price should be available from the payload
      };
    });

    // Create a new order using the user's id from the database, using the validated items directly
    const order = await prisma.order.create({
      data: {
        userId: user.id, // Use the id from the found user
        totalAmount,
        items: {
          create: validatedItems,  // Use validatedItems directly
        },
      },
    });

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating order:", error.message);
      return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        orders: {
          include: {
            items: {
              include: {
                product: true, // Optional: only if you want to get product names
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const orders = user.orders.map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        id: item.id,
        name: item.product?.name || "Unknown Product",
        quantity: item.quantity,
        price: item.priceAtPurchase,
      })),
    }));

    return NextResponse.json(orders, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching orders:", error.message);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
