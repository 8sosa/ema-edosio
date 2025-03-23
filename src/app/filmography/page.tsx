import films from "../../components/films.json";
import Link from "next/link";
import Image from "next/image";

export default function FilmographyPage() {
  return (
    <section className="container mx-auto p-8">
      <h2 className="text-4xl font-bold text-center mb-8">Filmography</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.films.map((film, index) => {
          // Generate a slug from the film title (e.g., "When Nigeria Happens" => "when-nigeria-happens")
          const slug = film.title.replace(/\s+/g, "-").toLowerCase();
          return (
            <Link key={index} href={`/film/${slug}`}>
                {film.posters && film.posters.length > 0 && (
                  <Image
                    src={film.posters[0]}
                    alt={`${film.title} Poster`}
                    width={300}
                    height={450}
                    className="rounded-lg object-cover"
                  />
                )}
                <h3 className="text-xl font-semibold text-white mt-3 text-center">
                  {film.title}
                </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}