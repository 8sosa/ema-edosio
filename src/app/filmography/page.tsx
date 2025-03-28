"use client";

import Link from "next/link";
import Image from "next/image";
import filmsData from "@/components/films.json";

interface Film {
  title: string;
  synopsis?: string;
  posters?: string[];
}

interface FilmsFile {
  films: Film[];
}

export default function FilmographyPage() {
  const { films } = filmsData as FilmsFile;

  return (
    <main className="bg-black text-white min-h-screen py-8">
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
        {/* Container for each film row */}
        <div className="space-y-8">
          {films.map((film, index) => {
            // Generate a slug from the film title
            const slug = film.title.replace(/\s+/g, "-").toLowerCase();
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 items-center bg-gray-900 rounded p-4"
              >
                {/* Film Poster */}
                <div className="relative w-full md:w-1/4 lg:w-1/5 aspect-[2/3] bg-gray-800 rounded overflow-hidden">
                  {film.posters && film.posters.length > 0 && (
                    <Image
                      src={film.posters[0]}
                      alt={`${film.title} Poster`}
                      layout="fill"
                      className="object-cover"
                    />
                  )}
                </div>
                {/* Film Info */}
                <div className="flex flex-col justify-between w-full md:w-3/4 lg:w-4/5 lg:p-20">
                  <h3 className="lg:text-5xl font-semibold text-white p-2">
                    {film.title}
                  </h3>
                  <p className="lg:text-2xl text-white p-2 lg:py-15">{film.synopsis}</p>
                  <Link href={`/film/${slug}`}>
                    <button className="bg-gray-800 text-white px-6 py-2 rounded hover:scale-105 transition-transform mt-4">
                      Watch Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
