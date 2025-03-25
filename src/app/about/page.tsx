import './page.css'
import Image from "next/image";
import Ema from "../../images/ema1.jpg"
import Ema1 from "../../images/ema2.jpg"
import Ema2 from "../../images/ema4.jpg"
import Ema3 from "../../images/ema3.jpg";

export default function AboutPage() {
  return (
    <>
    <main className="flex min-h-screen">
      <aside className="sideBar"></aside>
      <section className="flex-1 bg-white">
        <div className="aboutFirstSection mont">
          <h1>About Ema Edosio Deelen</h1>
          <p className="text-gray-700 text-xl md:text-2xl max-w-2xl mb-8 altMont">
            Someone driven by a passion for authentic, unfiltered storytelling.
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-0 h-screen aboutSecondSection mont">
          {/* Top Left: First Image */}
          <div className="w-full h-full aboutSecondSectionImg relative aspect-square">
            <Image
              src={Ema}
              alt="Engineers at work"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Top Right: Text */}
          <div className="flex flex-col justify-center items-center aboutSecondSectionText">
            <h1 className="text-3xl font-bold">A Filmmaker Without Boundaries</h1>
            <p className="mt-4 altMont">
              Ema’s journey into filmmaking was anything but conventional. She honed her skills as a cinematographer, director, and video journalist, working with networks like BBC, Vice News and Bloomberg. Her ability to blend intimate, human-driven storytelling with striking visuals has made her one of the most distinct voices in contemporary African cinema.
            </p>
          </div>

          {/* Bottom Left: Second Image */}
          <div className="w-full h-full aboutSecondSectionImg relative aspect-square">
            <Image
              src={Ema1}
              alt="Team discussing a project"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Bottom Right: Third Image */}
          <div className="w-full h-full aboutSecondSectionImg relative aspect-square">
            <Image
              src={Ema2}
              alt="Technical workshop"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div>
          <div className="w-full mb-8">
            <Image
              src={Ema3}
              alt="Equipment and cables"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Closing Text */}
          <div className="aboutSecondSectionText">
            <p>
              Her films go beyond the surface, capturing the raw, real, and often overlooked narratives of everyday life. With a career spanning over a decade, she has carved a niche in the industry, creating films that speak to Nigerian audiences at home and in the diaspora while resonating with a global audience.
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
 