import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchMines } from "./actions";
import { getMinesSelector } from "./selectors";
import Board from "../../components/Board";

const Game = props => {
  const { getMines, mines } = props;

  const defaultParams = {
    size: 9,
    mines: 10
  };

  useEffect(() => {
    getMines(defaultParams);
  }, []);

  return <Board mines={mines} size={defaultParams.size} />;
};

const mapStateToProps = state => {
  return {
    mines: getMinesSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMines: params => {
      dispatch(fetchMines(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
