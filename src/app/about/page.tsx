"use client";
import { useState } from "react";
import './page.css';
import Image from "next/image";

export default function AboutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook into your booking API or service
    console.log("Booking request:", form);
    alert("Thanks! We’ll be in touch to confirm your consultation.");
  };

  return (
    <section className="aboutPage">
      {/* Content Section */}
      <div className="aboutSecondSection mont flex flex-col lg:flex-row items-start gap-12">
        <div className="aboutImageSection w-full aspect-[2/3] lg:w-1/2 relative lg:sticky lg:top-24">
          <Image 
            src="/images/mast.jpg"
            alt="Ema Edosio Deelen"
            width={800}
            height={1000}
            className="object-cover rounded-lg"
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
          <button className="mt-4 px-6 py-3 text-white rounded-full transition">
            My Resume
          </button>
        </div>
      </div>

      {/* Consultation Section */}
      <div aria-labelledby="consultation-heading" className="container mx-auto mt-16 px-6 lg:px-0 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Text Column */}
        <div className="space-y-6 px-5">
          <h2
            id="consultation-heading"
            className="text-4xl lg:text-5xl font-serif uppercase leading-tight"
          >
            Book a Paid Consultation
          </h2>

          <p className="text-lg">
            As a filmmaker, your vision deserves precision and passion. Fill
            out the form below to request a one‑on‑one session with Ema Edosio:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>Sharpen your story’s core theme and emotional arc</li>
            <li>Craft characters that leap off the page and screen</li>
            <li>Design a production roadmap that maximizes every budget dollar</li>
            <li>Elevate your visual language with proven cinematography tips</li>
            <li>Strategize your festival run and audience engagement plan</li>
          </ul>
        </div>

        {/* Form Column */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="project" className="block mb-1 font-medium">
                Project Description
              </label>
              <textarea
                id="project"
                name="project"
                rows={4}
                required
                value={form.project}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block mb-1 font-medium">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="time" className="block mb-1 font-medium">
                  Preferred Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={form.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-4 inline-block px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition"
            >
              Request Consultation
            </button>
          </form>
        </div>
      </div>
      </div>
    </section>
  );
}
