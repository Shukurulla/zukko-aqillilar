import React, { useState, useEffect, useRef } from "react";
import { commentUser } from "../../public/images";
import { playDetail } from "../assets";

const VideoReviewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  const reviewsData = [
    {
      name: "Dauletmuratov Axmetbek",
      location: "Nukus shahri, Qoraqolpog'iston Respublikasi",
      comment:
        "Men 'FIKRLASH AKADEMIYASI'siz mental arifmetikani o'rganishda bunday yutuqlarga erishmagan bo'lardim...",
      image: commentUser,
    },
    {
      name: "Fayzullaeva Malika",
      location: "Toshkent shahri",
      comment:
        "Bu platforma mening farzandimning matematik qobiliyatini sezilarli darajada oshirdi...",
      image: commentUser,
    },
  ];

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % reviewsData.length);
      }, 5000);
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlide, reviewsData.length]);

  const goToSlide = (index) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setCurrentSlide(index);
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-[#B0B0C0] uppercase text-lg md:text-xl font-bold">
          Video sharhlar
        </h3>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-2">
          Foydalanuvchilar biz haqimizda nima deydilar
        </h1>
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-[50%] md:w-1/2  aspect-video md:aspect-auto relative">
            <img
              src={reviewsData[currentSlide].image}
              alt={reviewsData[currentSlide].name}
              className="w-[70%] mx-auto h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#255dd694] flex items-center justify-center">
              <button className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white hover:scale-110 transition-transform">
                <img src={playDetail} className="w-8 md:w-10" alt="Play" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              {reviewsData[currentSlide].name}
            </h1>
            <p className="text-gray-500 text-base md:text-lg mb-4">
              {reviewsData[currentSlide].location}
            </p>
            <p className="text-gray-700 text-base md:text-lg">
              {reviewsData[currentSlide].comment}
            </p>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-[#255ED6] w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoReviewsSlider;
