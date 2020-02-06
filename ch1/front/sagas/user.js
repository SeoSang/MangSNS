import { all, fork, takeLatest, put, call } from "redux-saga/effects"
import { LOG_IN_SUCCESS, LOG_IN_FAILURE } from "../reducers/user"

function loginAPI() {
  // 서버에 요청을 보냄
}
function* login() {
  try {
    yield call(loginAPI)
    yield put({
      // put 은 dispatch 의 역할
      type: LOG_IN_SUCCESS
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE
    })
  }
}
function* watchLogin() {
  yield takeLatest(LOG_IN, login) // takeLatest 안에 next 가 들어있어서 LOG_IN 끝나면 알아서 login 실행하는 중단점 만들어준다.
  //  똑같은거
  //   while (true) {
  //     yield take(LOG_IN)
  //     yield put({
  //       type: LOG_IN_SUCCESS
  //     })
  //   }

  // takeLatest 와 takeEvery 의 차이 = 동시에 여러번을 했을 때 , 마지막 것만 실행하겠다.
  // 막 클릭하거나 해서 생기는 버그 막아줄 수 있다.
}

export default function* userSaga() {
  yield all([fork(watchLogin)])
}
