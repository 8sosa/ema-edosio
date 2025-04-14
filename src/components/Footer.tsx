"use client";
import React, { useState } from "react";
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
    <footer className="bg-black text-white">
      {/* Top Section */}
      <div className="container body mx-auto w-full lg:w-4/5 flex flex-col md:flex-row py-5 px-6 md:px-12 justify-center">
        <div className="flex">
          <div className="w-1 bg-white opacity-30 mr-6" />
          <div className="flex-1 space-y-6">
            <p className="text-gray-400 tracking-wide">Subscribe & Get My Free Book</p>
            <h2 className="text-5xl md:text-6xl font-bold">Ema&lsquo;s Newsletter</h2>
            <p className="text-gray-400 tracking-wide">Join my mailing list and get a free copy of Visual Storytelling.</p>
            <p className="text-gray-400 tracking-wide">Sign up to stay connected and get exclusive updates, resources, and more.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                  <label className="block mb-5 text-gray-400">
                    Enter your email to get the book.<span className="text-red-500">*</span>
                  </label>
              <div className="body flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <div className="w-full lg:w-1/2">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="inputLine"
                  />
                </div>
                <button
                  type="submit"
                  className="gap-10 cta-button rounded-full tracking-wide bg-white hover:bg-activeblue"
                >
                  Subscribe <LiaTelegramPlane size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black max-w-md w-full p-8 rounded-xl shadow-xl space-y-6 text-center">
            <h3 className="text-2xl font-bold">Thank You for Subscribing!</h3>
            <p>Your free copy of <strong>Visual Storytelling</strong> is on its way to your inbox.</p>
            <p>Keep an eye on your email for updates, resources, and behind-the-scenes stories I only share with my community.</p>
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
      <div className="border-t border-gray-700">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-6 md:px-12">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0 body">
            © {new Date().getFullYear()} Ema Edosio, All Rights Reserved.
          </p>
          <ul className="flex space-x-6">
            <li>
              <a
                href="https://www.instagram.com/emaedosio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-400"
                aria-label="Visit Instagram"
                title="Instagram"
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/user/EmaEdosio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-400"
                aria-label="Visit YouTube"
                title="YouTube"
              >
                <FaYoutube />
              </a>
            </li>
            <li>
              <a
                href="https://web.facebook.com/p/Ema-Edosio-Deelen-100083753704671/?_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-400"
                aria-label="Visit Facebook"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/emaedosio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-400"
                aria-label="Visit X (formerly Twitter)"
                title="X (formerly Twitter)"
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
