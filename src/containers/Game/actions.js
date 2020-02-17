import {
  FETCH_MINES,
  FETCH_MINES_FAIL,
  FETCH_MINES_SUCCESS,
  RESET_STATE
} from "./actionTypes";

export function fetchMines(params) {
  return {
    type: FETCH_MINES,
    payload: {
      params
    }
  };
}

export function fetchMinesSuccess(data) {
  return {
    type: FETCH_MINES_SUCCESS,
    data
  };
}

export function fetchMinesFail(error) {
  return {
    type: FETCH_MINES_FAIL,
    error
  };
}

export function resetState() {
  return {
    type: RESET_STATE
  };
}