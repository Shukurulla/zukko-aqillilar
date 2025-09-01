// src/hooks/useGlobalFlashCardsPreloader.js
import { useState, useEffect } from "react";

// Global cache object
let globalFlashCardsCache = {
  isLoaded: false,
  images: {},
  loadingProgress: 0,
};

// Cache event listeners
let cacheListeners = [];

const useGlobalFlashCardsPreloader = () => {
  const [isLoaded, setIsLoaded] = useState(globalFlashCardsCache.isLoaded);
  const [loadingProgress, setLoadingProgress] = useState(
    globalFlashCardsCache.loadingProgress
  );

  useEffect(() => {
    // Agar allaqachon yuklangan bo'lsa
    if (globalFlashCardsCache.isLoaded) {
      setIsLoaded(true);
      setLoadingProgress(100);
      return;
    }

    // Listener qo'shish
    const updateState = (newState) => {
      setIsLoaded(newState.isLoaded);
      setLoadingProgress(newState.loadingProgress);
    };

    cacheListeners.push(updateState);

    // Component unmount bo'lganda listener olib tashlash
    return () => {
      cacheListeners = cacheListeners.filter(
        (listener) => listener !== updateState
      );
    };
  }, []);

  const getRandomCardImage = () => {
    if (!globalFlashCardsCache.isLoaded) {
      console.warn("Flash cards hali yuklanmagan");
      return null;
    }

    const randomNumber = Math.floor(Math.random() * 100); // 0-99
    return {
      number: randomNumber,
      imagePath:
        globalFlashCardsCache.images[randomNumber] ||
        `/flash-cards/${randomNumber}.png`,
    };
  };

  return {
    isLoaded,
    loadingProgress,
    getRandomCardImage,
    progressPercentage: Math.floor(loadingProgress),
  };
};

// Global yuklovchi funksiya
export const initializeFlashCardsCache = async () => {
  // Agar allaqachon yuklangan bo'lsa, qaytadan yuklamaslik
  if (globalFlashCardsCache.isLoaded) {
    return Promise.resolve();
  }

  console.log("Flash cards cache yuklanmoqda...");

  return new Promise((resolve) => {
    const imagePromises = [];
    const imageMap = {};
    let loadedCount = 0;

    // Progress update funksiya
    const updateProgress = () => {
      loadedCount++;
      const progress = (loadedCount / 100) * 100;

      globalFlashCardsCache.loadingProgress = progress;

      // Barcha listener-larni yangilash
      cacheListeners.forEach((listener) => {
        listener({
          isLoaded: globalFlashCardsCache.isLoaded,
          loadingProgress: progress,
        });
      });

      // Agar barchasi yuklangan bo'lsa
      if (loadedCount === 100) {
        globalFlashCardsCache.isLoaded = true;
        globalFlashCardsCache.images = imageMap;

        // Final update
        cacheListeners.forEach((listener) => {
          listener({
            isLoaded: true,
            loadingProgress: 100,
          });
        });

        console.log("Flash cards cache muvaffaqiyatli yuklandi!");
        resolve();
      }
    };

    // 0-99 gacha bo'lgan barcha rasmlarni yuklash
    for (let i = 0; i <= 99; i++) {
      const imagePath = `/flash-cards/${i}.png`;

      const imagePromise = new Promise((resolveImg) => {
        const img = new Image();

        img.onload = () => {
          imageMap[i] = imagePath;
          updateProgress();
          resolveImg(img);
        };

        img.onerror = () => {
          console.warn(`Flash card rasm yuklanmadi: ${imagePath}`);
          // Xatolikda ham davom etish
          updateProgress();
          resolveImg(null);
        };

        img.src = imagePath;
      });

      imagePromises.push(imagePromise);
    }
  });
};

export default useGlobalFlashCardsPreloader;
