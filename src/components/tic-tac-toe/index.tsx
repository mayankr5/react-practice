import { useState } from 'react';
import styles from './tictactoe.module.css';

const TicTacToe = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6], 
  ];

  const checkWinner = (updatedBoard: string[]) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (updatedBoard[a] && updatedBoard[a] === updatedBoard[b] && updatedBoard[b] === updatedBoard[c]) {
        return updatedBoard[a];
      }
    }
    if (updatedBoard.every(cell => cell !== "")) return "Draw";
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] !== "" || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const gameResult = checkWinner(updatedBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className={styles.container}>
      <h1>Tic Tac Toe</h1>
      <div className={styles.board}>
        {board.map((cell, index) => (
          <div key={index} className={styles.cell} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div className={styles.result}>
          {winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`}
        </div>
      )}

      <button className={styles.resetBtn} onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
