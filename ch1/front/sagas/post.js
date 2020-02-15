import { call, all, fork, takeLatest, delay, put } from "redux-saga/effects"
import {
  ADD_POST_SUCCESS,
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
} from "../reducers/post"
import axios from "axios"
axios.defaults.baseURL = "http://localhost:4539/api"

function addPostAPI(postData) {
  return axios.post("/post", postData, {
    withCredentials: true,
  })
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e,
    })
  }
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

// 댓글 달렸을 때
function addCommentAPI() {}
function* addComment(action) {
  // action 은 ADD_COMMENT_REQUEST 에서 옴 (dispatch에서 넣어준 데이터)
  // yield call(addPostAPI)
  yield delay(2000)
  try {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
      },
    })
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    })
  }
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

// 포스트 불러오기
function loadMainPostsAPI() {
  return axios.get("/posts")
}
function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI)
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e,
    })
  }
}
function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchLoadMainPosts)])
}
