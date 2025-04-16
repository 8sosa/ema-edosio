"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

interface Masterclass {
  id: string;
  title: string;
  access: boolean;
}

interface UserDetails {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [classes, setClasses] = useState<Masterclass[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      Promise.all([
        fetch("/api/user").then((res) => res.json()),
        fetch("/api/orders").then((res) => res.json()),
        fetch("/api/masterclasses").then((res) => res.json()),
      ]).then(([userData, ordersData, classesData]) => {
        const updatedOrders = ordersData.map((order: Order) => ({
          ...order,
          items: order.items || [], // Ensure items is always an array
        }));
        setUserDetails(userData);
        setOrders(updatedOrders);
        setClasses(classesData);
        setLoading(false);
      });
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white px-10 pt-40">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Welcome, {userDetails?.name || "Friend"}</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
        <div className="bg-white text-black p-6 rounded-lg shadow">
          <p><span className="font-semibold">Name:</span> {userDetails?.name}</p>
          <p><span className="font-semibold">Email:</span> {userDetails?.email}</p>
          <p><span className="font-semibold">Phone:</span> {userDetails?.phone || "N/A"}</p>
          <p><span className="font-semibold">Address:</span> {userDetails?.address || "N/A"}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Orders</h2>
        <div className="bg-white text-black p-6 rounded-lg shadow">
          {orders.length ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="border-b pb-4">
                  <p className="font-semibold">
                    Order placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <ul className="pl-4 list-disc">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} × {item.quantity} — ${item.price}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-semibold">Total: ${order.totalAmount.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Masterclass Access</h2>
        <div className="bg-white text-black p-6 rounded-lg shadow">
          {classes.length ? (
            <ul className="space-y-2">
              {classes.map((c) => (
                <li key={c.id} className="flex items-center justify-between">
                  <span>{c.title}</span>
                  {c.access ? (
                    <span className="text-green-600 font-semibold">Access Granted</span>
                  ) : (
                    <a
                      href={`/classes/${c.id}`}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Get Access
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No masterclasses available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
