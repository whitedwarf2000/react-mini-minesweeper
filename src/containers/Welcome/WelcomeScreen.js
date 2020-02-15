import React from "react";
import { withRouter } from "react-router-dom";

import "./styles.scss";

const WelcomeScreen = props => {
  const { history } = props;

  const startGameForBeginner = () => {
    history.push("/game/beginner");
  };

  return (
    <div className="welcome-wrapper">
      <div className="welcome-wrapper_infor">
        <p>Select your level</p>
        <button className="button beginner-level" onClick={startGameForBeginner}>Beginner</button>
        <button className="button advantage-level">Advantage</button>
      </div>
    </div>
  );
};

export default withRouter(WelcomeScreen);
