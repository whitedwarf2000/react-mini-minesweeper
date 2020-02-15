import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import "./styles.scss";

const Board = props => {
  const { initBoard, size, startNewGame } = props;

  const [newBoard, setNewBoard] = useState([]);
  const [board, setBoard] = useState([]);
  const [winScore, setWinScore] = useState(1);
  const [userScore, setScore] = useState(0);

  const [restartGame, setRestartGame] = useState(false);

  const handleTravelBoard = (x, y, isOpen, isNumber, score) => {
    if (isOpen) return score;
    if (x < 0 || y < 0) return score;
    if (x >= size || y >= size) return score;

    score++;

    if (isNumber) return score;

    newBoard[x][y].isOpen = true;

    const neighbors = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 1, y],
      [x + 1, y - 1],
      [x, y - 1]
    ];

    const isValidPosition = index => {
      return (
        neighbors[index][0] > -1 &&
        neighbors[index][0] < newBoard.length &&
        neighbors[index][1] > -1 &&
        neighbors[index][1] < newBoard.length
      );
    };

    for (let i = 0; i < 8; i += 1) {
      if (isValidPosition(i)) {
        handleTravelBoard(
          neighbors[i][0],
          neighbors[i][1],
          newBoard[neighbors[i][0]][neighbors[i][1]].isOpen,
          isNonZeroCell(x, y)
        );
      }
    }
    return score;
  };

  const handleGameOver = () => {
    const cells = [];
    newBoard &&
    newBoard.length > 0 &&
    newBoard.forEach(row => {
        row.forEach(col => {
          col.isOpen = true;
          const cellComponent = <Cell key={Math.random()} cell={col} />;
          cells.push(cellComponent);
        });
      });
    setBoard(cells);
    setRestartGame(true);
  };

  const handleStartNewGame = () => {
    setRestartGame(false);
    startNewGame();
  };

  const isNonZeroCell = (x, y) => {
    return newBoard[x][y].numberOfBoom !== 0 && !newBoard[x][y].isMine;
  };

  useEffect(() => {
    const cells = [];
    newBoard &&
    newBoard.length > 0 &&
    newBoard.forEach(row => {
        row.forEach(col => {
          const cellComponent = (
            <Cell
              key={Math.random()}
              cell={col}
              openAllCell={handleGameOver}
              travelBoard={(x, y) => {
                setScore(handleTravelBoard(x, y, false, false, userScore));
              }}
            />
          );
          cells.push(cellComponent);
        });
      });
    setBoard(cells);
  }, [newBoard, userScore]);

  useEffect(() => {
    setNewBoard(initBoard);
  }, [initBoard]);

  return (
    <>
      {restartGame && (
        <button className="button play-again" onClick={handleStartNewGame}>
          Chơi lại nha
        </button>
      )}
      <div className="board">
        {board && board.length > 0 && board.map(cell => cell)}
      </div>
    </>
  );
};

export default Board;
