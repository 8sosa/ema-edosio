"use client";
import './page.css';
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="aboutPage">
      {/* Content Section */}
      <div className="aboutSecondSection mont flex flex-col lg:flex-row items-start gap-12">
      <div className="aboutImageSection w-full aspect-[1/3] lg:w-1/4 relative lg:sticky lg:top-24 max-h-[80vh]">
        <Image 
          src="/images/mast.jpg"
          alt="Ema Edosio Deelen"
          width={600}
          height={900}
          className="object-cover rounded-lg w-full h-auto max-h-[600px]"
        />
      </div>


        <div className="aboutTextSection flex-1 space-y-1">
          <h1 className="text-4xl font-bold title">
            Ema Edosio — Filmmaker. Visual Storyteller. Voice of a New African Cinema.
          </h1>
          <p>
            Ema Edosio is an award&minus;winning Nigerian filmmaker, director, and cinematographer known for crafting bold, human stories that connect local realities with global audiences.
          </p>
          <p>
            With a career spanning over a decade, Ema honed her skills in cinematography and directing, working with international networks like the BBC, Vice News, and Bloomberg. Her filmmaking merges raw authenticity with striking visual language capturing intimate, everyday moments and transforming them into powerful cinematic experiences.
          </p>
          <p>
            Her films explore universal themes—identity, resilience, family, survival—and the beauty of ordinary people navigating extraordinary circumstances. Grounded in the vibrant energy of Lagos, yet resonating far beyond it, her work reflects a new wave of African storytelling: personal, unapologetic, and globally relevant.
          </p>
          <p>
            From Kasala!, her breakout celebration of youth culture and Lagos street life, to Otiti, a delicate exploration of family and forgiveness, and When Nigeria Happens, Nigeria&rsquo;s first contemporary dance film—Ema&rsquo;s work pushes the boundaries of genre and form while staying deeply connected to human truth.
          </p>
          <p>
            She creates films that move between worlds—speaking to Nigerian audiences at home and to a global generation seeking stories that are real, fresh, and rooted in place.
          </p>
          <p>
            For Ema, film is not just art—it&rsquo;s resistance, reflection, and a call to remember who we are.
          </p>
        </div>
      </div>
    </section>
  );
}
