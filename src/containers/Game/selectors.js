
import { createSelector } from "reselect";

const gameSelector = state => state.gameReducer;

const getMinesSelector = createSelector(
  gameSelector,
  mines => mines.minesData
);

const getLoadingSelector = createSelector(
  gameSelector,
  mines => mines.isLoading
);

const getErrorSelector = createSelector(
  gameSelector,
  mines => mines.error
);

export { getMinesSelector, getLoadingSelector, getErrorSelector };
