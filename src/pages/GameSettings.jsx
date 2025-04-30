import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiChevronLeft } from "react-icons/fi";
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

  return (
    <div className="max-w-4xl w-3xl mx-auto p-4">
      <div className="absolute top-10 left-20">
        <div
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center text-white text-2xl rounded-full shadow-lg cursor-pointer bg-blue-600"
        >
          <FiChevronLeft />
        </div>
      </div>
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
      <div className="mb-4 flex items-center gap-4 justify-between">
        <h2 className="text-base font-bold text-blue-600">Muntazamlik</h2>
        <div className="flex flex-wrap gap-1">
          {[
            0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.5, 2, 2.5, 3,
          ].map((time) => (
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
          ))}
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
