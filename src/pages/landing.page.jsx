import React from "react";
import Header from "../components/header";
import Hero from "../components/hero";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { cards } from "../constants";

const LandingPage = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="py-28">
        <Hero />
        <section className="container py-20">
          <div className="section-title text-center">
            <h3 className="text-[#B0B0C0] text-[24px] font-[700]">
              NEGA BIZNI TANLAYdi?
            </h3>
            <h1 className="text-[64px]">Sizni nima kutyapti</h1>
          </div>
          <div className="row py-20 container">
            {cards.map((item) => (
              <div
                className="col-lg-4 flex justify-center col-md-6 col-sm-12"
                key={item.title}
              >
                <div className="text-center w-[80%] mx-auto">
                  <div className="icon flex justify-center py-5">
                    <img src={item.icon} alt="" />
                  </div>
                  <h2 className="mb-3 text-[24px] text-[#292D32] font-[500]">
                    {item.title}
                  </h2>
                  <h4 className="text-[20px] text-[#666680]">{item.text}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="container py-20">
          <div className="flex items-center justify-between">
            <div className="section-title ">
              <h3 className="text-[#B0B0C0] uppercase text-[24px] font-[700]">
                Materiallar
              </h3>
              <h1 className="text-[64px]">
                Elektron materaillarni yuklab oling
              </h1>
            </div>
            <div className="navigation flex gap-4">
              <button className="w-[64px] text-[20px] h-[64px] rounded-full border-[2px] border-[#000]">
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="w-[64px] text-[20px] h-[64px] rounded-full border-[2px] border-[#000]">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
