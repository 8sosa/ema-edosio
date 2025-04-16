"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/filmography");
  };

  return (
    <footer className="bg-black text-white flex flex-col justify-center items-center">
      {/* Top Section */}
      <div className="topFooter max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12">
        {/* Image section */}
        <div className="hidden md:block md:w-1/3">
          <Image
            src="/images/ph.png"
            priority
            width={500}
            height={500}
            alt="Newsletter Illustration"
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>

        {/* Text and form section */}
        <div className="md:w-2/3 flex flex-col justify-center space-y-6">
          <p className="text-gray-400 text-sm tracking-wide">Subscribe & Get My Free Book</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">Ema&rsquo;s Newsletter</h2>
          <p className="text-gray-400 tracking-wide">
            Join my mailing list and get a free copy of <strong>Visual Storytelling</strong>.
          </p>
          <p className="text-gray-400 tracking-wide">
            Sign up to stay connected and get exclusive updates, resources, and more.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-gray-400 text-sm">
              Enter your email to get the book.<span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col md:flex-row gap-10">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="inputLine1 w-full md:w-1/2 px-4 py-3 text-black"
              />
              <button
                type="submit"
                className="btn-primary"
              >
                Subscribe <LiaTelegramPlane size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black max-w-md w-full p-8 rounded-xl shadow-xl space-y-6 text-center">
            <h3 className="text-2xl font-bold">Thank You for Subscribing!</h3>
            <p>
              Your free copy of <strong>Visual Storytelling</strong> is on its way to your inbox.
            </p>
            <p>
              Keep an eye on your email for updates, resources, and behind-the-scenes stories I only share with my community.
            </p>
            <p>I’m glad you’re here.</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className="bottomFooter border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Ema Edosio, All Rights Reserved.
          </p>
          <ul className="flex space-x-6 text-xl gap-5">
            <li>
              <a
                href="https://www.instagram.com/emaedosio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/user/EmaEdosio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </li>
            <li>
              <a
                href="https://web.facebook.com/p/Ema-Edosio-Deelen-100083753704671/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/emaedosio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
                aria-label="Twitter"
              >
                <FaXTwitter />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
