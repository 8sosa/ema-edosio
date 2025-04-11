import React from "react";
import Image from "next/image";
import Link from "next/link";
import masterclassData from "@/components/modules.json";
import Home from "../../images/home.jpg";


type Module = {
  id: string;
  title: string;
  module: string;
  intro: string;
};

export default function MasterclassesPage() {
  // Here we assume the JSON has a "modules" array.
  const modules: Module[] = masterclassData.modules;

  return (
    <main className="w-full min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full aspect-[15/7] bg-gradient-to-r from-gray-800 to-black text-white lg:py-30 lg:px-30">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h1 className="text-6xl md:text-5xl font-bold mb-4 title">
              Learn the Process. Build Your Voice. Tell Your Story.
            </h1>
            <p className="mb-1 text-lg body">
              This course is a step-by-step guide to how I make films — from the first idea to the final cut. Every module is designed to give you practical tools, honest insight, and a creative mindset to help you tell stories that matter.
            </p>
            <p className="mb-6 text-lg body">
              This is not theory — this is real-world filmmaking.
            </p>
            <Link
                href="#modules"
                className="inline-block bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition body"
            >
                Learn More
            </Link>
          </div>
          <div className="flex-1 mt-8 md:mt-0 md:flex md:justify-end">
            <Image
              src={Home}
              alt="Film Camera or Director"
              className="rounded-md shadow-lg max-w-xs md:max-w-sm"
            />
          </div>
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
                  {module.intro}
                </p>
                <Link
                  href={`/classes/${module.id}`}
                  className="inline-block bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition body"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
