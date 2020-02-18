import { fromJS } from "immutable";

import {
  FETCH_MINES,
  FETCH_MINES_SUCCESS,
  FETCH_MINES_FAIL,
  RESET_STATE
} from "./actionTypes";

const initialState = fromJS({
  minesData: [],
  error: null,
  isLoading: false
});

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MINES:
      return state.set("isLoading", true);
    case FETCH_MINES_SUCCESS:
      return state.set("minesData", action.data).set("isLoading", false);
    case FETCH_MINES_FAIL:
      return state.set("error", action.error).set("isLoading", false);
    case RESET_STATE:
      return state
        .set("minesData", [])
        .set("error", null)
        .set("isLoading", false);
    default:
      return state;
  }
};
