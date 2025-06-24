import React, { useState, useEffect } from "react";
import {
  Computing,
  MoreSquare,
  Note,
  PasswordCheck,
  VideoHeaderIcon,
  Widgets,
} from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "./button";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./logo";

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
    label: "Video sharhlar",
    path: "#comments",
    icon: PasswordCheck,
  },
  {
    label: "Flash kartalar",
    path: "/flash-card",
    icon: MoreSquare,
  },
  {
    label: "Flash Anzan",
    path: "/flash-anzan",
    icon: Computing,
  },
];

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scrollni kuzatish
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menyuni yopish
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`w-full z-[999] fixed top-0 left-0 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <nav className="py-3 px-4 md:py-4 md:px-6 lg:container lg:mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="logo flex items-center">
          <Link to="/" className="focus:outline-none flex gap-1 items-center">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 items-center">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="group px-3 py-2 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              // onClick={closeMobileMenu}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Desktop Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="hidden lg:block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Boshlash
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-50 mt-16 overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    <span className="text-base font-medium">{item.label}</span>
                  </a>
                ))}
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    closeMobileMenu();
                  }}
                  className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Boshlash
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
