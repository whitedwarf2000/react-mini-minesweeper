import {
  FETCH_MINES,
  FETCH_MINES_SUCCESS,
  FETCH_MINES_FAIL
} from "./actionTypes";

const initialState = {
  minesData: [],
  error: null,
  isLoading: false
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MINES:
      return { ...state, isLoading: true };
    case FETCH_MINES_SUCCESS:
      return { ...state, minesData: action.data, isLoading: false };
    case FETCH_MINES_FAIL:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};
