import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchMines } from "./actions";
import {
  getMinesSelector,
  getLoadingSelector,
  getErrorSelector
} from "./selectors";
import Board from "../../components/Board";

const BaseGame = memo(props => {
  const { getMines, mines, isLoading, error, defaultParams } = props;

  const size = defaultParams.size;
  const winScore = size * size - defaultParams.mines;

  const [initBoard, setBoard] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isStartTimer, setStartTimer] = useState(false);

  const createBoard = () => {
    let results = [];
    for (let i = 0; i < size; i += 1) {
      results.push([]);
      for (let j = 0; j < size; j += 1) {
        results[i][j] = {
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

  const formatTimer = () =>
    new Date(seconds * 1000).toISOString().substr(11, 8);

  const handleGameStatus = gameStatus => () => {
    if (gameStatus === "win") alert(`You win: ${formatTimer()}`);
    else alert(`You lost: ${formatTimer()}`);

    setSeconds(0);
    setStartTimer(false);
  };

  useEffect(() => {
    getMines(defaultParams);
  }, []);

  useEffect(() => {
    setBoard(board);
    setStartTimer(true);
  }, [mines]);

  useEffect(() => {
    let interval = null;
    if (isStartTimer) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isStartTimer && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStartTimer, seconds]);

  const startGame = () => {
    getMines(defaultParams);
  };

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
          startNewGame={startGame}
          handleWinGame={handleGameStatus("win")}
          handleLostGame={handleGameStatus("lost")}
        />
      )}
    </>
  );
});

const mapStateToProps = state => {
  return {
    error: getErrorSelector(state),
    isLoading: getLoadingSelector(state),
    mines: getMinesSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMines: params => {
      dispatch(fetchMines(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseGame);
