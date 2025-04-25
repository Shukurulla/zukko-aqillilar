// App.js
import { useState } from "react";
import GameSettings from "./GameSettings";
import FlashAnzanComponent from "./FlashAnzan";

function FlashAnzan() {
  const [gameStarted, setGameStarted] = useState(false);
  const [settings, setSettings] = useState({
    digitCount: "1", // '1', '2', or '3'
    regularity: "1.0", // display time in seconds
    sequenceLength: "3", // 1-10
    operation: "add", // 'add', 'subtract', or 'mixed'
    rowCount: "2", // 2 or 3
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
        <GameSettings onStart={startGame} initialSettings={settings} />
      ) : (
        <FlashAnzanComponent settings={settings} onEnd={endGame} />
      )}
    </div>
  );
}

export default FlashAnzan;
