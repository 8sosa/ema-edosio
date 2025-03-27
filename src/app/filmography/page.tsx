"use client"; 

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
// import HeroCarousel from '@/components/filmographyHeroCarousel'

import filmsData from "@/components/films.json";

interface Film {
  title: string;
  posters?: string[];
}

interface FilmsFile {
  films: Film[];
}

const FilmographyPage: FC = () => {
  const { films } = filmsData as FilmsFile;

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO SECTION */}
      {/* <HeroCarousel /> */}

      {/* CATEGORY BROWSE */}
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Browse Your Favourite Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["Action", "Romance", "Thriller", "Comedy", "Drama", "Sci-Fi", "Mystery", "Crime"].map(
            (category, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
              >
                {category}
              </button>
            )
          )}
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Find Your Next Watch</h3>
          <p>
            Recommended just for you, curated from critics and viewers worldwide.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Unbiased Reviews</h3>
          <p>Real insights and honest opinions on the latest and greatest in film.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Join the Conversation</h3>
          <p>Keep track of your favourites and discuss with fellow movie lovers.</p>
        </div>
      </section>

      {/* NEW IN / FILMOGRAPHY */}
      <section className="container mx-auto p-8" id="films">
        <h2 className="text-3xl font-bold text-center mb-6">New In</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {films.map((film, index) => {
            // Generate a slug from the film title (e.g. "When Nigeria Happens" => "when-nigeria-happens")
            const slug = film.title.replace(/\s+/g, "-").toLowerCase();

            return (
              <Link
                key={index}
                href={`/film/${slug}`}
                className="block bg-gray-800 rounded overflow-hidden hover:scale-105 transition-transform"
              >
                {/* Poster */}
                <div className="relative w-full h-96">
                  {film.posters && film.posters.length > 0 && (
                    <Image
                      src={film.posters[0]}
                      alt={`${film.title} Poster`}
                      layout="fill"
                      className="object-cover"
                    />
                  )}
                </div>
                {/* Title */}
                <h3 className="text-xl font-semibold text-white mt-3 text-center p-4">
                  {film.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default FilmographyPage;