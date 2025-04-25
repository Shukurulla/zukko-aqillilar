import { useState, useEffect, useRef } from "react";
import { FiRefreshCw, FiX } from "react-icons/fi";

export default function FlashAnzanComponent({ settings, onEnd }) {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState("playing"); // 'playing', 'input', 'result'
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const timerRef = useRef(null);

  // Generate a random number (0-9) for each column
  const generateNumber = () => {
    return Math.floor(Math.random() * 10); // 0-9 range
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
    setUserAnswer("");
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
          setGameState("input"); // Change to input state instead of result
        }
      }, 200); // Short pause

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

  const handleAnswerSubmit = () => {
    setShowAnswer(true);
    setGameState("result");
  };

  // Soroban column component with fixed positions and ALWAYS visible beads
  const SorobanColumn = ({ value }) => {
    // Calculate which beads are active
    const topBeadActive = value >= 5;
    const activeBottomBeads = value % 5; // 0-4 beads can be active

    return (
      <div className="relative w-32 h-72 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-amber-50">
        {/* Center beam */}
        <div className="absolute w-full h-2 bg-gray-600 top-1/3 transform -translate-y-1/2" />

        {/* Rod */}
        <div className="absolute w-1 h-full bg-gray-400" />

        {/* Top bead (5's place) - ALWAYS visible */}
        <div
          className="absolute w-14 h-7 rounded-full bg-blue-600 transition-transform duration-300"
          style={{
            top: "7%",
            transform: topBeadActive ? "translateY(80%)" : "translateY(10%)",
          }}
        />

        {/* Bottom beads (1's place) - ALL ALWAYS visible */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-14 h-7 rounded-full bg-blue-600 transition-transform duration-300"
            style={{
              top: `${46 + i * 13}%`, // Fixed positions for all 4 beads
              transform:
                i < activeBottomBeads ? "translateY(-100%)" : "translateY(10%)",
            }}
          />
        ))}
      </div>
    );
  };

  // Empty Soroban for pause between numbers
  const EmptySoroban = () => {
    return (
      <div className="relative w-32 h-80 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-amber-50">
        {/* Center beam */}
        <div className="absolute w-full h-2 bg-gray-600 top-1/3 transform -translate-y-1/2" />

        {/* Rod */}
        <div className="absolute w-1 h-full bg-gray-400" />

        {/* Top bead (5's place) - Default position */}
        <div
          className="absolute w-14 h-7 rounded-full bg-red-600"
          style={{
            top: "16%",
          }}
        />

        {/* Bottom beads (1's place) - Default positions */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-14 h-7 rounded-full bg-red-600"
            style={{
              top: `${45 + i * 12}%`, // Fixed positions for all 4 beads
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white h-screen w-full p-5 flex flex-col items-center justify-start">
      {/* Title and buttons */}
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

      {/* Soroban display area - ONLY show during playing state */}
      <div className="text-center">
        {gameState === "playing" && (
          <div className="py-6">
            {currentNumber !== null ? (
              <SorobanColumn value={currentNumber} />
            ) : (
              <div>{/* <EmptySoroban /> */}</div>
            )}
          </div>
        )}

        {/* Input state - after numbers are shown but before showing result */}
        {gameState === "input" && (
          <div className="space-y-6 mt-4">
            <div className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Javobingizni kiriting"
                className="px-4 py-2 border-2 border-gray-300 rounded-full text-center text-lg focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <button
                onClick={handleAnswerSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Javobni tekshirish
              </button>
            </div>
          </div>
        )}

        {/* Result state - after submitting answer */}
        {gameState === "result" && (
          <div className="space-y-6 mt-4">
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
