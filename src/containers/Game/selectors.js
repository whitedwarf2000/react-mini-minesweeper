
import { createSelector } from "reselect";

const gameSelector = state => state.gameReducer;

const getMinesSelector = createSelector(
  gameSelector,
  mines => mines.minesData
);

export { getMinesSelector };
