import React from "react";
import { logo } from "../assets";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <img src={logo} alt="Logo" className="h-10 w-14 md:h-10 " />
      <div className="font-semibold text-[#258D97]">
        <h1 className="text-sm">FIKRLASH</h1>
        <h1 className="text-xs">AKADEMIYASI</h1>
      </div>
    </div>
  );
};

export default Logo;
