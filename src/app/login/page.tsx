"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setErrorMsg(result.error);
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 text-white flex items-center justify-center flex-col p-12">
        <div className="text-4xl font-bold mb-2">Welcome Back!</div>
        {/* Optional logo */}
        <div className="mt-4">
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0L12.4 6H18L13.5 9.9L15.9 16L10 12.2L4.1 16L6.5 9.9L2 6H7.6L10 0Z" />
          </svg>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-1">Login</h2>
          <p className="text-gray-500 mb-6">
            Welcome back! Please login to your account.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">User Name</label>
              <input
                type="email"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-600" />
                Remember Me
              </label>
              <a href="#" className="text-purple-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded w-full font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
          </form>
          <p className="text-sm mt-6 text-gray-600">
            New User?{" "}
            <Link href="/signup" className="text-purple-600 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
