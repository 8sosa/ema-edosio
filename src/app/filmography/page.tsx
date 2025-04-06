"use client";

import './page.css'
import Link from "next/link";
import Image from "next/image";
import filmsData from "@/components/films.json";

interface Film {
  title: string;
  synopsis?: string;
  posters?: string[];
  runtime?: string;
  language?: string;
  producer?: string;
  director?: string;
}

interface FilmsFile {
  films: Film[];
}

export default function FilmographyPage() {
  const { films } = filmsData as FilmsFile;

  return (
    <main className="bg-black text-white min-h-screen py-10 lg:py-15">
      {/* CATEGORY BROWSE */}
      <section className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Browse Your Favourite Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["Romance", "Comedy", "Drama", "Mystery", "Crime"].map((category, i) => (
            <button
              key={i}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* NEW IN / FILMOGRAPHY */}
      <section className="container mx-auto p-4" id="films">
        <h2 className="text-3xl font-bold text-center mb-6">New In</h2>
        <div className="space-y-8 lg:px-10">
          {films.map((film, index) => {
            // Generate a slug from the film title
            const slug = film.title.replace(/\s+/g, "-").toLowerCase();

            return (
              <div
                key={index}
                className="filmItem flex flex-col lg:flex-row items-center rounded gap-6"
              >
                {/* Left side: Film Poster */}
                <div className="relative w-full lg:w-5/10 aspect-[2/3] bg-gray-800 overflow-hidden">
                  {film.posters && film.posters.length > 0 && (
                    <Image
                      src={film.posters[0]}
                      alt={`${film.title} Poster`}
                      layout="fill"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Right side: Film Info */}
                <div className="filmItemText flex flex-col w-full lg:w-1/3 gap-4">
                  {/* Title */}
                  <h3 className="text-3xl font-semibold title">
                    {film.title}
                  </h3>
                  {/* Runtime / Language / Producer / Director */}
                  <span className="text-sm text-gray-300 text">
                    {film.runtime ? film.runtime : "N/A"} |{" "}
                    {film.language ? film.language : "N/A"} |{" "}
                    {film.producer ? film.producer : "N/A"} |{" "}
                    {film.director ? film.director : "N/A"}
                  </span>
                  {/* Synopsis */}
                  <p className="text">
                    {film.synopsis}
                  </p>
                  <div className="flex items-center justify-evenly gap-4 w-full body">
                    <Link href={`/film/${slug}`}>
                      <button className="filmItemBtn p-3 px-10 rounded-full hover:scale-105 transition-transform">
                        ▶ Watch Now
                      </button>
                    </Link>
                    <Link href={`/film/${slug}`}>
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
