"use client";

import React, { useEffect, useRef } from "react";
import './page.css';
import { useParams } from "next/navigation";
import films from "../../../components/films.json";
import Link from "next/link";

export default function FilmDetailPage() {
  const { id } = useParams();
  const film = films.films.find(
    (f) => f.title.replace(/\s+/g, "-").toLowerCase() === id
  );
  const videosRef = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    // On mount, play & then pause after 10s
    const timeouts: number[] = [];
  
    videosRef.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {
        /* autoplay might be blocked on some mobiles, but muted helps */
      });
      const t = window.setTimeout(() => {
        video.pause();
      }, 10_000);
      timeouts.push(t);
    });
  
    // cleanup if unmount
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);
  
  if (!film) {
    return (
      <div className="p-8 text-white bg-black min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Film Not Found</h1>
        <p>The film you are looking for does not exist.</p>
      </div>
    );
  }
 // Get embed URL if it's a YouTube link
 const getEmbedUrl = (url: string): string => {
  try {
    const u = new URL(url);
    const vid = u.searchParams.get("v");
    return vid
      ? `https://www.youtube.com/embed/${vid}`
      : url.replace(/watch\?/, "embed/"); // fallback
  } catch {
    return url;
  }
};

const hasYoutubeTrailer = film.trailerUrl && film.trailerUrl.includes("youtube.com");
const embedUrl = hasYoutubeTrailer ? getEmbedUrl(film.trailerUrl) : null;

const sampleVideos = [
  { src: "/videos/wnh.mp4", progress: 25 },
  { src: "/videos/wnh.mp4", progress: 60 },
  { src: "/videos/wnh.mp4", progress: 10 },
  { src: "/videos/wnh.mp4", progress: 80 },
  { src: "/videos/wnh.mp4", progress: 45 },
  // …add as many as you like
];
const sampleVids = [
  { src: "/videos/WHN.mov", progress: 25 },
  { src: "/videos/WHN.mov", progress: 60 },
  { src: "/videos/WHN.mov", progress: 10 },
  { src: "/videos/WHN.mov", progress: 80 },
  { src: "/videos/WHN.mov", progress: 45 },
  // …add as many as you like
];


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
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${film.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            ) : (
              <video
                controls
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={film.trailerVid}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

       {/* Deleted Scenes Carousel */}
        <div className="mt-12">
          <h2 className="title text-2xl md:text-3xl font-bold mb-4">DELETED SCENES</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {sampleVids.map((video, idx) => (
              <div key={idx} className="min-w-[200px] flex-shrink-0 w-1/4">
                <video
                  // assign ref so we can control it
                  ref={(el) => {
                    if (el) videosRef.current[idx] = el;
                  }}
                  src={video.src}
                  controls
                  controlsList="nodownload"
                  loop
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* BTS Carousel */}
        <div className="mt-12">
          <h2 className="title text-2xl md:text-3xl font-bold mb-4">BTS</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {sampleVideos.map((video, idx) => (
              <div key={idx} className="min-w-[200px] flex-shrink-0 w-1/4">
                <video
                  // assign ref so we can control it
                  ref={(el) => {
                    if (el) videosRef.current[idx] = el;
                  }}
                  controls
                  controlsList="nodownload"
                  src={video.src}
                  // no autoPlay attribute – we trigger play() in useEffect
                  loop
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
