import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchMines } from "./actions";
import { getMinesSelector, getLoadingSelector } from "./selectors";

import Advantage from "./Advantage";
import Beginner from "./Beginner";

const Game = props => {
  const { history } = props;

  const [renderComponent, setComponent] = useState(null);

  useEffect(() => {
    if (history) {
      const {
        location: { pathname }
      } = history;
      if (pathname.includes("beginner")) {
        setComponent(<Beginner />);
      } else {
        setComponent(<Advantage />);
      }
    }
  }, [history]);

  return <>{renderComponent}</>;
};

const mapStateToProps = state => {
  return {
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
