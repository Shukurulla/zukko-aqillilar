import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(settings);
  };

  // Olmos shaklidagi tugma uchun SVG
  const DiamondButton = ({ value, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center transition ${
        isSelected ? "text-blue-600" : "text-gray-400"
      }`}
    >
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 5L35 20L20 35L5 20L20 5Z"
          fill={isSelected ? "#3B82F6" : "#E5E7EB"}
          stroke={isSelected ? "#3B82F6" : "#D1D5DB"}
          strokeWidth="2"
        />
        <text
          x="20"
          y="24"
          fontSize="12"
          fill={isSelected ? "#FFFFFF" : "#6B7280"}
          textAnchor="middle"
          fontWeight="bold"
        >
          {value}
        </text>
      </svg>
    </button>
  );

  // Increment/Decrement tugmalari uchun komponent
  const CounterButtons = ({ value, onIncrement, onDecrement }) => (
    <div className="flex items-center gap-1">
      <button
        onClick={onDecrement}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
      >
        -
      </button>
      <DiamondButton value={value} isSelected={true} />
      <button
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        disabled={value >= 10}
      >
        +
      </button>
    </div>
  );
  const navigate = useNavigate();

  return (
    <div className="bg-white h-screen w-[90%] mx-auto flex flex-col items-center justify-center p-4">
      <div className="absolute top-5 left-5">
        <div
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center text-white text-2xl rounded-full shadow-lg cursor-pointer bg-blue-600"
        >
          <FiChevronLeft />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Flash Anzan Kartalar
      </h1>

      {/* O'yin rejimi */}
      <div className="mb-4 flex items-center justify-between w-full">
        <h2 className="text-base font-bold text-blue-600">O'yin rejimi</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              settings.mode === "single"
                ? "bg-blue-600 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setSettings((prev) => ({ ...prev, mode: "single" }))}
          >
            Bir odamlik
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              settings.mode === "auditorium"
                ? "bg-blue-600 text-white"
                : "text-gray-400"
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
      <div className="mb-4 flex items-center justify-between w-full">
        <h2 className="text-base font-bold text-blue-600">Raqamlar soni</h2>
        <div className="flex gap-1">
          {[1, 2, 3].map((count) => (
            <DiamondButton
              key={count}
              value={count}
              isSelected={settings.digitCount === count}
              onClick={() =>
                setSettings((prev) => ({ ...prev, digitCount: count }))
              }
            />
          ))}
        </div>
      </div>

      {/* Muntazamlik */}
      <div className="mb-4 flex items-center justify-between w-full">
        <h2 className="text-base font-bold text-blue-600">Muntazamlik</h2>
        <div className="flex flex-wrap ">
          {[
            0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.5, 2, 2.5, 3,
          ].map((time) => (
            <DiamondButton
              key={time}
              value={time}
              isSelected={settings.regularity === time}
              onClick={() =>
                setSettings((prev) => ({ ...prev, regularity: time }))
              }
            />
          ))}
        </div>
      </div>

      {/* Ketma-ket kartalar soni */}
      <div className="mb-6 flex items-center justify-between w-full">
        <h2 className="text-base font-bold text-blue-600">
          Ketma-ket kartalar soni
        </h2>
        <CounterButtons
          value={settings.sequenceLength}
          onIncrement={() =>
            setSettings((prev) => ({
              ...prev,
              sequenceLength: prev.sequenceLength + 1,
            }))
          }
          onDecrement={() =>
            setSettings((prev) => ({
              ...prev,
              sequenceLength: Math.max(1, prev.sequenceLength - 1),
            }))
          }
        />
      </div>

      {/* Start button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white text-base font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          Boshlash
        </button>
      </div>
    </div>
  );
}
