"use client";
import './page.css';
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="aboutPage px-4 sm:px-6 lg:px-8 py-16 bg-black text-white">
      {/* Content Section */}
      <div className="aboutSecondSection flex flex-col lg:flex-row items-start gap-12">
        
        {/* Image Section */}
        <div className="flex-1 w-full aspect-[1/1]">
          <div className="relative w-full aspect-[2/3] bg-gray-700 rounded-lg overflow-hidden lg:sticky lg:top-24 max-h-[80vh]">
            <Image
              src="/images/mast.jpg"
              alt="Ema Edosio"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="aboutTextSection flex-1 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight title">
            Ema Edosio — Filmmaker. Visual Storyteller. Voice of a New African Cinema.
          </h1>
          <p className="text-base sm:text-lg text-gray-300">
            Ema Edosio is an award&minus;winning Nigerian filmmaker, director, and cinematographer known for crafting bold, human stories that connect local realities with global audiences.
          </p>
          <p className="text-base sm:text-lg text-gray-300">
            With a career spanning over a decade, Ema honed her skills in cinematography and directing, working with international networks like the BBC, Vice News, and Bloomberg. Her filmmaking merges raw authenticity with striking visual language capturing intimate, everyday moments and transforming them into powerful cinematic experiences.
          </p>
          <p className="text-base sm:text-lg text-gray-300">
            Her films explore universal themes—identity, resilience, family, survival—and the beauty of ordinary people navigating extraordinary circumstances. Grounded in the vibrant energy of Lagos, yet resonating far beyond it, her work reflects a new wave of African storytelling: personal, unapologetic, and globally relevant.
          </p>
          <p className="text-base sm:text-lg text-gray-300">
            From Kasala!, her breakout celebration of youth culture and Lagos street life, to Otiti, a delicate exploration of family and forgiveness, and When Nigeria Happens, Nigeria&rsquo;s first contemporary dance film—Ema&rsquo;s work pushes the boundaries of genre and form while staying deeply connected to human truth.
          </p>
          <p className="text-base sm:text-lg text-gray-300">
            She creates films that move between worlds—speaking to Nigerian audiences at home and to a global generation seeking stories that are real, fresh, and rooted in place.
          </p>
          <p className="text-base sm:text-lg text-gray-300">
            For Ema, film is not just art—it&rsquo;s resistance, reflection, and a call to remember who we are.
          </p>
        </div>
      </div>
    </section>
  );
}
