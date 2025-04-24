// FlashAnzan.js
import { useState, useEffect, useRef } from "react";

export default function FlashAnzanComponent({ settings, onEnd }) {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState("playing"); // 'playing', 'input', 'result'
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const timerRef = useRef(null);

  // Generate a random number based on digit count
  const generateNumber = () => {
    const digits = parseInt(settings.digitCount);
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
          setGameState("input");
        }
      }, 200); // Brief pause between numbers

      return () => clearTimeout(nextTimer);
    }, parseFloat(settings.regularity) * 1000);

    return () => clearTimeout(timerRef.current);
  }, [sequence, currentIndex, gameState, settings.regularity]);

  // Start a new sequence when component mounts
  useEffect(() => {
    generateSequence();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    setGameState("result");
  };

  const nextSequence = () => {
    setUserAnswer("");
    generateSequence();
  };

  return (
    <div className="bg-white h-screen w-[100%] p-5 flex flex-col items-center justify-start">
      {/* Sarlavha va tugmalar */}
      <div className="w-[100%] pb-5 flex  justify-between items-center mb-8 px-4">
        <button
          onClick={onEnd}
          className="w-20 h-20 text-[30px] bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          ✕
        </button>
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Flash <span className="text-blue-600 ">Anzan</span>
        </h1>
        <button
          onClick={nextSequence}
          className="w-20 h-20 text-[30px] bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          ⟳
        </button>
      </div>

      {/* Raqamlar va input oynasi */}
      <div className="text-center">
        {gameState === "playing" && currentNumber && (
          <div className="text-7xl font-bold text-blue-600 py-16">
            +{currentNumber}
          </div>
        )}
        {gameState === "playing" && !currentNumber && (
          <div className="text-7xl font-bold text-blue-600 py-16 opacity-0">
            +0
          </div>
        )}

        {gameState === "input" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-48 p-3 border rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
            />
            <button
              type="submit"
              className="w-48 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Tasdiqlash
            </button>
          </form>
        )}

        {gameState === "result" && (
          <div className="space-y-6">
            <div className="text-xl text-gray-800">
              Sizning javobingiz: {userAnswer}
              <br />
              To'g'ri javob: {correctAnswer}
            </div>
            <button
              onClick={nextSequence}
              className="w-48 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Keyingi misol
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
