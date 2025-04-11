import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-black text-white flex flex-col items-center py-30 px-4 my-10 md:px-8">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase title">
            Master the Art of Filmmaking.
            <br />
            Create Stories That Move.
          </h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto body">
            Dive into immersive classes taught by renowned filmmakers.
            Transform your vision into compelling films—one scene at a time.
          </p>
          <Link href="/classes" className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-lg font-semibold body">
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
          <h2 className="text-2xl md:text-3xl font-bold title">
            TELL YOUR STORY. YOUR WAY.
          </h2>
          <div className="text-gray-300 space-y-4 body">
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
          </div>
          <Link href="#modules" className="text-red-500 hover:underline font-semibold body">
            Explore My Modules
          </Link>
        </div>
      </section>
      <section className="max-w-5xl mx-auto py-16 px-4 body">
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold title">
            What You’ll Gain From This Masterclass
          </h2>
          <div className="text-white-300 space-y-4">
            <p>
              This is a creative toolkit built from real-life experience  designed for filmmakers, storytellers, and creators who want to tell bold, honest, and unforgettable stories.
            </p>
            <p>
              Whether you’re just starting out or you’ve been making films for years, this masterclass will challenge you to create from a deeper place  your voice, your world, your truth.
            </p>
            <p className="font-bold">
              By the end of this course, you’ll learn how to:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Find your voice and build your personal storytelling style</li>
              <li>
                Turn everyday life into powerful stories
              </li>
              <li>
                Write scripts that feel honest and human
              </li>
              <li>
                Create visually striking films with limited resources
              </li>
              <li>
                Work with actors to bring authentic performances to life
              </li>
              <li>
                Build an audience that connects with your work
              </li>
              <li>
                Navigate independent filmmaking in Nigeria and globally
              </li>
              <li>
                Monetize and distribute your film on your own terms
              </li>
            </ul>
            <p className="text-gray-100 font-bold text-2xl pt-10">
              Who This Course is For
            </p>
            <p>This course is for you if:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                You want to tell stories rooted in your culture, environment, and experience
              </li>
              <li>
                You believe filmmaking is more than equipment — it’s about heart, truth, and courage
              </li>
              <li>
                You want to make films but feel limited by budget or access
              </li>
              <li>
                You’re ready to take control of your filmmaking journey — from idea to audience
              </li>
              <li>
                You want practical, real-world strategies from someone who has done it
              </li>
            </ul>
            <p className="title text-gray-100 font-bold text-2xl pt-10">
              What Makes This Masterclass Different
            </p>
            <p>
              This is not a technical class filled with complicated jargon.
            </p>
            <p>
              This is a filmmaker’s survival guide.
            </p>
            <p>
              It’s a course built from experience — from making films in Lagos with little resources but big vision.
            </p>
            <p>
              It’s honest.
            </p>
            <p>
              It’s practical.
            </p>
            <p>
              It’s designed to help you move from “I have an idea” to “I made a film.”
            </p>
            <p>
              No gimmicks. No shortcuts. Just the real work of storytelling.
            </p>
          </div>
        </div>
      </section>
      {/* CTA SECTION */}
      <section className="bg-gray-900 py-16 px-4 md:px-8 text-center body">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 title">
          Your story is your power.
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-2">The world doesn’t need another copy — it needs you.</p>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">Let’s get started.</p>
        <button className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-lg font-semibold">
          Enroll Now
        </button>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-black py-16 px-4 md:px-8 text-center body">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 title">
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
