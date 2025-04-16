"use client";

import "./page.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import filmsData from "@/components/films.json";

interface Film {
  title: string;
  synopsis: string;
  poster?: string;
  runtime?: string;
  category?: string;
  genre?: string;
}

interface FilmsFile {
  films: Film[];
}

export default function FilmographyPage() {
  const { films } = filmsData as FilmsFile;

  // State to store the selected category; "All" by default
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

 // Build an array of unique categories by splitting each film's category string.
const categories = useMemo(() => {
  const cats: string[] = [];
  films.forEach((film) => {
    if (film.category) {
      // Split by comma and trim spaces to get each individual category.
      cats.push(...film.category.split(",").map((cat) => cat.trim()));
    }
  });
  return ["All", ...Array.from(new Set(cats))];
}, [films]);

  // Filter films based on the selected category.
  // If the film's category string includes multiple categories, check if any match.
  const filteredFilms = useMemo(() => {
    if (selectedCategory === "All") return films;
    return films.filter((film) => {
      if (!film.category) return false;
      const filmCats = film.category.split(",").map((cat) => cat.trim());
      return filmCats.includes(selectedCategory);
    });
  }, [films, selectedCategory]);

  return (
    <main className="bg-black text-white min-h-screen pt-30">
      {/* CATEGORY BROWSE */}
      <section className="container mx-auto p-4 flex flex-col items-center wrap-pretty">
        <h2 className="text-3xl font-bold textCenter mb-6 title">
          Stories that feel close to <span className="text-activeblue">home</span> — wherever{" "}
          <span className="text-activeblue">home</span> is.
        </h2>
        <p className="textCenter w-full lg:w-2/3 mx-auto body">
          My films explore love, identity, family, and the human experience across African cities
          and beyond. Real people. Real moments. Stories that travel.
        </p>
        <p className="textCenter w-full lg:w-2/3 mx-auto body">Start watching. Share the experience.</p>
        <div className="flex flex-wrap justify-center gap-4 py-20">
          {categories.map((category, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(category)}
              className={`body px-4 py-2 rounded transition ${
                selectedCategory === category
                  ? "bg-activeblue text-black"
                  : "bg-white text-black hover:bg-activeblue"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* NEW IN / FILMOGRAPHY */}
      <section className="container mx-auto p-4" id="films">
        <div className="space-y-8 lg:px-10 py-10">
          {filteredFilms.map((film, index) => {
            // Generate a slug from the film title
            const slug = film.title.replace(/\s+/g, "-").toLowerCase();

            return (
              <div
                key={index}
                className="filmItem flex flex-col lg:flex-row items-center rounded gap-6"
              >
                {/* Left side: Film Poster */}
                <div className="relative w-full lg:w-5/10 aspect-[2/3] bg-gray-800 overflow-hidden">
                  {film.poster && (
                    <Image
                      src={film.poster}
                      alt={`${film.title} Poster`}
                      layout="fill"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Right side: Film Info */}
                <div className="filmItemText flex flex-col w-full lg:w-1/3 gap-4">
                  <h3 className="text-3xl font-semibold title hover:text-activeblue">
                    {film.title}
                  </h3>
                  <span className="text-sm text-gray-300 body hover:text-activeblue">
                    {film.runtime ? film.runtime : "N/A"} |{" "}
                    {film.category
                      ? film.category.split(",").map((cat) => cat.trim()).join(" | ")
                      : "N/A"} |{" "}
                    {film.genre ? film.genre : "N/A"}
                  </span>
                  <p className="body text-justify text-gray-200">
                    {film.synopsis.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <div className="flex items-center justify-start gap-10 w-full body">
                    <Link href={`/film/${slug}`}>
                      <button className="filmItemBtn p-3 px-10 rounded-full hover:scale-105 transition-transform">
                        ▶ Watch Now
                      </button>
                    </Link>
                    <Link href={`/film/${slug}/trailer`}>
                      <button className="filmItemBtn1 p-3 px-10 rounded-full hover:scale-105 transition-transform">
                        Trailer
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
