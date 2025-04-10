"use client";
import './page.css';
import { useParams } from "next/navigation";
import films from "../../../components/films.json";
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

        <div className="mt-8">
          <h1 className="title text-4xl font-bold">Deleted Scenes</h1>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <video
              controls
              className="w-full h-auto rounded-lg shadow-lg"
              src="/videos/wnh.mp4"
            >
              Your browser doesn’t support <code>&lt;video&gt;</code>.
            </video>
            <video
              controls
              className="w-full h-auto rounded-lg shadow-lg"
              src="/videos/wnh.mp4"
            />
            <video
              controls
              className="w-full h-auto rounded-lg shadow-lg"
              src="/videos/wnh.mp4"
            />
          </div>
        </div>

        <div className="mt-12">
          <h1 className="title text-4xl font-bold">BTS</h1>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <video
              controls
              className="w-full h-auto rounded-lg shadow-lg"
              src="/videos/wnh.mp4"
            />
            <video
              controls
              className="w-full h-auto rounded-lg shadow-lg"
              src="/videos/wnh.mp4"
            />
            <video
              controls
              className="w-full h-auto rounded-lg shadow-lg"
              src="/videos/wnh.mp4"
            />
          </div>
        </div>

      </div>
    </main>
  );
}
