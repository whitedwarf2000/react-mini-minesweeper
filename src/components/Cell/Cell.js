import React, { useState } from "react";
import "./styles.scss";

const Cell = props => {
  const { cell, openAllCell } = props;
  const [isOpenCell, setOpenCell] = useState(false);

  const { isMine, isOpen, numberOfBoom } = cell;

  const handleGetValueOfCell = cell => {
    if (cell.isMine) {
      alert('You lose!!!');
      openAllCell();
    }
    setOpenCell(true);
  };

  return (
    <div
      className={`cell ${isOpen || isOpenCell ? "cell_visible" : ""}`}
      onClick={() => handleGetValueOfCell(cell)}
    >
      <div className={`${isOpen || isOpenCell ? "show" : "hidden"}`}>
        {isMine ? <span>💣</span> : <span>{numberOfBoom === 0 ? null : numberOfBoom}</span>}
      </div>
    </div>
  );
};

export default Cell;
