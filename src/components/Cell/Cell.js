import React, { useState } from "react";
import "./styles.scss";

const Cell = props => {
  const { cell } = props;
  const [isOpen, setOpenCell] = useState(false);

  const { isMine, numberOfBoom } = cell;

  return (
    <div
      className={`cell ${isOpen ? "cell_visible" : ""}`}
      onClick={() => setOpenCell(true)}
    >
      <div className={`${isOpen ? "show" : "hidden"}`}>
        {isMine ? <span>💣</span> : <span>{numberOfBoom}</span>}
      </div>
    </div>
  );
};

export default Cell;
