// src/pages/Cartoons.jsx
import React, { useState } from "react";
import { FiPlay, FiX } from "react-icons/fi";

const Cartoons = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 8 ta multfilm uchun ma'lumotlar
  const cartoons = [
    {
      id: 1,
      title: "2 × 2 = 4 - Oqqushlar sarguzashti",
      description: "Ikki oqqush muzlagan ko'lda uchrashadilar",
      thumbnail: "/cartoon-thumb-1.jpg",
      link: "https://vpsserver.kerek.uz/cartoon/1.mp4",
    },
    {
      id: 2,
      title: "2 × 3 = 6 - Kapalaklar va gilos",
      description: "Uchta kapalak gilos bog'ida uchrashadilar",
      thumbnail: "/cartoon-thumb-2.jpg",
      link: "https://vpsserver.kerek.uz/cartoon/2.mp4",
    },
    {
      id: 3,
      title: "2 × 4 = 8 - Dinozavr va qor bobo",
      description: "To'rtta dinozavr qor boboni kutib olishadi",
      thumbnail: "/cartoon-thumb-3.jpg",
      link: "https://vpsserver.kerek.uz/cartoon/3.mp4",
    },
    {
      id: 4,
      title: "2 × 5 = 10 - Yulduzlar kemasi",
      description: "Beshta yulduz kosmik kemada sayohat qilishadi",
      thumbnail: "/cartoon-thumb-4.jpg",
      link: "https://vpsserver.kerek.uz/cartoon/4.mp4",
    },
    {
      id: 5,
      title: "2 × 6 = 12 - Qulflar siri",
      description: "Oltita sehr qulf sirli xazinani saqlaydi",
      thumbnail: "/cartoon-thumb-5.jpg",
      link: "https://vpsserver.kerek.uz/cartoon/5.mp4",
    },
    {
      id: 6,
      title: "2 × 7 = 14 - Bumerang sarguzashti",
      description: "Yetti bumerang havoda raqsga tushadi",
      thumbnail: "/cartoon-thumb-6.jpg",
      link: "https://vpsserver.kerek.uz/cartoon/6.mp4",
    },
    {
      id: 7,
      title: "2 × 8 = 16 - Sakkizoyoqlar oilasi",
      description: "Sakkizta do'st dengizda sarguzasht qilishadi",
      thumbnail: "/cartoon-thumb-7.jpg",
      link: "https://vpsserver.kerek.uz/cartoon/7.mp4",
    },
    {
      id: 8,
      title: "2 × 9 = 18 - Sehrli delfin va ipli shar",
      description: "To'qqizta ipli shar sehrli delfin bilan uchishadi",
      thumbnail: "/cartoon-thumb-8.jpg",
      link: "https://vpsserver.kerek.uz/cartoon/8.mp4",
    },
  ];

  const openVideo = (cartoon) => {
    setSelectedVideo(cartoon);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ta'limiy Multfilmlar</h1>
        <p className="text-gray-600">
          Ko'paytirish jadvalini o'rganish uchun qiziqarli multfilmlar
        </p>
      </div>

      {/* Cartoons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cartoons.map((cartoon) => (
          <div
            key={cartoon.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={() => openVideo(cartoon)}
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <div className="text-white text-6xl font-bold opacity-20">
                {cartoon.id}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPlay className="text-blue-600 text-2xl ml-1" />
                </div>
              </div>
              {/* Cartoon number badge */}
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
                #{cartoon.id}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">
                {cartoon.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {cartoon.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Ko'paytirish jadvali
                </span>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  Ko'rish →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
              <button
                onClick={closeVideo}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                <FiX className="text-gray-600 text-xl" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative bg-black aspect-video">
              <video
                controls
                autoPlay
                className="w-full h-full"
                src={selectedVideo.link}
              >
                <source src={selectedVideo.link} type="video/mp4" />
                Brauzeringiz video formatini qo'llab-quvvatlamaydi.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t">
              <p className="text-gray-600">{selectedVideo.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Multfilm #{selectedVideo.id}
                </span>
                <button
                  onClick={closeVideo}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartoons;
