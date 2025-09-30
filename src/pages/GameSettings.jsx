// src/pages/GameSettings.jsx
import { useState } from "react";
import { FiPlay, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function GameSettings({ onStart, initialSettings }) {
  const [settings, setSettings] = useState({
    ...initialSettings,
    method: "simple",
  });
  const [gameMode, setGameMode] = useState("single");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ ...settings, gameMode });
  };

  const regularityTimes = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.5, 2, 2.5, 3,
  ];

  const token = localStorage.getItem("flash-jwt");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-6/5">
        {!token && (
          <div className="absolute top-5 left-5">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center text-white text-2xl rounded-full shadow-lg cursor-pointer bg-blue-600 hover:bg-blue-700 transition"
            >
              <FiChevronLeft />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Flash <span className="text-blue-600">Anzan</span>
          </h1>
          <p className="text-gray-600">O'yin sozlamalarini tanlang</p>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Game Mode */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              O'yin rejimi
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`py-4 px-6 rounded-xl font-medium transition-all duration-200 ${
                  gameMode === "single"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setGameMode("single")}
              >
                Bir odamlik
              </button>
              <button
                className={`py-4 px-6 rounded-xl font-medium transition-all duration-200 ${
                  gameMode === "audience"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setGameMode("audience")}
              >
                Auditoriya
              </button>
            </div>
          </div>

          {/* Hisoblash usuli */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Hisoblash usuli
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "simple", label: "Oddiy (1-4)" },
                { value: "helper5", label: "Yordamchi 5" },
                { value: "helper10", label: "Yordamchi 10" },
                { value: "mixed", label: "Aralash" },
              ].map((method) => (
                <button
                  key={method.value}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    settings.method === method.value
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, method: method.value }))
                  }
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Raqamlar soni */}
          {settings.method === "mixed" && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Raqamlar soni
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    className={`py-3 rounded-xl font-medium transition-all duration-200 ${
                      settings.digitCount == count
                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, digitCount: count }))
                    }
                  >
                    {count} xonali
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Muntazamlik */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Muntazamlik
              </label>
              <span className="text-blue-600 font-bold text-lg">
                {settings.regularity}s
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max={regularityTimes.length - 1}
                value={regularityTimes.indexOf(settings.regularity)}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    regularity: regularityTimes[e.target.value],
                  }))
                }
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                    (regularityTimes.indexOf(settings.regularity) /
                      (regularityTimes.length - 1)) *
                    100
                  }%, #E5E7EB ${
                    (regularityTimes.indexOf(settings.regularity) /
                      (regularityTimes.length - 1)) *
                    100
                  }%, #E5E7EB 100%)`,
                }}
              />
            </div>
          </div>

          {/* Tema */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Amallar
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "add", label: "Qo'shish", icon: "+" },
                { value: "subtract", label: "Ayirish", icon: "−" },
                { value: "mixed", label: "Aralash", icon: "±" },
              ].map((op) => (
                <button
                  key={op.value}
                  className={`py-3 rounded-xl font-medium transition-all duration-200 ${
                    settings.operation === op.value
                      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, operation: op.value }))
                  }
                >
                  <div className="text-2xl mb-1">{op.icon}</div>
                  <div className="text-xs">{op.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Ketma-ket misollar soni */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Ketma-ket misollar
              </label>
              <span className="text-purple-600 font-bold text-lg">
                {settings.sequenceLength}
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="10"
                value={settings.sequenceLength}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    sequenceLength: parseInt(e.target.value),
                  }))
                }
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #9333EA 0%, #9333EA ${
                    ((settings.sequenceLength - 1) / 9) * 100
                  }%, #E5E7EB ${
                    ((settings.sequenceLength - 1) / 9) * 100
                  }%, #E5E7EB 100%)`,
                }}
              />
            </div>
          </div>

          {/* Usul haqida ma'lumot */}
          {settings.method && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Tanlangan usul:</span>{" "}
                {settings.method === "simple" &&
                  "Oddiy usulda faqat 1-4 sonlar ishlatiladi. Qo'shishda natija 44 dan oshmaydi."}
                {settings.method === "helper5" &&
                  "Yordamchi 5 usulida 5 soni qo'shiladi. Masalan: 1+5, 2+5, 3+5, 4+5"}
                {settings.method === "helper10" &&
                  "Yordamchi 10 usulida 10 gacha bo'lgan sonlar ishlatiladi."}
                {settings.method === "mixed" &&
                  "Aralash usulda barcha usullar birgalikda ishlatiladi."}
              </p>
            </div>
          )}

          {/* Start button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FiPlay className="text-xl" />
            Boshlash
          </button>
        </div>
      </div>
    </div>
  );
}
