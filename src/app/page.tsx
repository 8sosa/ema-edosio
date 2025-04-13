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
      <section className="relative w-full h-[100vh] md:h-[70vh] lg:h-[100vh] overflow-hidden">
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
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-60" />
        </div>
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-end h-full p-8 md:p-12 lg:p-16 text-white">
          <span className="uppercase text-lg mb-4 tracking-wide text-red-900 font-extrabold">Out Now</span>
          <h1 className="title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-300 hover:bg-gradient-to-b hover:from-white hover:to-red-950 hover:bg-clip-text hover:text-transparent">
            {heroFilm.title}
          </h1>
          <p className="body text-md md:text-lg max-w-xl mb-8 leading-relaxed text-justify">
            {heroFilm.synopsisAlt.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <div className="flex space-x-3 body">
            <Link href={`/film/${heroSlug}`}>
              <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">
                Watch Now
              </button>
            </Link>
            <Link href={`/film/${heroSlug}/trailer`}>
              <button className="bg-gray-600 bg-opacity-75 px-6 py-2 rounded hover:bg-gray-500 transition">
                Trailer
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* ABOUT Ema */}
      <section className="hero flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white p-8 md:p-12 lg:p-16">
        <div className="hero-content space-y-4">
          <p className="title hero-subtitle uppercase text-sm tracking-widest">
            Ema Edosio Deelen
          </p>
          <h1 className="hero-title text-3xl md:text-4xl font-bold title">
            Cinema That Speaks.
          </h1>
          <h2 className="body hero-training text-xl md:text-2xl">
            Stories That Stay With You.
          </h2>
          <p className="hero-description body">
            Authentic, bold, and deeply human storytelling.
          </p>
          <Link href="/filmography">
            <button className="cta-button bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition body">
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
