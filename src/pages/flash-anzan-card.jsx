// src/pages/flash-anzan-card.jsx
import { useState } from "react";
import { FiChevronLeft, FiPlay } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function FlashAnzanCard({ onStart, initialSettings }) {
  const [settings, setSettings] = useState({
    mode: "single",
    digitCount: 1,
    regularity: 1.0,
    displayCount: 1,
    sequenceLength: 1,
    theme: "cards",
    ...initialSettings,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(settings);
  };

  const regularityTimes = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.5, 2, 2.5, 3,
  ];

  const token = localStorage.getItem("flash-jwt");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
            Flash <span className="text-green-600">Kartalar</span>
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
                  settings.mode === "single"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-200 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setSettings((prev) => ({ ...prev, mode: "single" }))
                }
              >
                Bir odamlik
              </button>
              <button
                className={`py-4 px-6 rounded-xl font-medium transition-all duration-200 ${
                  settings.mode === "auditorium"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-200 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setSettings((prev) => ({ ...prev, mode: "auditorium" }))
                }
              >
                Auditoriya
              </button>
            </div>
          </div>

          {/* Raqamlar soni */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Raqamlar soni
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((count) => (
                <button
                  key={count}
                  className={`py-3 rounded-xl font-medium transition-all duration-200 ${
                    settings.digitCount === count
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
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

          {/* Muntazamlik */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Muntazamlik
              </label>
              <span className="text-green-600 font-bold text-lg">
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
                  background: `linear-gradient(to right, #10B981 0%, #10B981 ${
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

          {/* Ketma-ket kartalar soni */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Ketma-ket kartalar soni
              </label>
              <span className="text-blue-600 font-bold text-lg">
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
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                    ((settings.sequenceLength - 1) / 9) * 100
                  }%, #E5E7EB ${
                    ((settings.sequenceLength - 1) / 9) * 100
                  }%, #E5E7EB 100%)`,
                }}
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-sm text-green-800">
              <span className="font-semibold">Ma'lumot:</span> Flash kartalar
              0-99 gacha bo'lgan raqamlarni vizual ravishda ko'rsatadi va
              bolalarning hisoblash qobiliyatini rivojlantiradi.
            </p>
          </div>

          {/* Start button */}
          <button
            onClick={handleSubmit}
            className="w-full px-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-green-200 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FiPlay className="text-xl" />
            Boshlash
          </button>
        </div>
      </div>
    </div>
  );
}
