import { useState } from "react";
import "./App.css";

function App() {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber()); // 랜덤 숫자 생성
  const [input, setInput] = useState(""); // 사용자 입력
  const [message, setMessage] = useState(""); // 메시지
  const [tries, setTries] = useState(0); // 시도 횟수
  const [showDialog, setShowDialog] = useState(false); // 다이얼로그 상태
  const [dialogMessage, setDialogMessage] = useState("");

  // 랜덤 숫자 생성
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // 힌트 확인
  function checkGuess() {
    const guess = Number(input);
    if (guess < 1 || guess > 100) {
      setShowDialog(true); // 다이얼로그 표시
      setDialogMessage("1부터 100까지의 숫자를 입력해 주세요😊");
      return;
    }
    setTries((prev) => prev + 1); // 시도 횟수 증가

    if (guess === targetNumber) {
      setMessage("🎉 축하합니다! 🎉");
    } else if (guess < targetNumber) {
      setMessage("더 큰 숫자!");
    } else {
      setMessage("더 작은 숫자!");
    }
    setInput(""); // 입력 초기화
  }

  // 게임 초기화
  function resetGame() {
    setTargetNumber(generateRandomNumber());
    setInput("");
    setMessage("");
    setTries(0);
  }

  return (
    <>
      {showDialog && (
        <div className="dialog-title">
          <div className="dialog-content">
            <p>{dialogMessage}</p>
            <button onClick={() => setShowDialog(false)}>확인</button>
          </div>
        </div>
      )}
      <div className="board rounded-t-lg">
        <h3 className="text-3xl font-bold m-2">숫자 맞추기 게임</h3>
        <p className="text-gray-200">1부터 100까지의 숫자를 맞춰보세요!</p>
        <input
          className="border-2 rounded-full p-2 m-2 w-80"
          type="number"
          placeholder="숫자를 입력해 주세요."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          className="check-button text-white bg-pink-600 hover:bg-pink-700"
          onClick={checkGuess}
        >
          확인
        </button>
      </div>
      <div className="board rounded-b-lg border-t-2 border-gray-200 mt-1 border-dashed">
        <div>
          <p className="text-gray">{message}</p>
          <p className="text-gray">{tries}번 시도했어요!</p>
        </div>
        <button
          className="reset-button text-white bg-blue-400 hover:bg-blue-500"
          onClick={resetGame}
        >
          게임 초기화
        </button>
      </div>
    </>
  );
}

export default App;
