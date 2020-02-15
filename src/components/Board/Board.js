import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import "./styles.scss";

const Board = props => {
  const { mines, size, startNewGame } = props;

  const [restartGame, setRestartGame] = useState(false);
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
          isOpen: false,
          visited: false
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
    const board = createBoard();
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
            neighbors[index][0] < board.length &&
            neighbors[index][1] > -1 &&
            neighbors[index][1] < board.length
          );
        };

        for (let i = 0; i < 8; i += 1) {
          if (isValidPosition(i)) {
            if (!board[neighbors[i][0]][neighbors[i][1]].isMine) {
              board[neighbors[i][0]][neighbors[i][1]].numberOfBoom += 1;
            }
          }
        }
      });

    return board;
  };

  const travelBoard = (x, y, visited, size, boards) => {
    if (visited) return;
    if (x - 1 < 0 || y - 1 < 0) return;
    if (x >= size || y >= size) return;

    boards[x][y].visited = true;

    travelBoard(x - 1, y - 1, boards[x - 1][y - 1], size, boards);
    travelBoard(x - 1, y, boards[x - 1][y], size, boards);
    travelBoard(x - 1, y + 1, boards[x - 1][y + 1], size, boards);
    travelBoard(x, y - 1, boards[x][y - 1], size, boards);
    travelBoard(x, y + 1, boards[x][y + 1], size, boards);
    travelBoard(x + 1, y - 1, boards[x + 1][y - 1], size, boards);
    travelBoard(x + 1, y, boards[x + 1][y], size, boards);
    travelBoard(x + 1, y + 1, boards[x + 1][y + 1], size, boards);
  };

  // travelBoard(0, 0, false, size, createEmptyArray());

  const board = countNeighbour();

  const handleGameOver = () => {
    const cells = [];
    board &&
      board.length > 0 &&
      board.forEach(row => {
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

  useEffect(() => {
    const cells = [];
    board &&
      board.length > 0 &&
      board.forEach(row => {
        row.forEach(col => {
          const cellComponent = (
            <Cell key={Math.random()} cell={col} openAllCell={handleGameOver} />
          );
          cells.push(cellComponent);
        });
      });
    setBoard(cells);
  }, [mines]);

  return (
    <>
      {restartGame && <button className="button play-again" onClick={handleStartNewGame}>Chơi lại nha</button>}
      <div className="board">
        {initBoard && initBoard.length > 0 && initBoard.map(cell => cell)}
      </div>
    </>
  );
};

export default Board;
