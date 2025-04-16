"use client";
import { useState, useEffect } from "react";
import { 
  // signIn,
   useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Image from "next/image"; // Import Image from next/image

export default function SignupPage() {
  const { status } = useSession();  // Removed 'session' since it's not being used directly
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setMessage("Signup successful! You can now log in.");

    } else {
      setMessage("Error signing up.");
    }
    setLoading(false);
  };
  console.log(message)

  // const handleOAuthSignIn = (provider: string) => {
  //   signIn(provider, { callbackUrl: "/dashboard" });
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 to-black p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Left Side */}
        <div className="w-1/2 bg-[url('/images/WNH/still1.jpg')] bg-cover bg-center text-black p-10 hidden md:flex flex-col justify-center">
          {/* <h2 className="text-4xl font-bold mb-4">Create your Account</h2>
          <p className="text-lg">Watch my films and join my masterclass!</p> */}
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="text-black w-full md:w-1/2 p-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
            >
              {loading ? "Signing Up..." : "Join us →"}
            </button>
          </form>
          <p className="text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-activeblue hover:underline">
              Sign In
            </Link>
          </p>
          {/* <div className="my-6 flex items-center justify-center text-sm text-gray-500">
            <span className="mx-2">or</span>
          </div> */}
{/* 
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleOAuthSignIn("google")}
              className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Image src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" width={20} height={20} />
              Sign up with Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuthSignIn("apple")}
              className="w-full bg-black text-white py-3 rounded-md flex items-center justify-center hover:bg-gray-800 transition"
            >
              <Image src="/apple-icon.svg" alt="Apple" className="w-5 h-5 mr-2" width={20} height={20} />
              Sign up with Apple
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
