"use client";
import Link from "next/link";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer mt-auto bg-black text-white align-center justify-center">
      {/* Top Row */}
      <div className="footerTop container mx-auto py-8 px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* Links Column */}
        <div className="footerTopCol">
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/filmography" className="colItem">Watch More</Link>
            </li>
            <li>
              <Link href="/masterclass" className="colItem">Masterclass</Link>
            </li>
            <li>
              <Link href="/merch" className="colItem">Shop</Link>
            </li>
            <li>
              <Link href="/about" className="colItem">About Me</Link>
            </li>
            <li>
              <Link href="/contact" className="colItem">Contact Me</Link>
            </li>
          </ul>
        </div>

        {/* Socials Column */}
        <div className="footerTopCol">
          <h4 className="font-semibold text-lg mb-4">Socials</h4>
          <ul className="socials space-y-2">
            <li>
              <a href="#" className="colItem flex items-center">
                <FaFacebookF className="socialsIcon" size={18} />Facebook
              </a>
            </li>
            <li>
              <a href="#" className="colItem flex items-center">
                <FaXTwitter className="socialsIcon" size={18} /> X
              </a>
            </li>
           <li>
            <Link href="#" className="colItem flex items-center">
                <FaInstagram className="socialsIcon" size={18} /> Instagram 
            </Link>
           </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footerTopCol">
          <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
          <div className="flex items-center">
            <button className="subBtn bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2">
              Subscribe <LiaTelegramPlane size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footerBottom container mx-auto py-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-center">
        <p className="text-sm text-center">
          © {new Date().getFullYear()} Ema Edosio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
