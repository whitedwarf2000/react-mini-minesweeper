import { FETCH_MINES_SUCCESS, FETCH_MINES_FAIL } from "./actionTypes";

const initialState = {
  minesData: [],
  error: null
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MINES_SUCCESS:
      return {...state, minesData: action.data };
    case FETCH_MINES_FAIL:
      return {...state, error: action.error };
    default:
      return state;
  }
};
