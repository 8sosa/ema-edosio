// import NewsletterSection from '@/components/NewsletterSection';
// import "../app/styles/home.css";

export default function HomePage() {
  return (
    <>
      <section className="hero bg-gray-900">
        <div className="container">
          <div className="filmDetails">
            <p className="accent altMont">A Film by Ema Edosio Deelen</p>
            <h2 className="mont"> When Nigeria Happens</h2>
            <p className="desc altMont">A contemporary dance film exploring love, identity, and resilience.</p>
            <div className="heroBtn-group">
              <a href="#trailer" className="Trailerbtn">Trailer</a>
              <a href="#trailer" className="WatchNowbtn">Watch Now</a>
            </div>
          </div>
          <div className="homeAboutFilm">
            <h3 className="homeAboutFilmTitle altMont">About the Film</h3>
            <p className="homeAboutFilmText mont">
              In a city where survival is an art, a young dancer fights to reclaim her dreams after an unexpected tragedy threatens her future. When Nigeria Happens is a bold, visually stunning contemporary dance film that explores love, identity, and resilience in the face of chaos.
            </p>
            <div className="heroBtn-group1">
              <a href="#trailer" className="Trailerbtn">More Info</a>
              <a href="#trailer" className="WatchNowbtn">Buy Tickets</a>
            </div>
            <div className="homeAboutFilm">
              <h3 className="homeAboutFilmTitle altMont">Awards & Accolades</h3>
              <p className="homeAboutFilmText mont">
                Nigeria’s first contemporary dance film, made in collaboration with Qudus Onikeku.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
