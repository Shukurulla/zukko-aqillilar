import { useState, useEffect, useRef } from "react";
import { FiRefreshCw, FiX, FiCheck, FiChevronRight } from "react-icons/fi";
import { rectangle } from "../assets";

export default function FlashAnzanComponent({ settings, onEnd }) {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [displayedSegments, setDisplayedSegments] = useState(Array(7).fill(1));
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Segmentlarni generatsiya qilish (tepadan 1 ta, pastdan 1 ta o'chirilgan)
  const generateSegments = () => {
    const segments = Array(7).fill(1);

    // Tepadagi 2 ta segmentdan 1 tasini o'chiramiz
    const topSegmentToHide = Math.floor(Math.random() * 2); // 0 yoki 1
    segments[topSegmentToHide] = 0;

    // Pastdagi 5 ta segmentdan 1 tasini o'chiramiz
    const bottomSegmentToHide = 2 + Math.floor(Math.random() * 5); // 2-6
    segments[bottomSegmentToHide] = 0;

    return segments;
  };

  const generateNumber = () => Math.floor(Math.random() * 10);

  const generateSequence = () => {
    const length = parseInt(settings.sequenceLength);
    const newSequence = Array(length).fill().map(generateNumber);

    setSequence(newSequence);
    setCurrentIndex(0);
    setGameState("playing");
    setShowAnswer(false);
    setUserAnswer("");
    setCorrectAnswer(newSequence.reduce((sum, num) => sum + num, 0));
  };

  useEffect(() => {
    if (gameState !== "playing" || currentIndex >= sequence.length) return;

    const currentNum = sequence[currentIndex];
    setCurrentNumber(currentNum);
    setDisplayedSegments(generateSegments());

    timerRef.current = setTimeout(() => {
      setCurrentNumber(null);
      setDisplayedSegments(Array(7).fill(0));

      setTimeout(() => {
        if (currentIndex + 1 < sequence.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setGameState("input");
          if (settings.mode === "single") {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }
      }, 200);
    }, parseFloat(settings.regularity) * 1000);

    return () => clearTimeout(timerRef.current);
  }, [sequence, currentIndex, gameState, settings]);

  useEffect(() => {
    generateSequence();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleAnswerSubmit = () => {
    setShowAnswer(true);
    setGameState("result");
  };

  const showResult = () => {
    setShowAnswer(true);
    setGameState("result");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAnswerSubmit();
  };

  const isAnswerCorrect = parseInt(userAnswer) === correctAnswer;

  return (
    <div className="bg-white h-screen w-full lg:w-[80%] p-5 flex flex-col items-center justify-start">
      {/* Sarlavha va tugmalar */}
      <div className="w-full flex justify-between items-center mb-8 px-4">
        <button
          onClick={onEnd}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FiX size={20} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Flash Anzan</h1>
          <p className="text-sm text-gray-500">
            {settings.mode === "auditorium"
              ? "Auditorium rejimi"
              : "Yakka o'yinchi"}
          </p>
        </div>
        <button
          onClick={generateSequence}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FiRefreshCw size={20} />
        </button>
      </div>

      {/* Soroban displey */}
      {gameState === "playing" && (
        <div className="text-center mb-8">
          <div className="w-[150px] relative h-[450px] py-2 border-[7px] rounded-2xl border-[#666680]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[7px] bg-[#666680] h-full"></div>
            <div className="absolute top-[132px] left-1/2 transform -translate-x-1/2 w-full h-[7px] bg-[#666680]"></div>

            {displayedSegments.map((visible, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  index === 1 ? "mb-4" : ""
                } flex relative z-20 items-center justify-center ${
                  index < 2 ? "mt-2" : ""
                }`}
                style={{ opacity: visible ? 1 : 0 }}
              >
                <img src={rectangle} className="h-[50px]" alt="segment" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* O'yin boshqaruvi */}
      {gameState === "input" && (
        <div className="mt-6 w-full max-w-md px-4">
          {settings.mode === "auditorium" ? (
            <button
              onClick={showResult}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
            >
              Natijani ko'rish <FiChevronRight className="ml-2" />
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                placeholder="Javobingizni kiriting"
                autoFocus
              />
              <button
                onClick={handleAnswerSubmit}
                disabled={userAnswer == "" || isNaN(userAnswer)}
                className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
              >
                Tasdiqlash <FiCheck className="ml-2" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Natijalar */}
      {gameState === "result" && showAnswer && (
        <div className="mt-6 w-full max-w-md px-4">
          <div
            className={`p-6 rounded-lg bg-gray-200 shadow-md ${
              settings.mode == "auditorium" && isAnswerCorrect
                ? "bg-gray-400"
                : "bg"
            }`}
          >
            {settings.mode === "single" && (
              <h3 className="text-xl font-bold mb-4 text-center">
                {isAnswerCorrect ? "✅ To'g'ri!" : "❌ Noto'g'ri"}
              </h3>
            )}

            {settings.mode === "single" && (
              <div className="text-center mb-4">
                <p className="text-lg">Sizning javobingiz: {userAnswer}</p>
                <p className="text-2xl font-bold mt-2">
                  Tog'ri javob: {correctAnswer}
                </p>
              </div>
            )}

            {settings.mode === "auditorium" && (
              <p className="text-center text-xl font-[500] text-gray-700">
                To'g'ri javob: {correctAnswer}
              </p>
            )}

            <button
              onClick={generateSequence}
              className="mt-6 w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Keyingi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
