import { useState } from "react";

export default function FlashAnzanCard({ onStart, initialSettings }) {
  const [settings, setSettings] = useState({
    mode: "single",
    digitCount: 1,
    regularity: 1.0,
    displayCount: 1,
    sequenceLength: 1,
    theme: "cards", // Kartalar rejimi
    ...initialSettings,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(settings); // O'yin boshlash uchun App.js ga sozlamalarni yuboradi
  };

  // Olmos shaklidagi tugma uchun SVG
  const DiamondButton = ({ value, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`w-[60px] h-[60px] flex items-center justify-center transition ${
        isSelected ? "text-blue-600" : "text-gray-400"
      }`}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 5L35 20L20 35L5 20L20 5Z"
          fill={isSelected ? "#3B82F6" : "#E5E7EB"}
          stroke={isSelected ? "#3B82F6" : "#D1D5DB"}
          strokeWidth="2"
        />
        <text
          x="20"
          y="24"
          fontSize="14"
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
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
      >
        -
      </button>
      <DiamondButton value={value} isSelected={true} />
      <button
        onClick={onIncrement}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        disabled={value >= 10}
      >
        +
      </button>
    </div>
  );

  return (
    <div className="bg-white h-screen w-[60%] mx-auto flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Flash Anzan Kartalar
      </h1>

      {/* O'yin rejimi */}
      <div className="mb-8 flex items-center justify-between w-full">
        <h2 className="text-lg font-bold text-blue-600">O'yin rejimi</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-full font-semibold ${
              settings.mode === "single"
                ? "bg-blue-600 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setSettings((prev) => ({ ...prev, mode: "single" }))}
          >
            Bir odamlik
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold ${
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
      <div className="mb-8 flex items-center justify-between w-full">
        <h2 className="text-lg font-bold text-blue-600">Raqamlar soni</h2>
        <div className="flex gap-4">
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
      <div className="mb-8 flex items-center justify-between w-full">
        <h2 className="text-lg font-bold text-blue-600">Muntazamlik</h2>
        <div className="flex flex-wrap gap-2">
          {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.5].map(
            (time) => (
              <DiamondButton
                key={time}
                value={time}
                isSelected={settings.regularity === time}
                onClick={() =>
                  setSettings((prev) => ({ ...prev, regularity: time }))
                }
              />
            )
          )}
        </div>
      </div>

      {/* Ko'rsatish soni */}

      {/* Ketma-ket kartalar soni */}
      <div className="mb-8 flex items-center justify-between w-full">
        <h2 className="text-lg font-bold text-blue-600">
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
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          Boshlash
        </button>
      </div>
    </div>
  );
}
