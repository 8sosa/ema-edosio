"use client";

import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";

export default function Header() {
  // const { data: session } = useSession();
  return (
    <header>
      <nav className="navbar ">
        <div className="logo">
          <Link href="/">Ema Edosio</Link>
        </div>
        <div className="nav-links">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/filmography" className="hover:underline">Filmography</Link>
          {/* <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/masterclass" className="hover:underline">Masterclass</Link>
          <Link href="/crowdfunding" className="hover:underline">Crowdfunding</Link>
          <Link href="/podcasts" className="hover:underline">Podcasts</Link>
          <Link href="/merch" className="hover:underline">Merch</Link>
          <Link href="/consultation" className="hover:underline">Consultation</Link> */}
          <Link href="/contact" className="hover:underline">Contact</Link>
          {/* {session ? (
            <>
              {session.user?.role === "ADMIN" && <Link href="/admin">Admin Panel</Link>}
              <button onClick={() => signOut()} className="ml-4 bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <Link href="/login" className="ml-4 bg-blue-500 px-3 py-1 rounded">Login</Link>
          )} */}
        </div>
      </nav>
    </header>
  );
}
