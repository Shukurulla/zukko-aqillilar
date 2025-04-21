import React from "react";
import {
  Computing,
  Logo,
  Note,
  PasswordCheck,
  VideoHeaderIcon,
  Widgets,
} from "../assets";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./button";

const navItems = [
  {
    label: "Video Kurs",
    path: "#",
    icon: VideoHeaderIcon,
  },
  {
    label: "Kurs Dasturi",
    path: "#course-programm",
    icon: Widgets,
  },
  {
    label: "Materiallar",
    path: "#materials",
    icon: Note,
  },
  {
    label: "Flash kartalar",
    path: "/flash-card",
    icon: PasswordCheck,
  },
  {
    label: "Flash Anzan",
    path: "/flash-anzan",
    icon: Computing,
  },
];

const Header = () => {
  return (
    <header className="w-[100%] fixed top-0 left-0 bg-white">
      <nav className="py-4 flex items-center justify-between container">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="navigatio">
          <div className="flex gap-[40px] items-center">
            {navItems.map((item) => (
              <Link
                className="px-2 py-2 bg-[#fff] text-blue rounded-full flex gap-2"
                to={item.path}
                key={item.path}
              >
                <img src={item.icon} alt="" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <PrimaryButton>Boshlash</PrimaryButton>
      </nav>
    </header>
  );
};

export default Header;
