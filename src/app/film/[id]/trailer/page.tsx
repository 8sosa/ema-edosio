"use client";
import { useParams } from "next/navigation";
import films from "../../../../components/films.json";
import Link from "next/link";

export default function FilmTrailerPage() {
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
    <main className="bg-black text-white pt-24 pb-10 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Back to Filmography */}
        <Link href="/filmography" className="body text-gray-400 hover:text-gray-200 text-sm py-15">
          &lt; Back to My Films
        </Link>
        <h1 className="text-4xl font-bold mt-4 mb-6 title">{film.title} - Trailer</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Trailer Embed */}
          <div className="w-full lg:w-2/3 aspect-video relative bg-gray-800 overflow-hidden rounded-lg">
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
                controlsList="nodownload"
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={film.trailerVid}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {/* Synopsis Text */}
          <div className="w-full lg:w-1/3 flex items-center">
            <p className="text-center leading-relaxed body">{film.extendedSynopsis}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
