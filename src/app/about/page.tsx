import Gallery from '@/components/Gallery';
import './page.css'

export default function AboutPage() {
  return (
    <>
      <section className="aboutHero">
        <div className="container">
          <div className="aboutHeroContent">
            <h2 className="mont"> Story</h2>
          </div>
        </div>
      </section>
      <section className="aboutContentSection">
        <div className="container">
          <div className="aboutContent">
            <h3 className="aboutContentTitle altMont">About Ema Edosio Deelen</h3>
            <p className="aboutContentText mont">
              Ema Edosio Deelen is a filmmaker driven by a passion for authentic, unfiltered storytelling. Her films go beyond the surface, capturing the raw, real, and often overlooked narratives of everyday life. With a career spanning over a decade, she has carved a niche in the industry, creating films that speak to Nigerian audiences at home and in the diaspora while resonating with a global audience.
            </p>
            <p className="aboutContentText mont">
              Ema’s journey into filmmaking was anything but conventional. She honed her skills as a cinematographer, director, and video journalist, working with networks like BBC, Vice News and Bloomberg. Her ability to blend intimate, human-driven storytelling with striking visuals has made her one of the most distinct voices in contemporary African cinema.
            </p>
          </div>
          <div className="aboutContentGallery">
            <h3 className="aboutContentGalleryTitle altMont">Gallery</h3>
            <Gallery />
          </div>
        </div>
      </section>
    </>
  );
}
 