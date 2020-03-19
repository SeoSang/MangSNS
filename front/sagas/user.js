import { all, fork, takeLatest, put, call, takeEvery, delay } from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_SUCCESS,
  LOG_IN_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
  SIGN_UP_FAILURE,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_SUCCESS,
  REMOVE_FOLLOWER_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
} from "../mytypes/reducerTypes"
import Router from "next/router"
import axios from "axios"
import { backURL } from "../config/config"

axios.defaults.baseURL = `${backURL}/api`

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
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    }) // put 은 dispatch
  } catch (e) {
    console.error("e =>", e)
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
    })
    alert(e.response.data)
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
    yield call(Router.push, "/")
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
  } catch (e) {
    console.log("signUp ERROR : ", e)
    yield alert("회원가입 실패")
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    })
  }
}

function* watchSignup() {
  yield takeEvery(SIGN_UP_REQUEST, signUp)
}

// ----------- 유저 정보 로드 -----------

function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : "/user/", { withCredentials: true })
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    })
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    })
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser)
}

// 팔로우와 언팔로우

function followUserAPI(userId) {
  return axios.post(`/user/${userId}/follow`, {}, { withCredentials: true })
}

function* followUser(action) {
  try {
    const result = yield call(followUserAPI, action.data)
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e,
    })
  }
}

function* watchFollowUser() {
  yield takeEvery(FOLLOW_USER_REQUEST, followUser)
}
function unfollowUserAPI(userId) {
  return axios.delete(`/user/${userId}/unfollow`, { withCredentials: true })
}

function* unfollowUser(action) {
  try {
    const result = yield call(unfollowUserAPI, action.data)
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e,
    })
  }
}
function* watchUnfollowUser() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollowUser)
}

// 팔로우 관련
function loadFollowersAPI(userId = 0, offset = 0, limit = 3) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, {
    withCredentials: true,
  })
}

function* loadFollowers(action) {
  try {
    // yield call(loadFollowersAPI);
    const result = yield call(loadFollowersAPI, action.data, action.offset)
    yield put({
      // put은 dispatch 동일
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    // loginAPI 실패
    console.error(e)
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e,
    })
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers)
}

function loadFollowingsAPI(userId = 0, offset = 0, limit = 3) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, {
    withCredentials: true,
  })
}

function* loadFollowings(action) {
  try {
    // yield call(loadFollowersAPI);
    const result = yield call(loadFollowingsAPI, action.data, action.offset)
    yield put({
      // put은 dispatch 동일
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    // loginAPI 실패
    console.error(e)
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e,
    })
  }
}

function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings)
}

function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`, {
    withCredentials: true,
  })
}

function* removeFollower(action) {
  try {
    // yield call(loadFollowersAPI);
    const result = yield call(removeFollowerAPI, action.data)
    yield put({
      // put은 dispatch 동일
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    // loginAPI 실패
    console.error(e)
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e,
    })
  }
}

function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower)
}

function editNicknameAPI(nickname) {
  return axios.patch(`/user/nickname`, { nickname }, { withCredentials: true }) // post 요청때에는 데이터 없어도 무언가 보내야댐
}
function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data)
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e,
    })
  }
}
function* watchEditNickname() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname)
}

// ----------- 총괄 -----------

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchFollowUser),
    fork(watchUnfollowUser),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]) // fork 는 비동기호출
  //  call(watchLogin) 얘도 함수 실행   (동기호출)  응답 올때까지 기다린다.
  // watchLogin() 이렇게 해도 됨.
}
