import React from "react";
import Game from "./Game";

const Advantage = () => {
  const defaultParams = {
    size: 16,
    mines: 40
  };

  return <Game defaultParams={defaultParams}/>
};

export default Advantage;
