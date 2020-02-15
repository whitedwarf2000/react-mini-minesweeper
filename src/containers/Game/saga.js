import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_MINES } from "./actionTypes";
import { fetchMinesSuccess, fetchMinesFail } from "./actions";

import request from "../../utils/request";

export function* fetchMines(action) {
  const { params } = action.payload;

  const requestURL =
    "https://tiki-minesweeper.herokuapp.com/getMines?size=9&mines=10";

  try {
    const response = yield call(request, requestURL);
    if (response && response.msg === "success") {
      const { data } = response;
      yield put(fetchMinesSuccess(data));
    }
  } catch (err) {
    yield put(fetchMinesFail(err));
  }
}

export default function* gameSaga() {
  yield takeLatest(FETCH_MINES, fetchMines);
}