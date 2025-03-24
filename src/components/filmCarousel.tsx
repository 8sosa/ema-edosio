"use client"

import React, { useState } from "react";
import films from "./films.json";
import Image from "next/image";


const FilmCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
        setCurrentIndex(films.films.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < films.films.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
        setCurrentIndex(0);
    }
  };

  return (
    <section className="bg-white" id="testimonials">
      <div className="relative overflow-hidden">
        {/* Carousel Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {films.films.map((film, index) => (
            <section className="testimonial min-w-full" key={index}>
                <div className="testimonial-image">
                    <Image src={film.posters[1]} width={100} height={150} alt="Another pose" />
                </div>
                <div className="testimonial-content">
                    <p className="testimonial-quote mont">
                        “{film.synopsis}”
                    </p>
                    <p className="testimonial-author altMont">— {film.title}</p>
                </div>
          </section>
          ))}
        </div>
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition"
          aria-label="Previous Slide"
        >
          &lt;
        </button>
        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition"
          aria-label="Next Slide"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default FilmCarousel;