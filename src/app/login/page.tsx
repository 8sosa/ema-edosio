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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-600 text-white rounded w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}
      <p className="mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 underline">
          Sign up here.
        </Link>
      </p>
    </div>
  );
}
