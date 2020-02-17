import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchMines } from "./actions";
import {
  getMinesSelector,
  getLoadingSelector,
  getErrorSelector
} from "./selectors";

import BaseGame from "./components/BaseGame";
import Timer from "./components/Timer";
import { GAME_STATUS } from "../../constants";

const Game = memo(props => {
  const { getMines, mines, isLoading, error, defaultParams } = props;

  const size = defaultParams.size;
  const winScore = size * size - defaultParams.mines;

  const [isGameStart, setGameStart] = useState(false);

  const handleGameStatus = gameStatus => {
    setGameStart(false);

    if (gameStatus === GAME_STATUS.WIN) alert("You win");
    else alert("You lost");
  };

  const startGame = () => {
    getMines(defaultParams);
  };

  useEffect(() => {
    getMines(defaultParams);
  }, []);

  useEffect(() => {
    if (mines && mines.length > 0) {
      setGameStart(true);
    }
  }, [mines]);

  return (
    <>
      <Timer isGameStart={isGameStart} />
      <BaseGame
        mines={mines}
        isLoading={isLoading}
        error={error}
        size={size}
        winScore={winScore}
        startNewGame={startGame}
        handleGameStatus={handleGameStatus}
      />
    </>
  );
});

Game.propTypes = {
  getMines: PropTypes.func,
  mines: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  defaultParams: PropTypes.object
};

const mapStateToProps = state => {
  return {
    error: getErrorSelector(state),
    isLoading: getLoadingSelector(state),
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
