import React from "react";
import BaseGame from "./BaseGame";

const Advantage = () => {
  const defaultParams = {
    size: 16,
    mines: 40
  };

  return <BaseGame defaultParams={defaultParams}/>
};

export default Advantage;
