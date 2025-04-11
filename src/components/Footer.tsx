"use client";
import React from "react";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row py-12 px-6 md:px-12 justify-center body">
        {/* Accent line + content */}
        <div className="flex items-start w-2/3">
          <div className="w-1 bg-white opacity-30 mr-6" />
          <div className="flex-1 space-y-6">
            <p className="text-gray-400 uppercase tracking-wide">subscribe now to get a copy of my book sent to your mail</p>
            <h2 className="text-5xl md:text-6xl font-bold">Ema&lsquo;s Newsletter</h2>
            <form className="space-y-6">
              {/* Email input */}
              <div className="w-full lg:w-1/2">
                <label className="block mb-2 text-gray-400">
                  Enter your email here <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-transparent border border-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {/* Checkbox + Subscribe row */}
              <div className="body flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <label className="flex items-center mb-4 md:mb-0">
                  <input type="checkbox" className="w-5 h-5 border border-white rounded bg-transparent mr-3" />
                  <span className="text-lg">Yes, subscribe me to your newsletter.</span>
                </label>
                <button
                  type="submit"
                  className="flex flex-row gap-10 border border-orange-500 text-orange-500 px-8 py-3 uppercase tracking-wide hover:bg-orange-500 hover:text-black transition-colors"
                >
                  Subscribe <LiaTelegramPlane size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-6 md:px-12">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0 body">
            © {new Date().getFullYear()} Ema Edosio, All Rights Reserved.
          </p>
          <ul className="flex space-x-6">
            <li>
              <a href="https://www.instagram.com/emaedosio/" className="text-xl hover:text-gray-400">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/user/EmaEdosio" className="text-xl hover:text-gray-400">
                <FaYoutube />
              </a>
            </li>
            <li>
              <a href="https://web.facebook.com/p/Ema-Edosio-Deelen-100083753704671/?_rdc=1&_rdr" className="text-xl hover:text-gray-400">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href="https://x.com/emaedosio" className="text-xl hover:text-gray-400">
                <FaXTwitter />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
