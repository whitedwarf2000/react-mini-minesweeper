import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Board from "../../../components/Board";
import { uuidv4 } from "../../../utils/commons";

const BaseGame = memo(props => {
  const {
    mines,
    isLoading,
    error,
    size,
    winScore,
    startNewGame,
    handleGameStatus
  } = props;

  const [initBoard, setBoard] = useState([]);

  const createBoard = () => {
    let results = [];
    for (let i = 0; i < size; i += 1) {
      results.push([]);
      for (let j = 0; j < size; j += 1) {
        results[i][j] = {
          id: uuidv4(),
          x: i,
          y: j,
          isMine: false,
          numberOfBoom: 0,
          isOpen: false
        };
      }
    }
    mines &&
      mines.length > 0 &&
      mines.forEach(mine => {
        const hasBoom = results[mine.x][mine.y]; // position has a boom
        if (hasBoom) {
          hasBoom.isMine = true;
        }
      });
    return results;
  };

  const countNeighbour = () => {
    const newBoard = createBoard();
    mines &&
      mines.length > 0 &&
      mines.forEach(mine => {
        const neighbors = [
          [mine.x - 1, mine.y - 1],
          [mine.x - 1, mine.y],
          [mine.x - 1, mine.y + 1],
          [mine.x, mine.y + 1],
          [mine.x + 1, mine.y + 1],
          [mine.x + 1, mine.y],
          [mine.x + 1, mine.y - 1],
          [mine.x, mine.y - 1]
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
            if (!newBoard[neighbors[i][0]][neighbors[i][1]].isMine) {
              newBoard[neighbors[i][0]][neighbors[i][1]].numberOfBoom += 1;
            }
          }
        }
      });

    return newBoard;
  };

  const board = countNeighbour();

  useEffect(() => {
    setBoard(board);
  }, [mines]);

  return (
    <>
      {error ? (
        <>Somethings when wrong???</>
      ) : isLoading ? (
        <p>Chờ tí nha...</p>
      ) : (
        <Board
          initBoard={initBoard}
          size={size}
          winScore={winScore}
          startNewGame={startNewGame}
          handleGameStatus={handleGameStatus}
        />
      )}
    </>
  );
});

BaseGame.propTypes = {
  mines: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  size: PropTypes.number,
  winScore: PropTypes.number,
  startNewGame: PropTypes.func,
  handleGameStatus: PropTypes.func
};

export default BaseGame;
