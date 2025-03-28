"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Home from "../images/home.jpg";
import filmsData from "@/components/films.json";

interface Film {
  title: string;
  teaser: string;
  category: string;
  posters?: string[];
  synopsis?: string;
  stills?: string[];
}

interface FilmsFile {
  films: Film[];
}

export default function HomePage() {
  const { films } = filmsData as FilmsFile;
  const heroFilm = films[0];
  const heroSlug = heroFilm.title.replace(/\s+/g, "-").toLowerCase();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-[100vh] md:h-[70vh] lg:h-[100vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          >
            <source src={heroFilm.teaser} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-70" />
        </div>
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-end h-full p-8 md:p-12 lg:p-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
            {heroFilm.title}
          </h1>
          <p className="text-md md:text-lg max-w-[50ch] mb-4">
            {heroFilm.synopsis}
          </p>
          <div className="flex space-x-3">
            <Link href={`/film/${heroSlug}`}>
              <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">
                Watch Now
              </button>
            </Link>
            <Link href={`/film/${heroSlug}`}>
              <button className="bg-gray-600 bg-opacity-75 px-6 py-2 rounded hover:bg-gray-500 transition">
                More Info
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FILM CATEGORIES */}
      <section className="relative bg-black text-white min-h-screen w-full flex flex-col">
        {/* Header Row */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-base md:text-lg lg:text-xl uppercase tracking-wide text-gray-400">
            Our Latest Releases
          </h2>
          <a href="#" className="text-sm md:text-base text-orange-500 hover:underline">
            Watch All
          </a>
        </div>
        {/* Grid of Posters */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 px-8 py-5">
          {films.map((film, index) => {
            const slug = film.title.replace(/\s+/g, "-").toLowerCase();
            return (
              <Link
                key={index}
                href={`/film/${slug}`}
                className="block bg-gray-800 rounded overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="relative w-full aspect-[2/3]">
                  {film.posters && film.posters.length > 0 && (
                    <Image
                      src={film.posters[0]}
                      alt={`${film.title} Poster`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ABOUT Ema */}
      <section className="hero flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white p-8 md:p-12 lg:p-16">
        <div className="hero-content max-w-lg space-y-4">
          <p className="hero-subtitle uppercase text-sm tracking-widest">
            Ema Edosio Deelen
          </p>
          <h1 className="hero-title text-3xl md:text-4xl font-bold">
            Cinema That Speaks.
          </h1>
          <h2 className="hero-training text-xl md:text-2xl">
            Stories That Stay With You.
          </h2>
          <p className="hero-description">
            Authentic, bold, and deeply human storytelling.
          </p>
          <Link href="/about">
            <button className="cta-button bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition">
              SEE ME
            </button>
          </Link>
        </div>
        <div className="hero-image mt-6 md:mt-0 w-full md:w-1/2 relative h-64 md:h-96">
          <Image src={Home} alt="Woman in a metallic jacket" fill className="object-cover rounded" />
        </div>
      </section>
    </>
  );
}
