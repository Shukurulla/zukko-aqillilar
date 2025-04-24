import { useState, useEffect, useRef } from "react";
import { FiRefreshCw, FiX } from "react-icons/fi";

export default function FlashAnzanComponent({ settings, onEnd }) {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState("playing"); // 'playing', 'result'
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState(""); // Foydalanuvchi javobi
  const [showAnswer, setShowAnswer] = useState(false); // Javobni ko‘rsatish holati
  const timerRef = useRef(null);

  // Generate a random number (0-9) for each column
  const generateNumber = () => {
    return Math.floor(Math.random() * 10); // 0-9 oralig‘ida tasodifiy son
  };

  // Generate a new sequence of numbers
  const generateSequence = () => {
    const length = parseInt(settings.sequenceLength);
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(generateNumber());
    }
    setSequence(newSequence);
    setCurrentIndex(0);
    setGameState("playing");
    setShowAnswer(false);
    setUserAnswer(""); // Foydalanuvchi javobini tozalash
    setCorrectAnswer(newSequence.reduce((sum, num) => sum + num, 0));
  };

  // Display numbers one by one
  useEffect(() => {
    if (gameState !== "playing" || currentIndex >= sequence.length) return;

    setCurrentNumber(sequence[currentIndex]);

    timerRef.current = setTimeout(() => {
      setCurrentNumber(null);

      const nextTimer = setTimeout(() => {
        if (currentIndex + 1 < sequence.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setGameState("result");
        }
      }, 200); // Qisqa pauza

      return () => clearTimeout(nextTimer);
    }, parseFloat(settings.regularity) * 1000);

    return () => clearTimeout(timerRef.current);
  }, [sequence, currentIndex, gameState, settings.regularity]);

  // Start a new sequence when component mounts
  useEffect(() => {
    generateSequence();
    return () => clearTimeout(timerRef.current);
  }, []);

  const nextSequence = () => {
    generateSequence();
  };

  // Soroban ustunini chizish uchun komponent
  const SorobanColumn = ({ value }) => {
    const fiveBeadActive = value >= 5; // Yuqoridagi bitta boncuk faolligi
    const oneBeadsActive = value % 5; // Pastdagi boncuklar soni (0-4)

    return (
      <div className="relative w-32 h-80 border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center">
        {/* Markazdagi chiziq */}
        <div className="absolute w-full h-1 bg-gray-400 top-1/3 transform -translate-y-1/2" />

        {/* Yuqoridagi bitta boncuk (5) */}
        <div
          className={`absolute w-12 h-6 bg-blue-600 rounded transition-transform duration-300 ${
            fiveBeadActive ? "top-36" : "top-8"
          }`}
        ></div>

        {/* Pastdagi 4 ta boncuk (1, 2, 3, 4) */}
        {Array.from({ length: 4 }, (_, index) => {
          const active = index < oneBeadsActive;
          const baseTop = 120 + index * 48; // Boncuklar orasida masofa
          const top = active ? 48 + index * 24 : baseTop;

          return (
            <div
              key={index}
              className={`absolute w-12 h-6 bg-blue-600 rounded transition-transform duration-300`}
              style={{ top: `${top}px` }}
            ></div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white h-screen w-full p-5 flex flex-col items-center justify-start">
      {/* Sarlavha va tugmalar */}
      <div className="w-full text-[30px] flex justify-between items-center mb-8 px-4">
        <button
          onClick={onEnd}
          className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FiX />
        </button>
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Flash Anzan Kartalar
        </h1>
        <button
          onClick={nextSequence}
          className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* Soroban ustuni va natija oynasi */}
      <div className="text-center">
        {gameState === "playing" && currentNumber !== null && (
          <div className="py-6">
            <SorobanColumn value={currentNumber} />
          </div>
        )}
        {gameState === "playing" && currentNumber === null && (
          <div className="py-6 opacity-0">
            <SorobanColumn value={0} />
          </div>
        )}

        {gameState === "result" && settings.mode === "auditorium" && (
          <div className="space-y-6">
            {!showAnswer ? (
              <div className="space-y-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Javobingizni kiriting"
                  className="px-4 py-2 border-2 border-gray-300 rounded-full text-center text-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  Javobni ko‘rish
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xl text-gray-800">
                  Sizning javobingiz: {userAnswer || "Kiritilmadi"}
                </div>
                <div className="text-xl text-gray-800">
                  To'g'ri javob: {correctAnswer}
                </div>
                <div
                  className={`text-lg font-semibold ${
                    parseInt(userAnswer) === correctAnswer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parseInt(userAnswer) === correctAnswer
                    ? "To'g'ri!"
                    : "Noto'g'ri!"}
                </div>
              </div>
            )}
            <button
              onClick={nextSequence}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Keyingi misol
            </button>
          </div>
        )}

        {gameState === "result" && settings.mode === "single" && (
          <div className="space-y-6">
            <button
              onClick={nextSequence}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Keyingi misol
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
