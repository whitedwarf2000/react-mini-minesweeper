import React from "react";
import "./styles.scss";

const Cell = props => {

  const renderCell = () => {
    const cells = [];
    for (let i = 0; i < 81; i += 1) {
      cells.push(<div key={i} className="cell"></div>);
    }
    return cells;
  };

  return (
    <>
      {renderCell()}
    </>
  );
};

export default Cell;
