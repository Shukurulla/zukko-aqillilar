import React from "react";
import Header from "../components/header";
import Hero from "../components/hero";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { cards } from "../constants";
import { PrimaryButton } from "../components/button";
import MaterialsSlider from "../components/slider-section";
import { commentUser } from "../../public/images";
import VideoReviewsSlider from "../components/comments";
import FAQSection from "../components/faq";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiPhoneCall } from "react-icons/fi";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import Logo from "../components/logo";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main className="pt-16 md:pt-24 lg:pt-28">
        <Hero />

        {/* Why Choose Us Section */}
        <section id="course-programm" className="container px-4 py-12 md:py-20">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-[#B0B0C0] text-lg md:text-2xl font-bold uppercase">
              NEGA BIZNI TANLAYdi?
            </h3>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-2">
              Sizni nima kutyapti
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((item) => (
              <div key={item.title} className="text-center p-4">
                <div className="flex justify-center py-4">
                  <img src={item.icon} alt={item.title} className="h-16 w-16" />
                </div>
                <h2 className="text-xl md:text-2xl font-medium text-[#292D32] mb-2">
                  {item.title}
                </h2>
                <p className="text-base md:text-lg text-[#666680]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* <MaterialsSlider /> */}

        <section id="comments" className="container px-4 py-12 md:py-20">
          <VideoReviewsSlider />
        </section>

        {/* Footer */}
        <footer className="container px-4 py-12 md:py-20">
          <div className="bg-[#F2F5F9] rounded-3xl lg:rounded-[64px] p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Column 1 */}
              <div>
                <Logo />
                <p className="text-[#666680] mt-4 text-sm md:text-base">
                  78/112, A.Dosnazarov, Nukus, <br /> Qoraqalpog'iston,
                  O'zbekiston
                </p>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-[#181B32]">
                  Video Kurs
                </h3>
                <ul className="mt-4 space-y-2">
                  {["Kirish", "1 Dars", "2 Dars", "3 Dars"].map((item) => (
                    <li key={item}>
                      <Link className="text-[#666680] hover:text-blue-600 text-base md:text-lg">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-[#181B32]">
                  Materiallar
                </h3>
                <ul className="mt-4 space-y-2">
                  {[
                    "Abakus 5-8 yosh",
                    "Mental arifmetika 1",
                    "Mental arifmetika 2",
                  ].map((item) => (
                    <li key={item}>
                      <Link className="text-[#666680] hover:text-blue-600 text-base md:text-lg">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4 */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-[#181B32]">
                  Bog'lanish
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link className="text-[#666680] hover:text-blue-600 flex items-center gap-3 text-base md:text-lg">
                      <div className="icon w-10 h-10 rounded-full border border-[#E8E8F6] flex items-center justify-center">
                        <FaGoogle className="text-blue-600" />
                      </div>
                      <span>kalekeevast@gmail.com</span>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="tel:+998972203088"
                      className="text-[#666680] hover:text-blue-600 flex items-center gap-3 text-base md:text-lg"
                    >
                      <div className="icon w-10 h-10 rounded-full border border-[#E8E8F6] flex items-center justify-center">
                        <FiPhoneCall className="text-blue-600" />
                      </div>
                      <span>+998972203088</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
