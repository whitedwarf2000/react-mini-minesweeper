import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Cell from "../Cell";
import { GAME_STATUS } from "../../constants";
import "./styles.scss";

const Board = memo(props => {
  const {
    initBoard,
    size,
    winScore,
    startNewGame,
    history,
    handleGameStatus,
    handleResetState
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
          const cellComponent = <Cell key={col.id} cell={col} />;
          cells.push(cellComponent);
        });
      });
    setBoard(cells);
    setRestartGame(true);
    handleGameStatus(GAME_STATUS.LOST);
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
              key={col.id}
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
      handleGameStatus(GAME_STATUS.WIN);
      setWonGame(true);
    }
  }, [userScore]);

  return (
    <>
      {hasWon || restartGame ? (
        <>
          <button
            className="button play-again"
            onClick={() => {
              handleResetState();
              history.push("/welcome");
            }}
          >
            Back to home
          </button>
          <button className="button play-again" onClick={handleStartNewGame}>
            Reset game
          </button>
        </>
      ) : null}
      <div
        data-testid="board"
        className={`board ${size === 9 ? "beginner-board" : "advantage-board"}`}
      >
        {board && board.length > 0 && board.map(cell => cell)}
      </div>
    </>
  );
});

Board.propTypes = {
  initBoard: PropTypes.array,
  size: PropTypes.number,
  winScore: PropTypes.number,
  startNewGame: PropTypes.func,
  history: PropTypes.any,
  handleGameStatus: PropTypes.func
};

export default withRouter(Board);
