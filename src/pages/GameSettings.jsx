import { useState } from "react";

export default function GameSettings({ onStart, initialSettings }) {
  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(settings);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Flash <span className="text-blue-600">Anzan</span>
      </h1>

      {/* O'yin rejimi */}
      <div className="mb-4 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">O'yin rejimi</h2>
        <div className="flex gap-2">
          <button className="px-4 py-1 text-sm text-blue-600 font-semibold bg-white rounded-full shadow-sm">
            Bir odamlik
          </button>
          <button className="px-4 py-1 text-sm text-gray-400 font-semibold bg-gray-100 rounded-full">
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
      <div className="mb-4 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">Muntazamlik</h2>
        <div className="flex flex-wrap gap-1">
          {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.5].map(
            (time) => (
              <button
                key={time}
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                  settings.regularity == time
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() =>
                  setSettings((prev) => ({ ...prev, regularity: time }))
                }
              >
                {time}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tema */}
      <div className="mb-4 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">Tema</h2>
        <div className="relative w-48">
          <button className="w-full px-4 py-1 bg-white text-left text-sm text-gray-800 rounded-full shadow-sm flex justify-between items-center">
            To'g'ridan-to'g'ri qo'shish
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Qatorlar soni */}
      <div className="mb-4 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">Qatorlar soni</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-1 text-sm ${
              settings.rowCount == 2
                ? "text-blue-600 font-semibold bg-white shadow-sm"
                : "text-gray-400 bg-gray-100"
            } rounded-full`}
            onClick={() => setSettings((prev) => ({ ...prev, rowCount: 2 }))}
          >
            2
          </button>
          <button
            className={`px-4 py-1 text-sm ${
              settings.rowCount == 3
                ? "text-blue-600 font-semibold bg-white shadow-sm"
                : "text-gray-400 bg-gray-100"
            } rounded-full`}
            onClick={() => setSettings((prev) => ({ ...prev, rowCount: 3 }))}
          >
            3
          </button>
        </div>
      </div>

      {/* Ketma-ket misollar soni */}
      <div className="mb-6 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">
          Ketma-ket misollar soni
        </h2>
        <div className="flex flex-wrap gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                settings.sequenceLength == num
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-600"
              }`}
              onClick={() =>
                setSettings((prev) => ({ ...prev, sequenceLength: num }))
              }
            >
              {num}
            </button>
          ))}
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
