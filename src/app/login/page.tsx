"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
// import Image from "next/image"; // Import Image from next/image


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
      console.log(errorMsg)
    } else {
      window.location.href = "/";
    }
  };
  // const handleOAuthSignIn = (provider: string) => {
  //   signIn(provider, { callbackUrl: "/dashboard" });
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 to-black p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Left Side */}
        <div className="w-1/2 bg-[url('/background-image.jpg')] bg-cover bg-center text-black p-10 hidden md:flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Create your Account</h2>
          <p className="text-lg">Watch my films and join my masterclass!</p>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="text-black w-full md:w-1/2 p-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Sign In</h3>
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

          {/* <div className="my-6 flex items-center justify-center text-sm text-gray-500">
            <span className="mx-2">or</span>
          </div>

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
    </div>  );
}
