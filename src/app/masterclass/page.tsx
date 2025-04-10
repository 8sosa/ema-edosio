import Image from "next/image";
import Link from "next/link";
import Home from "../../images/home.jpg";

export default function Page() {
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
          <div className="relative w-full aspect-[1/1] bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src={Home}
              alt="Behind the Scenes in Filmmaking"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Right Column: Text */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Bring Your Vision to Life.
          </h2>
          <p className="text-gray-300">
            Whether you&aposre an aspiring director, cinematographer, or screenwriter,
            learn how to turn raw ideas into visually stunning films.
            Gain insider knowledge on camera techniques, storytelling, and editing.
          </p>
          <Link href="/classes" className="text-red-500 hover:underline font-semibold">
            Explore Filmmaking Courses
          </Link>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-900 py-16 px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Transform Your Filmmaking Today.
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          Join thousands of filmmakers who have elevated their craft through hands-on
          masterclasses, practical workshops, and real-world insights.
        </p>
        <button className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-lg font-semibold">
          Enroll Now
        </button>
      </section>

      {/* ENTERPRISE / TEAM SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto py-16 px-4 md:px-8 gap-6">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Elevate Your Film Team
          </h3>
          <p className="text-gray-300 mb-4">
            Equip your production crew or creative team with cutting-edge skills and
            insider techniques from top industry experts.
            Cultivate a collaborative spirit that drives innovation on set.
          </p>
          <Link 
            href="/classes"
            className="inline-block bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Join Our Enterprise Program
          </Link>
        </div>
        <div className="flex-1 w-full">
          <div className="relative w-full h-48 md:h-64 bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src={Home}
              alt="Film Crew Collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>
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
            <p className="font-semibold">- Alex R.</p>
          </div>
          {/* Testimonial 2 */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg">
            <p className="italic mb-4">
              &quot;I learned techniques that I never thought possible. It&aposs like having
              an on-demand mentor for every shoot.&quot;
            </p>
            <p className="font-semibold">- Morgan S.</p>
          </div>
        </div>
      </section>
    </>
  );
}
