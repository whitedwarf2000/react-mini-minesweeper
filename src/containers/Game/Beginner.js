import React from "react";
import Game from "./Game";

const Beginner = () => {
  const defaultParams = {
    size: 9,
    mines: 10
  };

  return <Game defaultParams={defaultParams}/>
};

export default Beginner;
