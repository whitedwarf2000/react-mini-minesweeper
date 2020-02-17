import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Cell = props => {
  const { cell, openAllCell, travelBoard } = props;
  const { isMine, isOpen, numberOfBoom } = cell;

  const handleGetValueOfCell = cell => {
    if (cell.isMine) {
      if (openAllCell) {
        openAllCell();
      }
    } else if (!cell.isOpen) {
      travelBoard(cell.x, cell.y);
    }
  };

  return (
    <div
      className={`cell ${isOpen ? "cell_visible" : ""}`}
      onClick={() => handleGetValueOfCell(cell)}
    >
      <div className={`${isOpen ? "show" : "hidden"}`}>
        {isOpen ? (
          isMine ? (
            <span>💣</span>
          ) : (
            <span>{numberOfBoom === 0 ? null : numberOfBoom}</span>
          )
        ) : null}
      </div>
    </div>
  );
};

Cell.propTypes = {
  cell: PropTypes.object,
  openAllCell: PropTypes.func,
  travelBoard: PropTypes.func
};

export default Cell;
