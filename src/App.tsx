import { useState } from "react";
import "./App.css";

function App() {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber()); // 랜덤 숫자 생성
  const [input, setInput] = useState(""); // 사용자 입력
  const [message, setMessage] = useState(""); // 메시지
  const [tries, setTries] = useState(0); // 시도 횟수
  const [showDialog, setShowDialog] = useState(false); // 다이얼로그 상태
  const [dialogMessage, setDialogMessage] = useState("");
  const [gameOver, setGameOver] = useState(false); // 게임 종료 상태
  const MAX_TRIES = 10; // 최대 시도 횟수
  const [bestScore, setBestScore] = useState(() => {
    const bestScore = localStorage.getItem("bestScore");
    return bestScore ? Number(bestScore) : null;
  });

  // 답
  console.log("🔐정답:", targetNumber);

  // 랜덤 숫자 생성
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // 힌트 확인
  function checkGuess() {
    const guess = Number(input);

    if (gameOver) return;

    if (guess < 1 || guess > 100) {
      setShowDialog(true); // 다이얼로그 표시
      setDialogMessage("1부터 100까지의 숫자를 입력해 주세요😊");
      return;
    }

    const updateTries = tries + 1; // 시도 횟수 증가
    setTries(updateTries);

    if (updateTries === MAX_TRIES) {
      setShowDialog(true); // 다이얼로그 표시
      setDialogMessage("게임 끝! 다시 시작해 주세요.");
      setGameOver(true); // 게임 종료 상태 설정
      return;
    }

    if (guess === targetNumber) {
      setMessage("🎉 축하합니다! 🎉");
      setGameOver(true); // 게임 종료 상태 설정

      if (bestScore === null || updateTries < bestScore) {
        localStorage.setItem("bestScore", String(updateTries));
        setBestScore(updateTries); // 최고 점수 업데이트
      }
    } else if (guess < targetNumber) {
      setMessage("UP!");
    } else {
      setMessage("DOWN!");
    }
    setInput(""); // 입력 초기화
  }

  // 게임 초기화
  function resetGame() {
    setTargetNumber(generateRandomNumber());
    setInput("");
    setMessage("");
    setTries(0);
    setGameOver(false); // 게임 종료 상태 초기화
    setShowDialog(false); // 다이얼로그 숨김
  }

  return (
    <>
      {/* showDialog 말고 다른 방법 context  */}
      {showDialog && (
        <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-8 shadow-lg rounded-md">
          <div className="text-lg font-semibold mb-4 text-gray-900">🔔</div>
          <div className="text-md text-gray-900">
            <p>{dialogMessage}</p>
            <button
              className="text-white bg-gray-600 hover:bg-gray-700 rounded-full px-6 py-2 my-2"
              onClick={() => setShowDialog(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
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

export default App;
