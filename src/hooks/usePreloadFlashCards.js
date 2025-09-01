// src/hooks/usePreloadFlashCards.js
import { useState, useEffect } from "react";

const usePreloadFlashCards = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [images, setImages] = useState({});

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [];
      const imageMap = {};

      // 0-99 gacha bo'lgan barcha rasmlarni yuklash
      for (let i = 0; i <= 99; i++) {
        const imagePath = `/flash-cards/${i}.png`;

        const imagePromise = new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            imageMap[i] = imagePath;
            setLoadingProgress((prev) => prev + 1);
            resolve(img);
          };
          img.onerror = () => {
            console.warn(`Rasm yuklanmadi: ${imagePath}`);
            setLoadingProgress((prev) => prev + 1);
            resolve(null); // Xatolikda ham davom etish
          };
          img.src = imagePath;
        });

        imagePromises.push(imagePromise);
      }

      try {
        await Promise.all(imagePromises);
        setImages(imageMap);
        setIsLoaded(true);
        console.log("Barcha flash card rasmlari yuklandi");
      } catch (error) {
        console.error("Rasmlarni yuklashda xatolik:", error);
        setIsLoaded(true); // Xatolikda ham davom etish
      }
    };

    preloadImages();
  }, []);

  const getRandomCardImage = () => {
    const randomNumber = Math.floor(Math.random() * 100); // 0-99
    return {
      number: randomNumber,
      imagePath: images[randomNumber] || `/flash-cards/${randomNumber}.png`,
    };
  };

  return {
    isLoaded,
    loadingProgress,
    images,
    getRandomCardImage,
    progressPercentage: Math.floor((loadingProgress / 100) * 100),
  };
};

export default usePreloadFlashCards;
