import gameSaga from "./containers/Game/saga";

function* rootSaga() {
  yield gameSaga()
}

export default rootSaga;