import { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function GameSettings({ onStart, initialSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [gameMode, setGameMode] = useState("single"); // 'single' or 'audience'
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ ...settings, gameMode });
  };

  const sequenceNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [startIndex, setStartIndex] = useState(0);

  const visibleNumbers = [
    sequenceNumbers[startIndex % sequenceNumbers.length],
    sequenceNumbers[(startIndex + 1) % sequenceNumbers.length],
    sequenceNumbers[(startIndex + 2) % sequenceNumbers.length],
  ];

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + sequenceNumbers.length) % sequenceNumbers.length
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % sequenceNumbers.length);
  };

  const regularityTimes = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.5, 2, 2.5, 3,
  ];
  const [regStartIndex, setRegStartIndex] = useState(1);

  const visibleRegularities = [
    regularityTimes[regStartIndex % regularityTimes.length],
    regularityTimes[(regStartIndex + 1) % regularityTimes.length],
    regularityTimes[(regStartIndex + 2) % regularityTimes.length],
  ];

  const handlePrevReg = () => {
    setRegStartIndex(
      (prev) => (prev - 1 + regularityTimes.length) % regularityTimes.length
    );
  };

  const handleNextReg = () => {
    setRegStartIndex((prev) => (prev + 1) % regularityTimes.length);
  };
  const token = localStorage.getItem("flash-jwt");

  return (
    <div className="bg-white h-screen w-[100%]  md:w-[70%] lg:w-[70%] mx-auto  p-5">
      {token ? (
        ""
      ) : (
        <div className="absolute top-5 left-5">
          <div
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center text-white text-2xl rounded-full shadow-lg cursor-pointer bg-blue-600"
          >
            <FiChevronLeft />
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold text-center mb-6">
        Flash <span className="text-blue-600">Anzan</span>
      </h1>

      {/* O'yin rejimi */}
      <div className="mb-4 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">O'yin rejimi</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-1 text-sm ${
              gameMode === "single"
                ? "text-blue-600 font-semibold bg-white rounded-full shadow-sm"
                : "text-gray-400 font-semibold bg-gray-100 rounded-full"
            }`}
            onClick={() => setGameMode("single")}
          >
            Bir odamlik
          </button>
          <button
            className={`px-4 py-1 text-sm ${
              gameMode === "audience"
                ? "text-blue-600 font-semibold bg-white rounded-full shadow-sm"
                : "text-gray-400 font-semibold bg-gray-100 rounded-full"
            }`}
            onClick={() => setGameMode("audience")}
          >
            Auditoriya
          </button>
        </div>
      </div>

      {/* Raqamlar soni */}
      <div className="mb-4 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">Raqamlar soni</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-1 text-sm ${
              settings.digitCount == 1
                ? "text-blue-600 font-semibold bg-white shadow-sm"
                : "text-gray-400 bg-gray-100"
            } rounded-full`}
            onClick={() => setSettings((prev) => ({ ...prev, digitCount: 1 }))}
          >
            1 xonali
          </button>
          <button
            className={`px-4 py-1 text-sm ${
              settings.digitCount == 2
                ? "text-blue-600 font-semibold bg-white shadow-sm"
                : "text-gray-400 bg-gray-100"
            } rounded-full`}
            onClick={() => setSettings((prev) => ({ ...prev, digitCount: 2 }))}
          >
            2 xonali
          </button>
          <button
            className={`px-4 py-1 text-sm ${
              settings.digitCount == 3
                ? "text-blue-600 font-semibold bg-white shadow-sm"
                : "text-gray-400 bg-gray-100"
            } rounded-full`}
            onClick={() => setSettings((prev) => ({ ...prev, digitCount: 3 }))}
          >
            3 xonali
          </button>
        </div>
      </div>

      {/* Muntazamlik */}
      {/* DESKTOP ko‘rinish */}
      <div className="hidden sm:flex mb-4 flex-wrap gap-2 items-center justify-between">
        <h2 className="text-base font-bold text-blue-600">Muntazamlik</h2>
        <div className="flex flex-wrap gap-2">
          {regularityTimes.map((time) => (
            <button
              key={time}
              className="w-9 h-9 flex items-center justify-center rounded-full text-md"
              onClick={() =>
                setSettings((prev) => ({ ...prev, regularity: time }))
              }
            >
              <svg width="40" height="50" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L35 20L20 35L5 20L20 5Z"
                  fill={
                    settings.regularity === time || time == +settings.digitCount
                      ? "#3B82F6"
                      : "#E5E7EB"
                  }
                  stroke={
                    settings.regularity === time || time == +settings.digitCount
                      ? "#3B82F6"
                      : "#D1D5DB"
                  }
                  strokeWidth="2"
                />
                <text
                  x="20"
                  y="24"
                  fontSize="12"
                  fill={
                    settings.regularity === time || time == +settings.digitCount
                      ? "#FFFFFF"
                      : "#6B7280"
                  }
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {time}
                </text>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE slider */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-blue-600 mb-2">Muntazamlik</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevReg}
            className="text-blue-600 text-lg font-bold"
          >
            {<FiChevronLeft />}
          </button>
          {visibleRegularities.map((time) => (
            <button
              key={time}
              className="w-10 h-10 flex items-center justify-center rounded-full"
              onClick={() =>
                setSettings((prev) => ({ ...prev, regularity: time }))
              }
            >
              <svg width="40" height="50" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L35 20L20 35L5 20L20 5Z"
                  fill={settings.regularity === time ? "#3B82F6" : "#E5E7EB"}
                  stroke={settings.regularity === time ? "#3B82F6" : "#D1D5DB"}
                  strokeWidth="2"
                />
                <text
                  x="20"
                  y="24"
                  fontSize="12"
                  fill={settings.regularity === time ? "#FFFFFF" : "#6B7280"}
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {time}
                </text>
              </svg>
            </button>
          ))}
          <button
            onClick={handleNextReg}
            className="text-blue-600 text-lg font-bold"
          >
            {<FiChevronRight />}
          </button>
        </div>
      </div>

      {/* Tema */}
      <div className="mb-4 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">Tema</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-1 text-sm ${
              settings.operation === "add"
                ? "text-blue-600 font-semibold bg-white shadow-sm"
                : "text-gray-400 bg-gray-100"
            } rounded-full`}
            onClick={() =>
              setSettings((prev) => ({ ...prev, operation: "add" }))
            }
          >
            Qo'shish
          </button>
          <button
            className={`px-4 py-1 text-sm ${
              settings.operation === "subtract"
                ? "text-blue-600 font-semibold bg-white shadow-sm"
                : "text-gray-400 bg-gray-100"
            } rounded-full`}
            onClick={() =>
              setSettings((prev) => ({ ...prev, operation: "subtract" }))
            }
          >
            Ayirish
          </button>
          <button
            className={`px-4 py-1 text-sm ${
              settings.operation === "mixed"
                ? "text-blue-600 font-semibold bg-white shadow-sm"
                : "text-gray-400 bg-gray-100"
            } rounded-full`}
            onClick={() =>
              setSettings((prev) => ({ ...prev, operation: "mixed" }))
            }
          >
            Aralash
          </button>
        </div>
      </div>

      {/* Qatorlar soni */}

      {/* Ketma-ket misollar soni */}

      <div className="mb-6 hidden sm:flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">
          Ketma-ket misollar soni
        </h2>
        <div className="flex flex-wrap gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-xs`}
              onClick={() =>
                setSettings((prev) => ({ ...prev, sequenceLength: num }))
              }
            >
              <svg width="40" height="50" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L35 20L20 35L5 20L20 5Z"
                  fill={settings.sequenceLength == num ? "#3B82F6" : "#E5E7EB"}
                  stroke={
                    settings.sequenceLength == num ? "#3B82F6" : "#D1D5DB"
                  }
                  strokeWidth="2"
                />
                <text
                  x="20"
                  y="24"
                  fontSize="12"
                  fill={settings.sequenceLength == num ? "#FFFFFF" : "#6B7280"}
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {num}
                </text>
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between md:hidden">
        <h2 className="text-base font-bold text-blue-600 mb-2">
          Ketma-ket misollar soni
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="text-blue-600 text-lg font-bold"
          >
            {<FiChevronLeft />}
          </button>

          {visibleNumbers.map((num) => (
            <button
              key={num}
              className="w-10 h-10 flex items-center justify-center rounded-full"
              onClick={() =>
                setSettings((prev) => ({ ...prev, sequenceLength: num }))
              }
            >
              <svg width="40" height="50" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L35 20L20 35L5 20L20 5Z"
                  fill={settings.sequenceLength === num ? "#3B82F6" : "#E5E7EB"}
                  stroke={
                    settings.sequenceLength === num ? "#3B82F6" : "#D1D5DB"
                  }
                  strokeWidth="2"
                />
                <text
                  x="20"
                  y="24"
                  fontSize="12"
                  fill={settings.sequenceLength === num ? "#FFFFFF" : "#6B7280"}
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {num}
                </text>
              </svg>
            </button>
          ))}

          <button
            onClick={handleNext}
            className="text-blue-600 text-lg font-bold"
          >
            {<FiChevronRight />}
          </button>
        </div>
      </div>

      {/* Start button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-10 py-2 bg-blue-600 text-white text-base font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          Boshlash
        </button>
      </div>
    </div>
  );
}
