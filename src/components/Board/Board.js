import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import Cell from "../Cell";
import "./styles.scss";

const Board = memo(props => {
  const {
    initBoard,
    size,
    winScore,
    startNewGame,
    history,
    handleWinGame,
    handleLostGame
  } = props;

  const [newBoard, setNewBoard] = useState([]);
  const [board, setBoard] = useState([]);
  const [userScore, setScore] = useState(0);

  const [hasWon, setWonGame] = useState(false);
  const [restartGame, setRestartGame] = useState(false);

  const handleTravelBoard = (x, y, isOpen, cell) => {
    if (isOpen) return;
    if (x < 0 || y < 0) return;
    if (x >= size || y >= size) return;
    if (cell) return;

    newBoard[x][y].isOpen = true;
    setScore(preScore => preScore + 1);

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
          isNumberCell(x, y)
        );
      }
    }
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
    handleLostGame();
  };

  const handleStartNewGame = () => {
    setRestartGame(false);
    setScore(0);
    startNewGame();
  };

  const isNumberCell = (x, y) =>
    newBoard[x][y].numberOfBoom !== 0 && !newBoard[x][y].isMine;

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
                handleTravelBoard(x, y, false, false);
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

  useEffect(() => {
    if (userScore === winScore) {
      handleWinGame();
      setWonGame(true);
    }
  }, [userScore]);

  return (
    <>
      {hasWon && (
        <button
          className="button play-again"
          onClick={() => {
            history.push("/welcome");
          }}
        >
          Back to home
        </button>
      )}
      {hasWon || restartGame ? (
        <button className="button play-again" onClick={handleStartNewGame}>
          Reset game
        </button>
      ) : null}
      <div
        className={`board ${size === 9 ? "beginner-board" : "advantage-board"}`}
      >
        {board && board.length > 0 && board.map(cell => cell)}
      </div>
    </>
  );
});

export default withRouter(Board);
