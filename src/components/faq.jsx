import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Bilim danglammi qanday bilsam bo'ladı?",
      answer:
        "Har bir darsdan keyin interaktiv topshiriqlarni siz o'zingizcha tugatishingiz kerak, shundan so'ng natijalaringiz shu yerda ko'rinadi",
    },
    {
      question: "Platformadan qanday foydalansam bo'ladi?",
      answer:
        "Platformadan foydalanish uchun avval ro'yxatdan o'tishingiz kerak, so'ngra istalgan kursni tanlab o'rganishni boshlashingiz mumkin",
    },
    {
      question: "To'lovni qanday amalga oshirsam bo'ladi?",
      answer:
        "To'lovni bank kartasi yoki elektron hamyon orqali amalga oshirishingiz mumkin",
    },
    {
      question: "Kurslar qancha vaqt davom etadi?",
      answer:
        "Har bir kursning davomiyligi turli bo'lishi mumkin, odatda 1 oydan 3 oygacha davom etadi",
    },
    {
      question: "Materiallarni yuklab olish mumkinmi?",
      answer: "Ha, barcha elektron materiallarni yuklab olishingiz mumkin",
    },
    {
      question: "Qo'llab-quvvatlash xizmati bormi?",
      answer:
        "Albatta, bizning qo'llab-quvvatlash xizmatimiz kun davomida ishlaydi",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[#B0B0C0] uppercase text-lg md:text-xl font-bold mb-2">
            Ko'p so'raladigan savollar
          </h2>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Savollaringizga javob toping
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-200 ${
                activeIndex === index ? "bg-[#255ED6]" : "bg-gray-50"
              }`}
            >
              <button
                className={`flex justify-between items-center w-full p-4 md:p-6 text-left ${
                  activeIndex === index ? "text-white" : "text-gray-900"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-base md:text-lg font-medium">
                  {faq.question}
                </h3>
                <FiChevronDown
                  className={`h-5 w-5 transition-transform ${
                    activeIndex === index ? "transform rotate-180" : ""
                  } ${activeIndex === index ? "text-white" : "text-gray-500"}`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <p className="text-white/90 text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
