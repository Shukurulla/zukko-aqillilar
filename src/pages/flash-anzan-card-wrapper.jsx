import { useState } from "react";
import FlashAnzanCard from "./flash-anzan-card";
import FlashAnzanCardComponent from "./flash-anzan-card-game";
import { useSelector } from "react-redux";
import Sidebar from "../components/sidebar";

function FlashAnzanCardWrapper() {
  const [gameStarted, setGameStarted] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [settings, setSettings] = useState({
    mode: "single", // 'single' yoki 'auditorium'
    digitCount: 1, // 1, 2 yoki 3
    regularity: 1.0, // Vaqt sekundlarda
    displayCount: 1, // Ko‘rsatish soni
    sequenceLength: 1, // Ketma-ket kartalar soni
    theme: "cards", // "numbers" yoki "cards"
  });

  const startGame = (newSettings) => {
    setSettings(newSettings);
    setGameStarted(true);
  };

  const endGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!gameStarted ? (
        <FlashAnzanCard onStart={startGame} initialSettings={settings} />
      ) : (
        <FlashAnzanCardComponent settings={settings} onEnd={endGame} />
      )}
    </div>
  );
}

export default FlashAnzanCardWrapper;
