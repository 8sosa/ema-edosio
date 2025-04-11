import Image from "next/image";
import Link from "next/link";
import masterclassData from "@/components/modules.json";

type Module = {
  id: string;
  title: string;
  module: string;
  content: string;
};
export default function Page() {
  const modules: Module[] = masterclassData.modules;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-black text-white flex flex-col items-center py-30 px-4 my-10 md:px-8">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
            Master the Art of Filmmaking.
            <br />
            Create Stories That Move.
          </h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Dive into immersive classes taught by renowned filmmakers.
            Transform your vision into compelling films—one scene at a time.
          </p>
          <Link href="/classes" className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-lg font-semibold">
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* 2-COLUMN SECTION (IMAGES + TEXT) */}
      <section className="flex flex-col md:flex-row items-start justify-center gap-8 max-w-5xl mx-auto py-16 px-4 md:px-8">
        {/* Left Column: Behind the Scenes Image */}
        <div className="flex-1 w-full aspect-[1/1]">
          <div className="relative w-full aspect-[2/3] bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src="/images/mast.jpg"
              alt="Ema Edosio"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Right Column: Text */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            TELL YOUR STORY. YOUR WAY.
          </h2>
          <div className="text-gray-300 space-y-4">
            <p>
              This masterclass is for filmmakers who want to create bold, honest stories rooted in their own truth.
            </p>
            <p>
              As a filmmaker trained in both film school and real-world experience, I’ve learned that storytelling is not just about technique — it’s about perspective.
            </p>
            <p>
              Every film I’ve made — Kasala!, Otiti, When Nigeria Happens — started with a question I couldn’t ignore, a story I needed to tell.
            </p>
            <p>
              This class is not about chasing trends or formulas.
            </p>
            <p>
              It’s about helping you find your voice — and using your skills, your environment, and your experiences to create films that connect deeply with audiences.
            </p>

            <p className="font-bold">In this masterclass, I’ll share:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>How to find your unique voice as a filmmaker</li>
              <li>How to turn real life into powerful stories</li>
              <li>My creative process — from idea to screen</li>
              <li>How to make films with limited resources</li>
              <li>How to build your audience and distribute your work independently</li>
            </ul>
          </div>

          <Link href="#modules" className="text-red-500 hover:underline font-semibold">
            Explore My Modules
          </Link>
        </div>
      </section>
      {/* Modules Overview Section */}
      <section className="py-16 bg-white text-black" id="modules">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4 title">
              Masterclass Modules Overview
            </h2>
            <p className="text-gray-600 body">
              Explore the comprehensive modules designed to guide you from the creative process to monetization.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {modules.map((module) => (
              <div
                key={module.id}
                className="p-6 border rounded-md hover:shadow-lg transition"
              >
                <h3 className="text-2xl py-5 font-bold mb-2 title">{module.module}: {module.title}</h3>
                {/* Display a short excerpt of content */}
                <p className="text-gray-600 mb-4 pb-5 body">
                  {module.content.substring(0, 200)}...
                </p>
                <Link
                  href={`/classes/${module.id}`}
                  className="inline-block bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition text"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA SECTION */}
      <section className="bg-gray-900 py-16 px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Your story is your power.
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-2">The world doesn’t need another copy — it needs you.</p>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">Let’s get started.</p>
        <button className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-lg font-semibold">
          Enroll Now
        </button>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-black py-16 px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          What Filmmakers Are Saying
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-4 mt-8">
          {/* Testimonial 1 */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg">
            <p className="italic mb-4">
              &quot;This masterclass transformed the way I see filmmaking. The practical
              lessons and behind-the-scenes insights have been game-changing.&quot;
            </p>
            <p className="font-semibold">- Oloruntobi R.</p>
          </div>
          {/* Testimonial 2 */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg">
            <p className="italic mb-4">
              &quot;I learned techniques that I never thought possible. It&aposs like having
              an on-demand mentor for every shoot.&quot;
            </p>
            <p className="font-semibold">- Chinedu S.</p>
          </div>
        </div>
      </section>
    </>
  );
}
