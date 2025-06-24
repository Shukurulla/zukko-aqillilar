import React from "react";
import { PrimaryButton } from "./button";
import { hero } from "../../public/images";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F2F5F9] container w-full mx-auto rounded-3xl md:rounded-[64px] px-6 py-12 md:p-16 lg:p-[100px]">
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
        {/* Text Content - Mobile first (top), Desktop (left) */}
        <div className="text-side w-full lg:w-[50%] order-1 lg:order-2 md:text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold leading-tight md:leading-[60px]">
            <span className="text-[#255ED6]">
              Aqlni charxlaydigan platformaga xush kelibsiz!
            </span>
          </h1>
          <p className="text-[#666680] my-4 md:my-5 text-base md:text-lg lg:text-[20px]">
            Fikrlash Akademiyasi – bu nafaqat o‘rgatadigan, balki
            ilhomlantiradigan makon. Chunki mantiqiy fikrlashni o‘rgatish — bu
            ham san’at, ham fan. Ushbu platforma sizga ushbu san’atni ilmiy
            yondashuvlar, metodik vositalar va innovatsion mashqlar orqali
            egallash imkonini beradi
          </p>
          <div className="flex justify-start lg:justify-start">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 text-xl text-md bg-[#255ED6] text-white rounded-full"
            >
              Boshlash
            </button>
          </div>
        </div>

        {/* Image - Mobile first (bottom), Desktop (right) */}
        <div className="image-side w-full lg:w-[50%] flex items-center justify-center order-2 lg:order-1">
          <img
            src={hero}
            className="w-full max-w-md lg:max-w-none lg:w-[80%] h-auto"
            alt="Mental arifmetika tasviri"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
