"use client";

import { useState } from "react";
import NavLink from "./NavLink";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-around">
        {/* Desktop Nav (hidden on small screens) */}
        <nav className="title hidden md:flex space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/filmography">Watch More</NavLink>
          <NavLink href="/masterclass">Masterclass</NavLink>
          <NavLink href="/merch">Merch</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* Burger Icon (shows on small screens) */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
        >
          <HiOutlineMenuAlt4 />
        </button>
      </div>

      {/* Off-Canvas Menu (visible on mobile/tablets) */}
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
        <nav className="flex flex-col p-4 space-y-4 text-center items-end title">
          <NavLink href="/" className="navLink">
            Home
          </NavLink>
          <NavLink href="/about" className="navLink">
            About
          </NavLink>
          <NavLink href="/filmography" className="navLink">
            Watch More
          </NavLink>
          <NavLink href="/masterclass" className="navLink">
            Masterclass
          </NavLink>
          <NavLink href="/merch" className="navLink">
            Merch
          </NavLink>
          <NavLink href="/contact" className="navLink">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
