import { createSelector } from "reselect";

const getMines = state => state.get("minesData");
const getLoading = state => state.get("isLoading");
const getError = state => state.get("error");

const getMinesSelector = createSelector(
  getMines,
  mines => {
    if (!Array.isArray(mines)) {
      return mines.toJS();
    }
    return mines;
  }
);

const getLoadingSelector = createSelector(
  getLoading,
  loading => loading
);

const getErrorSelector = createSelector(
  getError,
  error => error
);

export { getMinesSelector, getLoadingSelector, getErrorSelector };
