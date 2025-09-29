import React, { useState } from "react";
import { FiExternalLink, FiStar, FiClock, FiTarget } from "react-icons/fi";

const GamesPage = () => {
  const games = [
    {
      id: 1,
      title: "Sehrli sonlar olami",
      description:
        "Sehrli sonlar sizga turli qiyofalarda ko'rinadi. Rasmga qarab, bu qaysi son ekanini ayting!",
      url: "https://learningapps.org/watch?v=p6cw6gkc525",
      category: "Sonlarni tanish",
      difficulty: "Oson",
      icon: "🔢",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Qaysi obraz qaysi sonni ifodalaydi?",
      description: "Obrazni tanlang va unga mos keladigan sonni belgilang.",
      url: "https://learningapps.org/watch?v=pabdrn18a25",
      category: "Obraz va son",
      difficulty: "Oson",
      icon: "🎨",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 3,
      title: "Sonlar va obrazlar",
      description: "Sonlar va obrazlarni moslashtirish o'yini",
      url: "https://learningapps.org/watch?v=p3s3w8hbc25",
      category: "Moslashtirish",
      difficulty: "O'rta",
      icon: "🎯",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      title: "3 karra jadvali – Sehrli kapalak",
      description: "3 ga ko'paytirish jadvalini sehrli kapalak bilan o'rganing",
      url: "https://learningapps.org/watch?v=pvqgy74fc25",
      category: "Ko'paytirish jadvali",
      difficulty: "O'rta",
      icon: "🦋",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 5,
      title: "Dengiz sayohati: 4 karra jadvali",
      description:
        "4 ga ko'paytirish jadvalini dengiz sayohati bilan o'rganing",
      url: "https://learningapps.org/watch?v=pe3zvadw325",
      category: "Ko'paytirish jadvali",
      difficulty: "O'rta",
      icon: "🚢",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 6,
      title: "Tezkor samokat bilan 5 karra sayohat",
      description: "5 ga ko'paytirish jadvalini tezkor samokat bilan o'rganing",
      url: "https://learningapps.org/watch?v=pmcv449q325",
      category: "Ko'paytirish jadvali",
      difficulty: "O'rta",
      icon: "🛴",
      color: "bg-red-100 text-red-600",
    },
    {
      id: 7,
      title: "6 karra jadvali – Sabrli shilliqurt",
      description:
        "6 ga ko'paytirish jadvalini sabrli shilliqurt bilan o'rganing",
      url: "https://learningapps.org/watch?v=paq8d21ea25",
      category: "Ko'paytirish jadvali",
      difficulty: "Qiyin",
      icon: "🐌",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 8,
      title: "7 karra jadvali – Yuksak bayroq",
      description: "7 ga ko'paytirish jadvalini yuksak bayroq bilan o'rganing",
      url: "https://learningapps.org/watch?v=pf63gqkaa25",
      category: "Ko'paytirish jadvali",
      difficulty: "Qiyin",
      icon: "🚩",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 9,
      title: "8 karra jadvali – Quvnoq cho'chqacha",
      description:
        "8 ga ko'paytirish jadvalini quvnoq cho'chqacha bilan o'rganing",
      url: "https://learningapps.org/watch?v=pg5y9vi9c25",
      category: "Ko'paytirish jadvali",
      difficulty: "Qiyin",
      icon: "🐷",
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 10,
      title: "Sehrli delfin va ipli shar. 9 karra sirlari",
      description: "9 ga ko'paytirish jadvalini sehrli delfin bilan o'rganing",
      url: "https://learningapps.org/watch?v=phpi8oue225",
      category: "Ko'paytirish jadvali",
      difficulty: "Qiyin",
      icon: "🐬",
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const categories = [
    "Barchasi",
    "Sonlarni tanish",
    "Obraz va son",
    "Moslashtirish",
    "Ko'paytirish jadvali",
  ];

  const filteredGames =
    selectedCategory === "Barchasi"
      ? games
      : games.filter((game) => game.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Oson":
        return "text-green-600 bg-green-100";
      case "O'rta":
        return "text-yellow-600 bg-yellow-100";
      case "Qiyin":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ta'limiy O'yinlar</h1>
        <p className="text-gray-600">
          Mental arifmetika bo'yicha qiziqarli o'yinlar to'plami
        </p>
      </div>

      {/* Categories Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div
              className={`h-24 ${game.color} flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300`}
            >
              {game.icon}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {game.category}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(
                    game.difficulty
                  )}`}
                >
                  {game.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {game.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {game.description}
              </p>

              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
              >
                O'yinni boshlash
                <FiExternalLink className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-full shadow-md">
            <FiTarget className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              O'yin orqali o'rganish
            </h3>
            <p className="text-gray-600">
              Bu o'yinlar orqali bolalar mental arifmetika, sonlarni tanish va
              ko'paytirish jadvalini qiziqarli va samarali tarzda o'rganishadi.
              Har bir o'yin maxsus pedagogik maqsadlarga mo'ljallangan va
              bolalarning mantiqiy fikrlashini rivojlantiradi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
