"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Home from "../images/home.jpg";
import FCarousel from "@/components/filmCarousel";
import filmsData from "@/components/films.json";

interface Film {
  title: string;
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

  // Group films by category
  const filmsByCategory = films.reduce<Record<string, Film[]>>((acc, film) => {
    const cat = film.category || "Other";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(film);
    return acc;
  }, {});

  // Use first film for the hero background stills
  const heroFilm = films[0];
  const stills: string[] = heroFilm?.stills || [];
  const randomizedStills = useMemo(
    () => [...stills].sort(() => Math.random() - 0.5),
    [stills]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBackground = randomizedStills.length
    ? randomizedStills[currentIndex]
    : "/images/ph.png";

  // Cycle through stills every 3 seconds
  useEffect(() => {
    if (!randomizedStills.length) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % randomizedStills.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [randomizedStills]);

  // Generate a slug for the first film
  const heroSlug = heroFilm.title.replace(/\s+/g, "-").toLowerCase();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${currentBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-70" />
        </div>
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
      <section className="space-y-8 py-8 md:py-10 lg:py-12 px-4 md:px-6 lg:px-8">
        {Object.entries(filmsByCategory).map(([category, filmsInCat]) => (
          <div key={category} className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold capitalize">
              {category}
            </h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {filmsInCat.map((film, idx) => (
                <div
                  key={idx}
                  className="min-w-[150px] md:min-w-[180px] lg:min-w-[200px] flex-shrink-0"
                >
                  <div className="relative w-full h-40 md:h-52 lg:h-60 bg-gray-800 rounded overflow-hidden">
                    <Image
                      src={film.posters?.[0] ?? "/images/ph.png"}
                      alt={film.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm md:text-base text-gray-200">
                    {film.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
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

      {/* RELEASES */}
      <section className="py-8 md:py-10 lg:py-12">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl text-center">
          Releases Coming Soon
        </h2>
        <FCarousel />
      </section>
    </>
  );
}
