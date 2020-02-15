import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchMines } from "./actions";
import { getMinesSelector, getLoadingSelector } from "./selectors";
import Board from "../../components/Board";

const BaseGame = props => {
  const { getMines, mines, isLoading, defaultParams } = props;

  const size = defaultParams.size;
  const winScore = size * size - defaultParams.mines;

  const [initBoard, setBoard] = useState([]);

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

  useEffect(() => {
    getMines(defaultParams);
  }, []);

  useEffect(() => {
    setBoard(board);
  }, [mines]);

  const startGame = () => {
    getMines(defaultParams);
  };

  return (
    <>
      {isLoading ? (
        <p>Chờ tí nha</p>
      ) : (
        <Board
          initBoard={initBoard}
          size={size}
          winScore={winScore}
          startNewGame={startGame}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
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
