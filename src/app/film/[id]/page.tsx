"use client";
import './page.css';
import { useParams } from "next/navigation";
import films from "../../../components/films.json";
import Image from "next/image";

export default function FilmDetailPage() {
  const { id } = useParams();
  const film = films.films.find(
    (f) => f.title.replace(/\s+/g, "-").toLowerCase() === id
  );

  if (!film) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Film Not Found</h1>
        <p>The film you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <section className='filmHero'>
        <div className='filmHeroPoster'>
          {film.posters && film.posters.length > 0 && (
            <Image
              src={film.posters[0]}
              alt={`${film.title} Poster`}
              width={300}
              height={450}
              className="filmHeroImage"
            />
          )}
        </div>
        <div className='filmHeroDetail'>
          <h1 className='filmHeroTitle altMont'>{film.title}</h1>
          <h3 className='filmHeroDate mont'>{film.releaseYear}</h3>
          <p className='filmHeroText mont'>{film.extendedSynopsis}</p>
        </div>
      </section>
      <section className='filmHighlight'>
        <p className='filmHighlightText sans'>{film.highlights}</p>
      </section>
    </>

    // <div className="p-8 space-y-6">
    //   <h1 className="text-3xl font-bold">
    //     {film.title} ({film.releaseYear})
    //   </h1>
    //   {film.posters && film.posters.length > 0 && (
    //     <Image
    //       src={film.posters[0]}
    //       alt={`${film.title} Poster`}
    //       width={300}
    //       height={450}
    //       className="rounded-lg object-cover"
    //     />
    //   )}
    //   <p className="mt-4">{film.synopsis}</p>
    //   <p className="italic">{film.highlights}</p>
    //   <p className="mt-4">{film.extendedSynopsis}</p>

    //   {/* You can add more details as needed */}
    //   <div>
    //     <h2 className="text-2xl font-semibold mt-6">Details</h2>
    //     <p>
    //       <span className="font-bold">Genre:</span> {film.details.genre}
    //     </p>
    //     <p>
    //       <span className="font-bold">Director:</span> {film.details.director}
    //     </p>
    //     <div className="mt-4">
    //       <h3 className="font-bold">Cast:</h3>
    //       <ul className="list-disc list-inside">
    //         {film.details.cast.map((member, i) => (
    //           <li key={i}>
    //             {member.role}: {member.actor}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
}
