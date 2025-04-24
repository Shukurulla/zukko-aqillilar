import React from "react";
import { PrimaryButton } from "./button";
import { hero } from "../../public/images";

const Hero = () => {
  return (
    <div className="bg-[#F2F5F9] container w-full mx-auto rounded-3xl md:rounded-[64px] px-6 py-12 md:p-16 lg:p-[100px]">
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
        {/* Text Content - Mobile first (top), Desktop (left) */}
        <div className="text-side w-full lg:w-[50%] order-1 lg:order-2 md:text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold leading-tight md:leading-[60px]">
            <span className="text-[#255ED6]">Mental arifmetikani</span> onlayn
            <br className="hidden sm:block" /> o'rganishda o'ziga xos yondashuv
          </h1>
          <p className="text-[#666680] my-4 md:my-5 text-base md:text-lg lg:text-[20px]">
            Mobil qurilmalar va ish stollarida, foydalanish orqali o'z
            tezligingiz bilan o'rganing va o'rgating
          </p>
          <div className="flex justify-start lg:justify-start">
            <PrimaryButton className="px-8 py-3 text-base md:text-lg">
              Boshlash
            </PrimaryButton>
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
