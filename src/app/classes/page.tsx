"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Home from "../../images/home.jpg";

type Module = {
  id: string;
  title: string;
  module: string;
  intro: string;
  masterclassId: string; // Add masterclassId to Module type
};

type PaystackResponse = {
  reference: string;
  status: string;
  message: string;
  // Add any other fields you expect in the response
};

export default function MasterclassesPage() {
  const { data: session, status } = useSession();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [masterclassId, setMasterclassId] = useState<string | null>(null); // Store masterclassId

  useEffect(() => {
    const loadPaystackScript = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject("Failed to load Paystack script");
        document.body.appendChild(script);
      });
    };

    loadPaystackScript()
      .then(() => {
        console.log("Paystack script loaded successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchMasterclassIdAndModules = async () => {
      if (!session) {
        setHasAccess(false);
        setLoading(false);
        return;
      }
  
      try {
        // Fetch modules to get the masterclassId
        const modulesRes = await fetch("/api/get-modules");
        const modulesData = await modulesRes.json();
        setModules(modulesData.modules || []);
  
        // Find the first valid module with a non-null masterclassId
        const validModule = modulesData.modules.find(
          (module: { masterclassId: string | null }) => module.masterclassId !== null
        );
        console.log(validModule)
        const masterclassId = validModule ? validModule.masterclassId : null;
        setMasterclassId(masterclassId);
        if (!masterclassId) {
          console.error("No valid masterclassId found in modules.");
          return;
        }
  
        // Now that we have the masterclassId, proceed with checking access
        const accessRes = await fetch("/api/check-masterclass-access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session.user.id }),
        });
  
        const accessData = await accessRes.json();
        setHasAccess(accessData.hasAccess);
  
        // If the user has access, you can fetch the modules and show them
        if (accessData.hasAccess) {
          setModules(modulesData.modules || []);
        }
      } catch (error) {
        console.error("Failed to fetch modules or access", error);
        setHasAccess(false);
      }
  
      setLoading(false);
    };
  
    if (status !== "loading") {
      fetchMasterclassIdAndModules();
    }
  }, [session, status]);

  const handlePay = () => {
    const publicKey = process.env.NEXT_PUBLIC_TEST_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      console.error("Paystack public key is missing.");
      return;
    }

    if (!session?.user?.email) {
      console.error("Please sign in to proceed.");
      return;
    }

    const callback = function (response: PaystackResponse) {
      (async () => {
        try {
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
            await fetch("/api/access", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: session?.user?.email,
                masterclassId: masterclassId, // Use the dynamic masterclassId
                grantAccess: true,
              }),
            });
            console.log({
              email: session?.user?.email,
              masterclassId: masterclassId,
              grantAccess: true,
            });
            console.log("Access granted! Reloading...");
            setHasAccess(true);
            const modulesRes = await fetch("/api/get-modules");
            const modulesData = await modulesRes.json();
            setModules(modulesData.modules || []);
          } else {
            console.error("Payment verification failed");
          }
        } catch (err) {
          console.error("Payment processing error", err);
        }
      })();
    };

    if (typeof window !== "undefined" && window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: session.user.email,
        amount: 10000000, // ₦100,000 in kobo
        currency: "NGN",
        onClose: () => {
          console.log("Payment popup closed");
        },
        callback,
      });

      handler.openIframe();
    } else {
      console.error("Paystack script is not loaded properly.");
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full aspect-[15/7] bg-gradient-to-r from-gray-800 to-black text-white flex justify-center">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h1 className="text-6xl md:text-5xl font-bold mb-4 title">
              Learn the Process. Build Your Voice. Tell Your Story.
            </h1>
            <p className="mb-1 text-lg body">
              This course is a step-by-step guide to how I make films — from the first idea to the final cut.
            </p>
            <p className="mb-6 text-lg body">
              This is not theory — this is real-world filmmaking.
            </p>
            <Link
              href="#modules"
              className="inline-block bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition body"
            >
              Learn More
            </Link>
          </div>
          <div className="flex-1 mt-8 md:mt-0 md:flex md:justify-end">
            <Image
              src={Home}
              alt="Film Camera or Director"
              className="rounded-md shadow-lg max-w-xs md:max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 bg-white text-black" id="modules">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : hasAccess ? (
            <>
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold mb-4 title">
                  Masterclass Modules Overview
                </h2>
                <p className="text-gray-600 body">
                  Explore the comprehensive modules designed to guide you from the creative process to monetization.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="p-6 border rounded-md hover:shadow-lg transition"
                  >
                    <h3 className="text-2xl py-5 font-bold mb-2 title">
                      {module.module}: {module.title}
                    </h3>
                    <p className="text-gray-600 mb-4 pb-5 body">
                      {module.intro}
                    </p>
                    <Link
                      href={`/classes/${module.id}`}
                      className="inline-block bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition body"
                    >
                      Learn More
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 title">
                Join the Masterclass
              </h2>
              <p className="text-gray-600 mb-6 body">
                You don&apos;t currently have access to this course. Make a one-time payment below to unlock lifetime access.
              </p>
              <button
                onClick={handlePay}
                disabled={!session}
                className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition body"
              >
                {session ? "Pay ₦100,000 to Join Now" : "Sign in to Pay"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
