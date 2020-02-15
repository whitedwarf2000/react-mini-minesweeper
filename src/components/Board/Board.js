import React from "react";
import Cell from "../Cell";
import "./styles.scss";

const Board = props => {
  const { mines, size } = props;

  const createBoard = (height = size, width = size) => {
    let results = [];
    for (let i = 0; i < height; i++) {
      results.push([]);
      for (let j = 0; j < width; j++) {
        results[i][j] = {
          x: i,
          y: j,
          isMine: false,
          numberOfBoom: 0,
          isOpen: false,
          visited: false,
          isEmpty: false
        };
      }
    }
    mines &&
      mines.length > 0 &&
      mines.forEach(mine => {
        const hasBoom = results[mine.x][mine.y];
        if (hasBoom) {
          hasBoom.isMine = true;
        }
      });
    return results;
  };

  const countNeighbour = () => {
    const board = [...createBoard()];
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

        for (let i = 0; i < 8; i++) {
          if (
            neighbors[i][0] > -1 &&
            neighbors[i][0] < board.length &&
            neighbors[i][1] > -1 &&
            neighbors[i][1] < board.length
          ) {
            if (!board[neighbors[i][0]][neighbors[i][1]].isMine) {
              board[neighbors[i][0]][neighbors[i][1]].numberOfBoom += 1;
            }
          }
        }
      });

    return board;
  };

  const board = countNeighbour();

  const renderCell = () => {
    const cells = [];
    board &&
      board.length > 0 &&
      board.forEach(row => {
        row.forEach(col => {
          const cellComponent = <Cell key={Math.random()} cell={col} />;
          cells.push(cellComponent);
        });
      });

    return cells;
  };

  return <div className="board">{renderCell()}</div>;
};

export default Board;
