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

  return (
    <header
      className={`header fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black shadow-sm" : "bg-transparent text-black-600"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Desktop Nav */}
        <nav className="body hidden md:flex items-center justify-between mx-auto max-w-7xl px-4 py-3 gap-10 text-base lg:text-1xl font-bold cursor-pointer">
          <NavLink className="navLink" href="/">Home</NavLink>
          <NavLink className="navLink" href="/filmography">Watch More</NavLink>
          <NavLink className="navLink" href="/masterclass">Masterclass</NavLink>
          <NavLink className="navLink" href="/merch">Shop</NavLink>
          <NavLink className="navLink" href="/about">About</NavLink>
          <NavLink href="/consult" className="navLink">Consultation</NavLink>
          <NavLink className="navLink" href="/contact">Contact</NavLink>
          {/* Cart Icon */}
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


        {/* Mobile Burger Icon */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
        >
          <HiOutlineMenuAlt4 />
        </button>
      </div>

      {/* Mobile Off-Canvas Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-black transform 
          ${menuOpen ? "translate-x-0" : "translate-x-full"} 
          transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-end px-4 py-3">
          <button
            className="text-3xl focus:outline-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          >
            <HiOutlineX />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-center items-center body">
          <div onClick={() => setMenuOpen(false)} className="gap-15">
            <NavLink href="/" className="navLink">Home</NavLink>
            <NavLink href="/filmography" className="navLink">Watch More</NavLink>
            <NavLink href="/masterclass" className="navLink">Masterclass</NavLink>
            <NavLink href="/merch" className="navLink">Merch</NavLink>
            <NavLink href="/about" className="navLink">About</NavLink>
            <NavLink href="/consult" className="navLink">Consultation</NavLink>
            <NavLink href="/contact" className="navLink">Contact</NavLink>
            {/* Cart Icon */}
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
          </div>
        </nav>
      </div>
      <CartDrawer />
    </header>
  );
}
