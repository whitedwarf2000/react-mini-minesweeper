
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

export { getMinesSelector, getLoadingSelector };
