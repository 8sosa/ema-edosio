"use client";
import { useState, useEffect, useMemo } from "react";
import filmsData from "./films.json";

export default function HeroCarousel() {
  // Pick a specific film, for example the first film in the list.
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
    <section className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${currentBackground})` }}
      >
        {/* Optional overlay for darkening or gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-70" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">{film.title}</h1>
        <p className="text-xl mb-6">{film.synopsis}</p>
        <button className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition">
          Watch Now
        </button>
      </div>
    </section>
  );
}