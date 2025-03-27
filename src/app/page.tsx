"use client"
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Home from '../images/home.jpg'
import FCarousel from "@/components/filmCarousel"
import filmsData from "@/components/films.json";


interface Film {
  title: string;
  category: string;
  posters?: string[];
  synopsis?: string;
}

interface FilmsFile {
  films: Film[];
}

export default function HomePage() {
  const { films } = filmsData as FilmsFile;

  const filmsByCategory = films.reduce<Record<string, Film[]>>((acc, film) => {
    const cat = film.category || "Other";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(film);
    return acc;
  }, {});

  const filmIndex = 0;
  const film = filmsData.films[filmIndex];

  // Collect the stills for the specific film (or an empty array if undefined)
  const stills: string[] = film?.stills || [];

  // Randomize the stills
  const randomizedStills = useMemo(() => {
    return [...stills].sort(() => Math.random() - 0.5);
  }, [stills]);

  // State to track the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through stills with an interval
  useEffect(() => {
    if (!randomizedStills.length) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % randomizedStills.length);
    }, 3000); // 3 seconds per slide

    return () => clearInterval(intervalId);
  }, [randomizedStills]);

  // Current background image
  const currentBackground = randomizedStills.length ? randomizedStills[currentIndex] : "";

  return (
    <>
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background image */}
        <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${currentBackground})` }}
        >
          {/* Optional overlay for darkening or gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-70" />
        </div>
        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-start justify-end h-full p-8 md:p-12 lg:p-16">
          {/* Title & Info */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
            {filmsData.films[0].title}
          </h1>
          <p className="text-md md:text-lg max-w-[50ch] mb-4">
          {filmsData.films[0].synopsis}
          </p>
          {/* Buttons */}
          <div className="flex space-x-3">
          <Link
                href={`/film/${filmsData.films[0].title.replace(/\s+/g, "-").toLowerCase()}`}
                className="block bg-gray-800 rounded overflow-hidden hover:scale-105 transition-transform"
              >
            <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">
              Watch Now
            </button>
            </Link>
            <Link
                href={`/film/${filmsData.films[0].title.replace(/\s+/g, "-").toLowerCase()}`}
                className="block bg-gray-800 rounded overflow-hidden hover:scale-105 transition-transform"
              >
              <button className="bg-gray-600 bg-opacity-75 px-6 py-2 rounded hover:bg-gray-500 transition">
                More Info
              </button>
              </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
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
                    {/* Poster image */}
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
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">Ema Edosio Deelen</p>
          <h1 className="hero-title">Cinema That Speaks.</h1>
          <h2 className="hero-training">Stories That Stay With You.</h2>
          <p className="hero-description">
            Authentic, bold, and deeply human storytelling.
          </p>
          <Link href="/about">
            <button className="cta-button">SEE ME</button>
          </Link>   
        </div>
        <div className="hero-image">
          <Image src={Home} alt="Woman in a metallic jacket" />
        </div>
      </section>

      {/* RELEASES COMING SOON */}
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">
        Releases Coming Soon
      </h2>
      <FCarousel />


      {/* SEE IT FIRST - SUBSCRIPTION */}
      {/* <section className="bg-white py-12">
        <div className="mx-auto w-full max-w-3xl px-4 text-center">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">See it First</h2>
          <p className="mb-6 text-gray-700">
            Be the first to know about our new releases and exclusive content.
          </p>
          <form className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none sm:w-auto"
            />
            <button
              type="submit"
              className="rounded-full bg-orange-500 px-8 py-2 text-white font-semibold hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section> */}
    </>
  );
}
