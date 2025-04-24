import React from "react";
import { Book, Download } from "../assets";

const Materials = () => {
  const slidesData = [
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
    {
      author: "Kalbaeva Aysuluw",
      image: Book,
    },
  ];

  return (
    <div className="row h-[100vh] container py-5 px-2">
      {slidesData.map((item, index) => (
        <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="book p-3 sm:p-4 bg-white rounded-lg shadow-md">
            <div className="image m-auto w-32 h-32 sm:w-40 sm:h-40">
              <img
                src={item.image}
                alt="Book cover"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-base text-[#C4C4C4] mt-2">Avtor</p>
            <h3 className="text-lg sm:text-2xl font-medium mb-3 sm:mb-4">
              {item.author}
            </h3>
            <div className="grid gap-2 sm:gap-3 grid-cols-5">
              <div className="col-span-4 flex">
                <button className="w-full py-1.5 sm:py-2 px-4 sm:px-8 text-sm sm:text-lg bg-[#255ED6] text-white rounded-full">
                  Ko'rish
                </button>
              </div>
              <button className="w-10 h-10 sm:w-12 sm:h-12 border-[2px] sm:border-[3px] flex items-center justify-center border-[#255ED6] rounded-full">
                <img
                  src={Download}
                  className="w-5 sm:w-6"
                  alt="Download icon"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Materials;
