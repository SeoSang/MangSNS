import { all, fork, takeLatest, put, call, takeEvery, delay } from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  SIGN_UP_REQUEST,
  signUpFailureAction,
  signUpSuccessAction,
  loginSuccessAction,
  loginFailureAction,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from "../reducers/user"
import axios from "axios"

function loginAPI() {
  // 서버에 요청을 보냄
  // return axios.post("/login")
}
function* login() {
  try {
    // yield call(loginAPI) 아직 동작안함
    yield delay(2000)
    yield put(loginSuccessAction) // put 은 dispatch
  } catch (e) {
    console.error(e)
    yield put(loginFailureAction)
  }
}
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
  // takeLatest 안에 next 가 들어있어서 LOG_IN 끝나면 알아서 login 실행하는 중단점 만들어준다.

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

function* logoutAPI() {}

function* logout() {
  try {
    // yield call(logoutAPI)
    yield delay(200)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    })
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout)
}

function* signUpAPI() {}

function* signUp() {
  try {
    // yield call(signUpAPI)
    yield delay(2000)
    yield put(signUpSuccessAction)
  } catch (e) {
    console.log("signUp ERROR : ", e)
    yield put(signUpFailureAction(e))
  }
}

function* watchSignup() {
  yield takeEvery(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignup), fork(watchLogout)]) // fork 는 비동기호출
  //  call(watchLogin) 얘도 함수 실행   (동기호출)  응답 올때까지 기다린다.
  // watchLogin() 이렇게 해도 됨.
}
