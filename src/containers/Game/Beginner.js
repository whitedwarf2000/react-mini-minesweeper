import React from "react";
import BaseGame from "./BaseGame";

const Beginner = () => {
  const defaultParams = {
    size: 9,
    mines: 10
  };

  return <BaseGame defaultParams={defaultParams}/>
};

export default Beginner;
