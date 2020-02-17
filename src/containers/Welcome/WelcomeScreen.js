import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./styles.scss";

import { resetState } from "../Game/actions";

const WelcomeScreen = props => {
  const { history, reset } = props;

  const startGameForBeginner = () => {
    history.push("/game/beginner");
  };

  const startGameForAdvantage = () => {
    history.push("/game/advantage");
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="welcome-wrapper">
      <div className="welcome-wrapper_infor">
        <p>Select your level</p>
        <button className="button beginner-level" onClick={startGameForBeginner}>Beginner</button>
        <button className="button advantage-level" onClick={startGameForAdvantage}>Advantage</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => {
      dispatch(resetState());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WelcomeScreen));
