// src/pages/FlashAnzan.jsx
import { useState, useEffect, useRef } from "react";
import { FiRefreshCw, FiX, FiCheck, FiChevronRight } from "react-icons/fi";

export default function FlashAnzanComponent({ settings, onEnd }) {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [currentOperation, setCurrentOperation] = useState("+");
  const [sequence, setSequence] = useState([]);
  const [operations, setOperations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const timerRef = useRef(null);

  // PDF ga asoslangan oddiy usulda qo'shish va ayirish qoidalari
  const getSimpleMethodNumbers = () => {
    const method = settings.method || "simple";
    const operation = settings.operation;

    if (method === "simple") {
      // Oddiy usulda faqat 1-4 gacha sonlar ishlatiladi
      if (operation === "add") {
        // Qo'shishda: 1+1, 1+2, 1+3, 2+1, 2+2, 3+1 mumkin
        const validPairs = [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ];
        const randomPair =
          validPairs[Math.floor(Math.random() * validPairs.length)];
        return randomPair[Math.floor(Math.random() * 2)]; // Juftlikdan birini qaytarish
      } else if (operation === "subtract") {
        // Ayirishda: 4-1, 4-2, 4-3, 4-4, 3-1, 3-2, 3-3, 2-1, 2-2, 1-1
        return Math.floor(Math.random() * 4) + 1;
      }
    } else if (method === "helper5") {
      // Yordamchi 5 donachasi usuli
      // 5 soni qo'shiladi: 1+5, 2+5, 3+5, 4+5
      if (operation === "add") {
        const base = Math.floor(Math.random() * 4) + 1;
        return Math.random() > 0.5 ? base : 5;
      }
    } else if (method === "helper10") {
      // Yordamchi 10 donachasi usuli
      if (operation === "add") {
        return Math.floor(Math.random() * 10) + 1;
      }
    }

    // Default: 1 xonali sonlar
    return Math.floor(Math.random() * 9) + 1;
  };

  // Generate a number based on method and rules
  const generateNumber = () => {
    const digits = parseInt(settings.digitCount);

    // Oddiy usul uchun maxsus qoidalar
    if (settings.method === "simple") {
      return getSimpleMethodNumbers();
    }

    // Boshqa usullar uchun
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generate a random operation
  const getRandomOperation = () => {
    return Math.random() > 0.5 ? "+" : "-";
  };

  // Validate operation based on PDF rules
  const isValidOperation = (currentSum, nextNumber, operation) => {
    if (settings.method !== "simple") return true;

    if (operation === "+") {
      // Oddiy usulda qo'shishda natija 44 dan oshmasligi kerak
      return currentSum + nextNumber <= 44;
    } else {
      // Ayirishda manfiy bo'lmasligi kerak
      return currentSum >= nextNumber;
    }
  };

  // Generate a new sequence
  const generateSequence = () => {
    const length = parseInt(settings.sequenceLength);
    const newSequence = [];
    const newOperations = [];
    let runningTotal = 0;

    for (let i = 0; i < length; i++) {
      let number = generateNumber();
      let operation = "+";

      if (i === 0) {
        // Birinchi son har doim musbat
        newSequence.push(number);
        newOperations.push("+");
        runningTotal = number;
      } else {
        // Keyingi sonlar uchun amal tanlash
        if (settings.operation === "mixed") {
          operation = getRandomOperation();
        } else if (settings.operation === "subtract") {
          operation = "-";
        } else {
          operation = "+";
        }

        // Oddiy usulda tekshirish
        if (settings.method === "simple") {
          // Natija 44 dan oshmasligi va manfiy bo'lmasligi kerak
          let attempts = 0;
          while (attempts < 10) {
            number = generateNumber();
            if (operation === "+" && runningTotal + number <= 44) {
              break;
            } else if (operation === "-" && runningTotal >= number) {
              break;
            }
            attempts++;
            // Agar mos son topilmasa, amalni o'zgartirish
            if (attempts >= 10) {
              operation = operation === "+" ? "-" : "+";
              attempts = 0;
            }
          }
        }

        newSequence.push(number);
        newOperations.push(operation);

        if (operation === "+") {
          runningTotal += number;
        } else {
          runningTotal -= number;
        }
      }
    }

    setSequence(newSequence);
    setOperations(newOperations);
    setCurrentIndex(0);
    setGameState("playing");
    setShowAnswer(false);
    setCorrectAnswer(runningTotal);
  };

  // Display numbers one by one
  useEffect(() => {
    if (gameState !== "playing" || currentIndex >= sequence.length) return;

    setCurrentNumber(sequence[currentIndex]);
    setCurrentOperation(operations[currentIndex]);

    timerRef.current = setTimeout(() => {
      setCurrentNumber(null);
      setCurrentOperation("");

      const nextTimer = setTimeout(() => {
        if (currentIndex + 1 < sequence.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setGameState(
            settings.gameMode === "audience" ? "showButton" : "input"
          );
        }
      }, 200);

      return () => clearTimeout(nextTimer);
    }, parseFloat(settings.regularity) * 1000);

    return () => clearTimeout(timerRef.current);
  }, [
    sequence,
    operations,
    currentIndex,
    gameState,
    settings.regularity,
    settings.gameMode,
  ]);

  // Start a new sequence when component mounts
  useEffect(() => {
    generateSequence();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGameState("result");
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setGameState("result");
  };

  const nextSequence = () => {
    setUserAnswer("");
    generateSequence();
  };

  // Method indicator
  const getMethodName = () => {
    switch (settings.method) {
      case "simple":
        return "Oddiy usul (1-4)";
      case "helper5":
        return "Yordamchi 5 usuli";
      case "helper10":
        return "Yordamchi 10 usuli";
      case "mixed":
        return "Aralash usul";
      default:
        return "Standart";
    }
  };

  return (
    <div className="bg-white h-screen w-[100%] p-5 flex flex-col items-center justify-start">
      {/* Sarlavha va tugmalar */}
      <div className="w-[100%] pb-5 flex justify-between items-center mb-8 px-4">
        <button
          onClick={onEnd}
          className="w-16 h-16 text-[30px] bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FiX />
        </button>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Flash <span className="text-blue-600">Anzan</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">{getMethodName()}</p>
        </div>
        <button
          onClick={nextSequence}
          className="w-16 h-16  text-[30px] bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* Raqamlar va input oynasi */}
      <div className="text-center">
        {gameState === "playing" && currentNumber && (
          <div className="text-9xl font-bold text-blue-600 py-16">
            {currentOperation}
            {currentNumber}
          </div>
        )}
        {gameState === "playing" && !currentNumber && (
          <div className="text-9xl font-bold text-blue-600 py-16 opacity-0">
            +0
          </div>
        )}

        {gameState === "input" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-72 p-3 border rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
            />
            <button
              type="submit"
              className="w-48 p-3 border rounded-lg mx-3 text-white text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-600 "
            >
              Tasdiqlash
            </button>
          </form>
        )}

        {gameState === "showButton" && (
          <div className="space-y-6">
            <button
              onClick={handleShowAnswer}
              className="w-48 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Natijani ko'rish
            </button>
          </div>
        )}

        {gameState === "result" && (
          <div className="space-y-6">
            <div className="text-xl text-gray-800">
              {settings.gameMode === "single" && (
                <>
                  Sizning javobingiz: {userAnswer}
                  <br />
                </>
              )}
              To'g'ri javob: {correctAnswer}
            </div>

            {/* Hisoblash jarayonini ko'rsatish */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Hisoblash jarayoni:</p>
              <p className="text-lg font-mono">
                {sequence.map((num, idx) => (
                  <span key={idx}>
                    {idx > 0 && ` ${operations[idx]} `}
                    {idx === 0 && ""}
                    {num}
                  </span>
                ))}{" "}
                = {correctAnswer}
              </p>
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
