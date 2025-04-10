"use client";

import './page.css'
import Link from "next/link";
import Image from "next/image";
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

  return (
    <main className="bg-black text-white min-h-screen py-30">
      {/* CATEGORY BROWSE */}
      <section className="container mx-auto p-4 flex flex-col align-center wrap-pretty">
        <h2 className="text-3xl font-bold text-center mb-6 title">
          Watch My Films
        </h2>
        <p className='text-center w-full lg:w-2/3 mx-auto body'>I&lsquo;m a paragraph. Click here to add your own text and edit me. It&lsquo;s easy. Just click &quot;Edit Text&quot; or double click me to add your own content and make changes to the font. I&lsquo;m a great place for you to tell a story and let your users know a little more about you.</p>
        <div className="flex flex-wrap justify-center gap-4 py-20">
          {["Romance", "Comedy", "Drama", "Dance"].map((category, i) => (
            <button
              key={i}
              className="body px-4 py-2 bg-gray-800 rounded hover:bg-green-200 hover:text-black transition"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* NEW IN / FILMOGRAPHY */}
      <section className="container mx-auto p-4" id="films">
        {/* <h2 className="text-3xl font-bold text-center mb-6">New In</h2> */}
        <div className="space-y-8 lg:px-10 py-10">
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
                  {/* Title */}
                  <h3 className="text-3xl font-semibold title">
                    {film.title}
                  </h3>
                  {/* Runtime / Language / Producer / Director */}
                  <span className="text-sm text-gray-300 body">
                    {film.runtime ? film.runtime : "N/A"} |{" "}
                    {film.category ? film.category : "N/A"} |{" "}
                    {film.genre ? film.genre : "N/A"}
                  </span>
                  {/* Synopsis */}
                  <p className="body">
                  {film.synopsis.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                  </p>
                  <div className="flex items-center justify-evenly gap-4 w-full body">
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
