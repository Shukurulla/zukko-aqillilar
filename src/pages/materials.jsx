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
  ];
  return (
    <div className="row h-[100vh] overflow-y-scroll">
      {slidesData.map((item) => (
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="book p-4">
            <div className="image m-auto">
              <img src={item.image} alt="" />
            </div>
            <p className="text-[20px] text-[#C4C4C4]">Avtor</p>
            <h3 className="text-[30px] font-[500] mb-4">{item.author}</h3>
            <div className="grid gap-3 grid-cols-5">
              <div className="col-span-4 flex">
                <button className="px-8 py-2 w-100 text-xl text-md bg-[#255ED6] text-white rounded-full">
                  Ko'rish
                </button>
              </div>
              <button className="w-[50px] border-[3px] flex items-center justify-center border-[#255ED6] h-[50px] rounded-full">
                <img src={Download} className="w-[30px]" alt="" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Materials;
