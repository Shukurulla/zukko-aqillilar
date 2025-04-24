import React, { useState, useEffect } from "react";
import { Book, Download } from "../assets";
import { PrimaryButton } from "../components/button";

const MaterialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const slidesData = [
    { author: "Kalbaeva Aysuluw", image: Book },
    { author: "Kalbaeva Aysuluw", image: Book },
    { author: "Kalbaeva Aysuluw", image: Book },
    { author: "Kalbaeva Aysuluw", image: Book },
    { author: "Kalbaeva Aysuluw", image: Book },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
      setCurrentSlide(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentSlide < slidesData.length - slidesToShow) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const canGoNext = currentSlide < slidesData.length - slidesToShow;
  const canGoPrev = currentSlide > 0;

  return (
    <section id="materials" className="container px-4 py-12 md:py-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-[#B0B0C0] uppercase text-lg md:text-xl font-bold">
            Materiallar
          </h3>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Elektron materaillarni yuklab oling
          </h1>
        </div>

        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center ${
              canGoPrev
                ? "border-[#255ED6] bg-[#255ED6] text-white"
                : "border-gray-300 text-gray-300"
            }`}
          >
            &larr;
          </button>
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center ${
              canGoNext
                ? "border-[#255ED6] bg-[#255ED6] text-white"
                : "border-gray-300 text-gray-300"
            }`}
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            width: `${(slidesData.length / slidesToShow) * 100}%`,
          }}
        >
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className="px-2"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="mb-4">
                  <img
                    src={slide.image}
                    alt={slide.author}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-gray-400 text-sm md:text-base">Avtor</p>
                <h3 className="text-xl md:text-2xl font-medium mb-4">
                  {slide.author}
                </h3>
                <div className="flex justify-between items-center">
                  <PrimaryButton className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base">
                    Ko'rish
                  </PrimaryButton>
                  <button className="w-12 h-12 md:w-14 md:h-14 border-2 border-[#255ED6] rounded-full flex items-center justify-center">
                    <img src={Download} alt="Download" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsSlider;
