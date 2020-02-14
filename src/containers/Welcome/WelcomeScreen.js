import React from "react";
import Cell from "../../components/Cell";

import "./styles.scss";

const WelcomeScreen = props => {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-wrapper_infor">
        <p>Select your level</p>
        <button className="button beginner-level">Beginner</button>
        <button className="button advantage-level">Advantage</button>
      </div>
      <Cell/>
    </div>
  );
};

export default WelcomeScreen;
