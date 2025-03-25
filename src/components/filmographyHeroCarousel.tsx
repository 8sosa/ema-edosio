"use client";
import { useState, useEffect, useMemo } from "react";
import filmsData from "./films.json";


export default function HeroCarousel() {
  // 1. Collect all stills into one array
  const allStills: string[] = filmsData.films.flatMap((film) => film.stills || []);
  const randomizedStills = useMemo(() => {
    return [...allStills].sort(() => Math.random() - 0.5);
  }, [allStills]);
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
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${currentBackground})`}} >
            {/* Optional overlay for darkening or gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-70" />
            </div>

            {/* Hero content */}
            <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">SCREENPICKS</h1>
            <p className="text-xl mb-6">DISCOVER YOUR NEXT CINEMATIC ADVENTURE</p>
            <button className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition">
                Get Started
            </button>
            </div>
        </section>
  );
}
