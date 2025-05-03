import React, { useState, useEffect } from "react"; // Adjust the import path as needed
import { similarImageOfNumber } from "../constants";

const MemoryGame = () => {
  // Clean up duplicate entries in similarImageOfNumber
  const uniqueSimilarImages = [];
  const seenNumbers = new Set();
  similarImageOfNumber.forEach((item) => {
    if (!seenNumbers.has(item.number)) {
      seenNumbers.add(item.number);
      uniqueSimilarImages.push(item);
    }
  });

  // Game state
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize the game
  const initializeGame = () => {
    // Select first 8 unique numbers
    const selectedNumbers = uniqueSimilarImages.slice(0, 8);

    // Create pairs: one card with the number, one with its first image
    const gameCards = [];
    selectedNumbers.forEach((numObj, index) => {
      const representativeImage = numObj.similarImages[0]; // Use the first image as the representative
      gameCards.push({
        id: `card-${index}-num`,
        number: numObj.number,
        image: null,
        isFlipped: false,
      });
      gameCards.push({
        id: `card-${index}-img`,
        number: numObj.number,
        image: representativeImage,
        isFlipped: false,
      });
    });

    // Shuffle the cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setAttempts(0);
    setIncorrectAttempts(0);
    setGameOver(false);
  };

  // Handle card click
  const handleCardClick = (card) => {
    if (
      flippedCards.length >= 2 ||
      card.isFlipped ||
      matchedPairs.includes(card.number)
    )
      return;

    // Flip the card
    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, card]);

    // Increment attempts
    setAttempts(attempts + 1);

    // Check for match if two cards are flipped
    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      if (firstCard.number === card.number) {
        // Match found
        setMatchedPairs([...matchedPairs, card.number]);
        setFlippedCards([]);
        // Check if game is over
        if (matchedPairs.length + 1 === 8) {
          setGameOver(true);
        }
      } else {
        // No match, increment incorrect attempts and close cards after 1 second
        setIncorrectAttempts(incorrectAttempts + 1);
        setTimeout(() => {
          const resetCards = updatedCards.map((c) =>
            c.id === firstCard.id || c.id === card.id
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Reset the game
  const resetGame = () => {
    initializeGame();
  };

  // Start the game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Memory Game</h1>

      {/* Game Grid */}
      {!gameOver ? (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer border-2 transition-all duration-300 ${
                card.isFlipped || matchedPairs.includes(card.number)
                  ? matchedPairs.includes(card.number)
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
            >
              {card.isFlipped || matchedPairs.includes(card.number) ? (
                card.image ? (
                  <img
                    src={card.image}
                    alt={`Number ${card.number}`}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold">{card.number}</span>
                )
              ) : (
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-gray-400">...</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">O'yin Tugadi!</h2>
          <p className="text-gray-600 mb-2">Umumiy urinishlar: {attempts}</p>
          <p className="text-gray-600 mb-4">
            Noto'g'ri urinishlar: {incorrectAttempts}
          </p>
          <p className="text-gray-600 mb-4">
            To'g'ri juftliklar: {matchedPairs.length}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Yangilash
        </button>
        <button
          onClick={() => alert("Tekshirildi! Umumiy urinishlar: " + attempts)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Tekshirish
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
