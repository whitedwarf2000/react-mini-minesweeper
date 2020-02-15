import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_MINES } from "./actionTypes";
import { fetchMinesSuccess, fetchMinesFail } from "./actions";

import request from "../../utils/request";

export function* fetchMines(action) {
  const {
    params: { size, mines }
  } = action.payload;

  const requestURL =
    `https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`;

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