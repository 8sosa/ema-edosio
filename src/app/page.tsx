"use client";
import Link from "next/link";
import Image from "next/image";
import Home from "../images/home.jpg";
import filmsData from "@/components/films.json";

interface Film {
  title: string;
  teaser: string;
  category: string;
  posters?: string[];
  synopsisAlt: string;
  stills?: string[];
}

interface FilmsFile {
  films: Film[];
}

export default function HomePage() {
  const { films } = filmsData as FilmsFile;
  const heroFilm = films[0];
  const heroSlug = heroFilm.title.replace(/\s+/g, "-").toLowerCase();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-[100vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          >
            <source src={heroFilm.teaser} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-end h-full p-8 md:p-12 lg:p-16 text-white">
          <span className="uppercase text-lg mb-4 tracking-wide title">Out Now</span>
          <h1 className="title text-4xl md:text-6xl lg:text-7xl mb-6">
            {heroFilm.title}
          </h1>
          <p className="body text-md md:text-lg max-w-xl mb-8 leading-relaxed">
            {heroFilm.synopsisAlt.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <div className="flex space-x-3">
            <Link href={`/film/${heroSlug}`}>
              <button className="btn-primary body">Watch Now</button>
            </Link>
            <Link href={`/film/${heroSlug}/trailer`}>
              <button className="pri2 body">Trailer</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT EMA */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-black text-white p-8 md:p-12 lg:p-16">
        <div className="hero-content space-y-4">
          <p className="hero-subtitle uppercase title text-sm tracking-widest">
            Ema Edosio Deelen
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl title">
            Cinema That Speaks.
          </h1>
          <h2 className="hero-training text-4xl md:text-5xl font-bold body">
            Stories That Stay With You.
          </h2>
          <p className="body text-md md:text-lg max-w-xl mb-8 leading-relaxed">
            Authentic, bold, and deeply human storytelling.
          </p>
          <Link href="/filmography">
            <button className="cta-button btn-primary body">
              Watch More
            </button>
          </Link>
        </div>
        <div className="hero-image mt-6 md:mt-0 w-1/5 relative aspect-[1/1]">
          <Image src={Home} alt="Woman in a metallic jacket" fill className="object-cover rounded" />
        </div>
      </section>
    </>
  );
}
