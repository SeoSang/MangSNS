import { all, fork, takeLatest, put, call, takeEvery, delay } from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  signUpFailureAction,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_SUCCESS,
  LOG_IN_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
} from "../reducers/user"
import axios from "axios"
import { useRouter } from "next/router"

axios.defaults.baseURL = "http://localhost:4539/api"

function goHome() {
  return useRouter().push("/")
}

// ----------- 로그인 -----------
function loginAPI(loginData) {
  // 서버에 요청을 보냄
  return axios.post("/user/login", loginData, {
    withCredentials: true, // 쿠키 주고받을 수 있다.
  })
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.data)
    console.log("TCL: function*login -> result", result)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    }) // put 은 dispatch
  } catch (e) {
    console.log(e)
    console.log(action.data)
    yield put({
      type: LOG_IN_FAILURE,
      error: e,
    })
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

// ----------- 로그아웃-----------

function logoutAPI() {
  return axios.post(
    "/user/logout",
    {},
    {
      withCredentials: true, // 쿠키 주고받을 수 있다.
    },
  )
}

function* logout() {
  try {
    yield call(logoutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
    yield alert("로그아웃 성공!")
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

// ----------- 회원가입 -----------
function signUpAPI(signUpData) {
  return axios.post("/user", signUpData)
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
    })
    yield alert("회원가입 성공!")
    yield call(goHome)
  } catch (e) {
    console.log("signUp ERROR : ", e)
    yield put(signUpFailureAction(e))
  }
}

function* watchSignup() {
  yield takeEvery(SIGN_UP_REQUEST, signUp)
}

// ----------- 유저 정보 로드 -----------

function loadUserAPI() {
  return axios.get("/user/", {}, { withCredentials: true })
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI)
    console.log("TCL: function*loadUser -> result", result)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    })
    yield console.log("put 성공 , result = ", result)
  } catch (e) {
    yield console.log("loadUser ERROR : ", e)
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    })
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser)
}

// ----------- 총괄 -----------

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignup), fork(watchLogout), fork(watchLoadUser)]) // fork 는 비동기호출
  //  call(watchLogin) 얘도 함수 실행   (동기호출)  응답 올때까지 기다린다.
  // watchLogin() 이렇게 해도 됨.
}
