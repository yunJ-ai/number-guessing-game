import { useState } from "react";
import "./App.css";
import { ModalProvider, useModal } from "./contexts/ModalContext";
import { Modal } from "./components/Modal";

function AppInner() {
  const { openModal } = useModal();
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [tries, setTries] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const MAX_TRIES = 10;
  const [bestScore, setBestScore] = useState(() => {
    const best = localStorage.getItem("bestScore");
    return best ? Number(best) : null;
  });

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function checkGuess() {
    const guess = Number(input);
    if (gameOver) return;

    if (guess < 1 || guess > 100) {
      openModal("1부터 100까지의 숫자를 입력해 주세요😊");
      return;
    }

    const updateTries = tries + 1;
    setTries(updateTries);

    if (updateTries === MAX_TRIES) {
      openModal("게임 끝! 다시 시작해 주세요.");
      setGameOver(true);
      return;
    }

    if (guess === targetNumber) {
      setMessage("🎉 축하합니다! 🎉");
      setGameOver(true);

      if (bestScore === null || updateTries < bestScore) {
        localStorage.setItem("bestScore", String(updateTries));
        setBestScore(updateTries);
      }
    } else if (guess < targetNumber) {
      setMessage("UP!");
    } else {
      setMessage("DOWN!");
    }

    setInput("");
  }

  function resetGame() {
    setTargetNumber(generateRandomNumber());
    setInput("");
    setMessage("");
    setTries(0);
    setGameOver(false);
  }

  return (
    <>
      <Modal />
      <div className=" bg-white/20 backdrop-blur-[20px] rounded-t-lg cursor-pointer p-8 relative z-1 w-150% max-w-450">
        <h3 className="text-3xl font-bold mb-2">숫자 맞추기 게임</h3>
        <p className="text-md text-gray-200 mb-4">
          1부터 100까지의 숫자를 맞춰보세요!
        </p>
        <input
          type="number"
          placeholder="숫자를 입력해 주세요."
          className="border-2 rounded-full px-4 py-2 w-80"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className=" text-white bg-pink-600 hover:bg-pink-700 rounded-full px-8 py-2 mx-2 my-4 disabled:bg-gray-500"
          onClick={checkGuess}
          disabled={gameOver}
        >
          확인
        </button>
      </div>
      <div className="bg-white/20 rounded-b-lg border-t-2 border-gray-200 mt-1 pt-4 border-dashed text-gray-200">
        <div>
          <p>{message}</p>
          <p>
            {MAX_TRIES} 중 {tries}번 시도했어요!
          </p>
          <p>최고 점수: {bestScore ?? "기록 없음"}</p>
        </div>
        <button
          className=" text-white bg-blue-400 hover:bg-blue-500 rounded-full px-8 py-2 mx-2 my-4"
          onClick={resetGame}
        >
          게임 초기화
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <ModalProvider>
      <AppInner />
    </ModalProvider>
  );
}

export default App;
