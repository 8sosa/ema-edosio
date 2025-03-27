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
      <section className="hero bg-gray-900">
        <Image 
          src={film.stills[0]}
          alt={`${film.title} Poster`}
          width={300}
          height={450}
          className='heroBg'
        />
        <div className="container">
          <div className="filmDetails">
            <p className="accent altMont">A Film by Ema Edosio Deelen</p>
            <h2 className="mont">{film.title}</h2>
            <p className="desc altMont">{film.synopsis}</p>
            <div className="heroBtn-group">
              <a href="#trailer" className="Trailerbtn">Trailer</a>
              <a href="#trailer" className="WatchNowbtn">Watch Now</a>
            </div>
          </div>
          <div className="homeAboutFilm">
            <h3 className="homeAboutFilmTitle altMont">About the Film</h3>
            <p className="homeAboutFilmText mont">
              {film.extendedSynopsis}
            </p>
            <div className="heroBtn-group1">
              <a href="#trailer" className="Trailerbtn">More Info</a>
              <a href="#trailer" className="WatchNowbtn">Buy Tickets</a>
            </div>
          </div>
        </div>
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
