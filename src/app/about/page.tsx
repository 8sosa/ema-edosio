import './page.css';
import Image from "next/image";
import Ema from "../../images/ema1.jpg";

export default function AboutPage() {
  return (
    <section className="aboutPage">
      {/* Content Section */}
      <div className="aboutSecondSection mont">
        <div className="aboutImageSection">
          <Image 
            src={Ema} 
            alt="Ema Edosio Deelen" 
            layout="responsive" 
            objectFit="cover" 
          />
        </div>
        <div className="aboutTextSection">
          <h1>A Filmmaker Without Boundaries</h1>
          <p className="mt-4">
            Ema’s journey into filmmaking was anything but conventional. She honed her skills as a cinematographer, director, and video journalist, working with networks like BBC, Vice News and Bloomberg. Her ability to blend intimate, human-driven storytelling with striking visuals has made her one of the most distinct voices in contemporary African cinema.
          </p>
          <p>
            Her films go beyond the surface, capturing the raw, real, and often overlooked narratives of everyday life. With a career spanning over a decade, she has carved a niche in the industry, creating films that speak to Nigerian audiences at home and in the diaspora while resonating with a global audience.
          </p>
        </div>
        <button>My Resume</button>
      </div>
    </section>
  );
}
