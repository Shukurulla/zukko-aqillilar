import React from "react";
import { PrimaryButton } from "./button";
import { hero } from "../../public/images";

const Hero = () => {
  return (
    <div className="bg-[#F2F5F9] container rounded-[64px] p-[100px]">
      <div className="flex items-center gap-10">
        <div className="text-side w-[50%]">
          <h1 className="text-[56px] l-height-60 font-[600]">
            <span className="text-[#255ED6]">Mental arifmetikani</span> onlayn
            o'rganishda o'ziga xos yondashuv
          </h1>
          <p className="text-[#666680] my-5 text-[20px]">
            Mobil qurilmalar va ish stollarida, foydalanish orqali o'z
            tezligingiz bilan o'rganing va o’rgating
          </p>
          <PrimaryButton>Boshlash</PrimaryButton>
        </div>
        <div className="image-side flex items-center justify-center">
          <img src={hero} className="w-[80%]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
