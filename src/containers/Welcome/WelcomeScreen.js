import React from "react";
import './styles.scss';

const WelcomeScreen = props => {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-wrapper_infor">
        <p>Select your level</p>
        <button className="button beginner-level">Beginner</button>
        <button className="button advantage-level">Advantage</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
