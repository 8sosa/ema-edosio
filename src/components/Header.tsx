"use client";
import CartDrawer from "./CartDrawer";
import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, openCart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <header
      className={`header flex justify-center items-center fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black shadow-lg" : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between md:justify-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12 text-base lg:text-xl py-4">
          <NavLink className="navLink" href="/">Home</NavLink>
          <NavLink className="navLink" href="/filmography">Watch More</NavLink>
          <NavLink className="navLink" href="/masterclass">Masterclass</NavLink>
          <NavLink className="navLink" href="/merch">Shop</NavLink>
          <NavLink className="navLink" href="/about">About</NavLink>
          <NavLink className="navLink" href="/consult">Consultation</NavLink>
          <NavLink className="navLink" href="/contact">Contact</NavLink>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
        >
          <HiOutlineMenuAlt4 />
        </button>
      </div>

      {/* Mobile Off-Canvas Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-black transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-end px-6 py-6">
          <button
            className="text-3xl text-white focus:outline-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          >
            <HiOutlineX />
          </button>
        </div>

        <nav className="flex flex-col items-center px-8 pt-8 space-y-8 text-lg font-semibold py-6">
          {[
            { href: "/", label: "Home" },
            { href: "/filmography", label: "Watch More" },
            { href: "/masterclass", label: "Masterclass" },
            { href: "/merch", label: "Shop" },
            { href: "/about", label: "About" },
            { href: "/consult", label: "Consultation" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }, i) => (
            <span
              key={href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`transition-all duration-500 ease-in-out transform ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <NavLink href={href} className="navLink text-white">
                {label}
              </NavLink>
            </span>
          ))}

          {/* Cart Button in Mobile Menu */}
          <button
            onClick={() => {
              openCart();
              setMenuOpen(false);
            }}
            className={`relative cursor-pointer transition-all duration-500 ease-in-out transform ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{ transitionDelay: "700ms" }}
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>

      <CartDrawer />
    </header>
  );
}
