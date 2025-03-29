"use client";
import './page.css';
import { useParams } from "next/navigation";
import films from "../../../components/films.json";
import Image from "next/image";
import Link from "next/link";

export default function FilmDetailPage() {
  const { id } = useParams();
  const film = films.films.find(
    (f) => f.title.replace(/\s+/g, "-").toLowerCase() === id
  );

  if (!film) {
    return (
      <div className="p-8 text-white bg-black min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Film Not Found</h1>
        <p>The film you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-10 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Back to Filmography */}
        <Link href="/filmography" className="body text-gray-400 hover:text-gray-200 text-sm">
          &lt; Back to My Films
        </Link>

        <div className="film">
        {/* Film Title */}
        <h1 className="title text-4xl font-bold mt-4">{film.title}</h1>
          {/* Film Poster with Play Button Overlay */}
          <div className="mt-6 relative w-full aspect-video bg-gray-800 overflow-hidden rounded-lg">
            {film.posters && film.posters.length > 0 && (
              <Image
                src={film.posters[0]}
                alt={`${film.title} Poster`}
                fill
                className="object-cover"
              />
            )}
            {/* Centered Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="playBtn hover:scale-105 transition-transform">
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Film Synopsis and Screening License Button */}
        <div className="filmInfo mt-6">
          <p className="text leading-relaxed py-10">{film.extendedSynopsis}</p>
          <button className="mt-4 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-500 transition-colors w-full sm:w-auto">
            Get Screening License
          </button>
        </div>
      </div>
    </main>
  );
}
