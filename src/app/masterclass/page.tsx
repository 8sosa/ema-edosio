import Image from "next/image";
import Link from "next/link";


export default function Page() {
  return (
    <>
      <section className="relative w-full bg-black text-white flex flex-col items-center py-16 px-4 my-10 md:px-8">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
            Learn From the Best.
            <br />
            Get Unlimited Access.
          </h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Immerse yourself in classes taught by Ema Edosio.
            Elevate your skills, passions, and future — one lesson at a time.
          </p>
          <button className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-lg font-semibold">
            Start Growing
          </button>
        </div>
      </section>

      {/* 2-COLUMN SECTION (IMAGES + TEXT) */}
      <section className="flex flex-col md:flex-row items-start justify-center gap-8 max-w-5xl mx-auto py-16 px-4 md:px-8">
        {/* Left Column: Images */}
        <div className="flex-1 w-full aspect-[1/1]">
          <div className="relative w-full aspect-[1/1] bg-gray-700 rounded-lg overflow-hidden">
              <Image
              src="/images/ph.png"
              alt="Masterclass Sample 4"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Right Column: Text */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Anytime, Anywhere.
          </h2>
          <p className="text-gray-300">
            Watch on your phone, tablet, computer, or TV. On the go or at home. 
            Learn at your own pace—download lessons for offline viewing.
          </p>
          <Link href="#" className="text-red-500 hover:underline font-semibold">
            Explore Membership
          </Link>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-900 py-16 px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Journey Today.
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          Join thousands of learners who have transformed their passions into
          real-world skills.
        </p>
        <button className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-lg font-semibold">
          Sign Up Now
        </button>
      </section>

      {/* ENTERPRISE / TEAM SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto py-16 px-4 md:px-8 gap-6">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Level Up Your Team
          </h3>
          <p className="text-gray-300 mb-4">
            Give your employees or organization unlimited access to the world’s best.
            Foster growth, creativity, and innovation from the inside out.
          </p>
          <Link href="#" className="inline-block bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">
            Learn About Enterprise
          </Link>
        </div>
        <div className="flex-1 w-full">
          {/* Optional image or illustration */}
          <div className="relative w-full h-48 md:h-64 bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src="/images/ph.png"
              alt="Team Collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-black py-16 px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          See What Our Members Are Saying
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-4 mt-8">
          {/* Testimonial 1 */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg">
            <p className="italic mb-4">
            &quot;MasterClass opened my eyes to new creative possibilities. 
              The lessons are so in-depth!&quot;
            </p>
            <p className="font-semibold">- Jane J.</p>
          </div>
          {/* Testimonial 2 */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg">
            <p className="italic mb-4">
            &quot;I&apos;ve learned so much from the best in the business. 
              It&apos;s like having a personal mentor on-demand.&quot;
            </p>
            <p className="font-semibold">- John D.</p>
          </div>
        </div>
      </section>
    </>
  );
}
