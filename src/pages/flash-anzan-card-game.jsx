import { useState, useEffect, useRef } from "react";
import { FiRefreshCw, FiX, FiCheck, FiChevronRight } from "react-icons/fi";
import useGlobalFlashCardsPreloader from "../hooks/useGlobalFlashCardsPreloader";

export default function FlashAnzanComponent({ settings, onEnd }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Global flash cards preloader hook
  const { isLoaded, getRandomCardImage } = useGlobalFlashCardsPreloader();

  const generateSequence = () => {
    if (!isLoaded) {
      console.warn("Flash cards hali cache-da mavjud emas");
      return;
    }

    const length = parseInt(settings.sequenceLength);
    const newSequence = [];

    for (let i = 0; i < length; i++) {
      const cardData = getRandomCardImage();
      if (cardData) {
        newSequence.push(cardData);
      }
    }

    setSequence(newSequence);
    setCurrentIndex(0);
    setGameState("playing");
    setShowAnswer(false);
    setUserAnswer("");

    // Javobni hisoblash (barcha sonlarni qo'shish)
    const totalSum = newSequence.reduce((sum, card) => sum + card.number, 0);
    setCorrectAnswer(totalSum);

    console.log(
      "Yangi ketma-ketlik:",
      newSequence.map((c) => c.number),
      "Yig'indi:",
      totalSum
    );
  };

  useEffect(() => {
    if (gameState !== "playing" || currentIndex >= sequence.length) return;

    const currentCardData = sequence[currentIndex];
    setCurrentCard(currentCardData);

    timerRef.current = setTimeout(() => {
      setCurrentCard(null);

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
    if (isLoaded) {
      generateSequence();
    }
    return () => clearTimeout(timerRef.current);
  }, [isLoaded]);

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

  // Agar rasmlar cache-da mavjud bo'lmasa
  if (!isLoaded) {
    return (
      <div className="bg-white h-screen w-full lg:w-[80%] p-5 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="text-gray-600 mb-2">
            Flash kartalar cache-dan yuklanmoqda...
          </p>
          <p className="text-sm text-gray-500">
            Bu jarayon bir marta amalga oshiriladi
          </p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-800">Flash Kartalar</h1>
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

      {/* Flash Card Display */}
      {gameState === "playing" && (
        <div className="text-center mb-8">
          {currentCard ? (
            <div className="flex flex-col items-center">
              <img
                src={currentCard.imagePath}
                alt={`Flash card ${currentCard.number}`}
                className="w-96 h-96 object-contain border-2 border-gray-200 rounded-lg"
              />
              {/* Debug info - ishlab chiqishda yoqish mumkin */}
              {/* <p className="text-xs text-gray-400 mt-2">
                Karta #{currentIndex + 1} - Son: {currentCard.number}
              </p> */}
            </div>
          ) : (
            <div className=""></div>
          )}

          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex justify-center gap-1">
              {sequence.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index < currentIndex
                      ? "bg-green-500"
                      : index === currentIndex
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {currentIndex + 1} / {sequence.length}
            </p>
          </div>
        </div>
      )}

      {/* O'yin boshqaruvi */}
      {gameState === "input" && (
        <div className="mt-6 w-full max-w-md px-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Barcha ko'rilgan sonlar yig'indisini hisoblang
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {sequence.length} ta karta ko'rsatildi
            </p>
          </div>

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
                disabled={userAnswer === "" || isNaN(userAnswer)}
                className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
            className={`p-6 rounded-lg shadow-md ${
              settings.mode === "single"
                ? isAnswerCorrect
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
                : "bg-gray-100"
            }`}
          >
            {settings.mode === "single" && (
              <h3
                className={`text-xl font-bold mb-4 text-center ${
                  isAnswerCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAnswerCorrect ? "✅ To'g'ri!" : "❌ Noto'g'ri"}
              </h3>
            )}

            {/* Ko'rsatilgan kartalar */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Ko'rsatilgan kartalar:
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {sequence.map((card, index) => (
                  <div
                    key={index}
                    className="text-sm bg-white px-2 py-1 rounded border"
                  >
                    {card.number}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                {sequence.map((c) => c.number).join(" + ")} = {correctAnswer}
              </p>
            </div>

            {settings.mode === "single" && (
              <div className="text-center mb-4">
                <p className="text-lg">
                  Sizning javobingiz:{" "}
                  <span className="font-bold">{userAnswer}</span>
                </p>
                <p className="text-2xl font-bold mt-2">
                  To'g'ri javob:{" "}
                  <span className="text-blue-600">{correctAnswer}</span>
                </p>
              </div>
            )}

            {settings.mode === "auditorium" && (
              <p className="text-center text-xl font-medium text-gray-700">
                To'g'ri javob:{" "}
                <span className="font-bold text-blue-600">{correctAnswer}</span>
              </p>
            )}

            <button
              onClick={generateSequence}
              className="mt-6 w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <FiRefreshCw size={16} />
              Keyingi o'yin
            </button>
          </div>
        </div>
      )}

      {/* Cache status indicator (chap pastki burchakda) */}
      <div className="fixed bottom-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
        ⚡ Cache active
      </div>
    </div>
  );
}
