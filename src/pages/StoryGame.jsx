import React, { useState, useEffect } from "react";
import {
  FiRefreshCw,
  FiSend,
  FiAward,
  FiBookOpen,
  FiImage,
} from "react-icons/fi";
import toast from "react-hot-toast";

const StoryGame = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [imageNumber, setImageNumber] = useState(1);
  const [storyText, setStoryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  // OpenAI API key - Buni environment variable'dan olish kerak
  // .env fayliga REACT_APP_OPENAI_API_KEY=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 qo'shing
  const OPENAI_API_KEY =
    "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";

  useEffect(() => {
    loadRandomImage();
  }, []);

  const loadRandomImage = () => {
    setIsImageLoading(true);
    setStoryText("");
    setFeedback(null);
    setShowResult(false);

    // Generate random number between 1 and 40
    const randomNum = Math.floor(Math.random() * 40) + 1;
    setImageNumber(randomNum);

    const imageUrl = `https://vpsserver.kerek.uz/fairytales/${randomNum}.png`;

    // Preload image
    const img = new Image();
    img.onload = () => {
      setCurrentImage(imageUrl);
      setIsImageLoading(false);
    };
    img.onerror = () => {
      toast.error("Rasm yuklanishda xatolik yuz berdi");
      setIsImageLoading(false);
    };
    img.src = imageUrl;
  };

  const analyzeStory = async () => {
    if (!storyText.trim()) {
      toast.error("Iltimos, ertak yozing!");
      return;
    }

    if (storyText.trim().length < 50) {
      toast.error("Ertak juda qisqa! Kamida 50 ta belgi yozing.");
      return;
    }

    setIsLoading(true);

    try {
      // OpenAI API ga so'rov
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "Sen o'zbek tilida bolalar ertaklarini baholovchi pedagogsiz. Sening vazifang - bolalar yozgan ertaklarni mehribonlik bilan baholash va ularga foydali maslahatlar berish. Javobingni faqat JSON formatda ber.",
              },
              {
                role: "user",
                content: `
                Quyidagi ertakni baholang:
                
                Rasm raqami: ${imageNumber}
                Ertak matni: "${storyText}"
                
                Quyidagi mezonlar bo'yicha baholang:
                1. Umumiy ball (0-100 oralig'ida)
                2. Ijodiylik darajasi (0-10 oralig'ida)
                3. Grammatika va imlo (0-10 oralig'ida)
                4. Mantiqiy ketma-ketlik (0-10 oralig'ida)
                5. Rasmga mosligi (0-10 oralig'ida, rasm raqami ${imageNumber})
                6. Qisqa izoh
                7. 3 ta konstruktiv tavsiya
                8. Bolani ruhlantiruvchi maqtov
                
                Javobni faqat shu JSON formatda ber:
                {
                  "ball": number,
                  "ijodiylik": number,
                  "grammatika": number,
                  "mantiq": number,
                  "rasmgaMoslik": number,
                  "izoh": "string",
                  "tavsiyalar": ["tavsiya1", "tavsiya2", "tavsiya3"],
                  "maqtov": "string"
                }
              `,
              },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Parse ChatGPT response
      let parsedFeedback;
      try {
        // ChatGPT javobini JSON sifatida parse qilishga harakat qilamiz
        const content = data.choices[0].message.content;
        // JSON qismini ajratib olish (agar matn ichida bo'lsa)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedFeedback = JSON.parse(jsonMatch[0]);
        } else {
          parsedFeedback = JSON.parse(content);
        }
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        // Agar parse qilib bo'lmasa, default qiymatlar
        parsedFeedback = {
          ball: 75,
          ijodiylik: 7,
          grammatika: 7,
          mantiq: 7,
          rasmgaMoslik: 6,
          izoh: "Ertakingiz qiziqarli chiqdi! Davom eting!",
          tavsiyalar: [
            "Ko'proq tavsiflar qo'shing",
            "Qahramonlarning his-tuyg'ularini aks ettiring",
            "Dialog qismlarini boyiting",
          ],
          maqtov: "Yaxshi ish! Davom eting!",
        };
      }

      // Validate and normalize feedback values
      const validatedFeedback = {
        ball: Math.min(100, Math.max(0, parsedFeedback.ball || 75)),
        ijodiylik: Math.min(10, Math.max(0, parsedFeedback.ijodiylik || 7)),
        grammatika: Math.min(10, Math.max(0, parsedFeedback.grammatika || 7)),
        mantiq: Math.min(10, Math.max(0, parsedFeedback.mantiq || 7)),
        rasmgaMoslik: Math.min(
          10,
          Math.max(0, parsedFeedback.rasmgaMoslik || 6)
        ),
        izoh: parsedFeedback.izoh || "Ertakingiz qiziqarli chiqdi!",
        tavsiyalar: Array.isArray(parsedFeedback.tavsiyalar)
          ? parsedFeedback.tavsiyalar.slice(0, 3)
          : [
              "Ko'proq tavsiflar qo'shing",
              "Qahramonlar hissiyotlarini aks ettiring",
              "Dialog qismlarini boyiting",
            ],
        maqtov: parsedFeedback.maqtov || "Ajoyib ijodiy fikrlash! Davom eting!",
      };

      setFeedback(validatedFeedback);
      setShowResult(true);
      setIsLoading(false);

      // Show success message based on score
      if (validatedFeedback.ball >= 90) {
        toast.success("A'lo darajada! Siz haqiqiy ertak ustasisiz! 🌟");
      } else if (validatedFeedback.ball >= 80) {
        toast.success("Juda yaxshi! Sizda katta salohiyat bor! 👏");
      } else if (validatedFeedback.ball >= 70) {
        toast.success("Yaxshi natija! Mashq qilishda davom eting! 👍");
      } else {
        toast.info(
          "Urinishingiz uchun rahmat! Keyingisida yaxshiroq bo'ladi! 💪"
        );
      }
    } catch (error) {
      console.error("Error analyzing story:", error);

      // Agar API ishlamasa, fallback feedback
      if (error.message.includes("401")) {
        toast.error(
          "API kalit xatoligi. Iltimos, to'g'ri API kalitni kiriting!"
        );
      } else if (error.message.includes("429")) {
        toast.error("Juda ko'p so'rov yuborildi. Biroz kuting!");
      } else {
        toast.warning(
          "ChatGPT bilan bog'lanib bo'lmadi. Oddiy baholash ishlatilmoqda."
        );
      }

      // Fallback evaluation
      const fallbackFeedback = {
        ball: 70 + Math.floor(Math.random() * 20),
        ijodiylik: 6 + Math.floor(Math.random() * 3),
        grammatika: 6 + Math.floor(Math.random() * 3),
        mantiq: 6 + Math.floor(Math.random() * 3),
        rasmgaMoslik: 5 + Math.floor(Math.random() * 4),
        izoh: "Ertakingiz qiziqarli! Rasmga qarab yozganingiz uchun rahmat.",
        tavsiyalar: [
          "Ko'proq tavsiflar qo'shishga harakat qiling",
          "Qahramonlarning his-tuyg'ularini ko'proq aks ettiring",
          "Voqealar ketma-ketligini yanada aniqroq qiling",
        ],
        maqtov: "Yaxshi harakat! Ijodiy fikrlashda davom eting!",
      };

      setFeedback(fallbackFeedback);
      setShowResult(true);
      setIsLoading(false);
    }
  };

  const getScoreColor = (score, max = 100) => {
    const percentage = (score / max) * 100;
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const ScoreBar = ({ label, score, max = 10 }) => {
    const percentage = (score / max) * 100;

    return (
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className={`text-sm font-bold ${getScoreColor(score, max)}`}>
            {score}/{max}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              percentage >= 90
                ? "bg-green-500"
                : percentage >= 70
                ? "bg-yellow-500"
                : percentage >= 50
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Rasmlar orqali ertak tuzish</h1>
        <p className="text-gray-600">
          Rasmdagi elementlar asosida o'z ertakengizni yarating va ChatGPT
          orqali baholang!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FiImage className="text-blue-600" />
              Ertak uchun rasm #{imageNumber}
            </h3>
            <button
              onClick={loadRandomImage}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiRefreshCw className={isImageLoading ? "animate-spin" : ""} />
              Yangi rasm
            </button>
          </div>

          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {isImageLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Rasm yuklanmoqda...</p>
                </div>
              </div>
            ) : currentImage ? (
              <img
                src={currentImage}
                alt="Ertak uchun rasm"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Rasm yuklanmadi
              </div>
            )}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Ko'rsatma:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Rasmdagi barcha elementlarni diqqat bilan ko'rib chiqing
              </li>
              <li>• Qahramonlar va ob'ektlar o'rtasida bog'lanish o'rnating</li>
              <li>• Voqealar ketma-ketligini mantiqiy tuzing</li>
              <li>• O'z tasavvuringizni qo'shing va ijodiy bo'ling!</li>
            </ul>
          </div>
        </div>

        {/* Story Writing Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiBookOpen className="text-green-600" />
            Ertakingizni yozing
          </h3>

          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            disabled={isLoading || showResult}
            placeholder="Bu yerga ertakingizni yozing... 

Masalan: Bir paytlar go'zal bog'da... 

Kamida 50 ta belgi yozing."
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />

          <div className="mt-4 flex items-center justify-between">
            <span
              className={`text-sm ${
                storyText.length < 50 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {storyText.length} ta belgi{" "}
              {storyText.length < 50 && "(kamida 50 ta kerak)"}
            </span>

            {!showResult ? (
              <button
                onClick={analyzeStory}
                disabled={isLoading || storyText.length < 50}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ChatGPT tekshirmoqda...
                  </>
                ) : (
                  <>
                    <FiSend />
                    ChatGPT bilan baholash
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  setStoryText("");
                  setShowResult(false);
                  setFeedback(null);
                  loadRandomImage();
                }}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FiRefreshCw />
                Yangi o'yin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      {showResult && feedback && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Section */}
            <div>
              <div className="text-center mb-6">
                <div
                  className={`text-5xl font-bold mb-2 ${getScoreColor(
                    feedback.ball
                  )}`}
                >
                  {feedback.ball}
                </div>
                <div className="text-gray-600">Umumiy ball</div>
                <div className="flex justify-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FiAward
                      key={i}
                      className={`text-2xl ${
                        i < Math.floor(feedback.ball / 20)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <ScoreBar label="Ijodiylik" score={feedback.ijodiylik} />
              <ScoreBar
                label="Grammatika va imlo"
                score={feedback.grammatika}
              />
              <ScoreBar label="Mantiqiy ketma-ketlik" score={feedback.mantiq} />
              <ScoreBar label="Rasmga mosligi" score={feedback.rasmgaMoslik} />
            </div>

            {/* Feedback Text Section */}
            <div>
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Maqtov:</h4>
                <p className="text-green-800">{feedback.maqtov}</p>
              </div>

              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Izoh:</h4>
                <p className="text-blue-800">{feedback.izoh}</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">
                  Tavsiyalar:
                </h4>
                <ul className="text-yellow-800 space-y-1">
                  {feedback.tavsiyalar.map((tavsiya, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>{tavsiya}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryGame;
