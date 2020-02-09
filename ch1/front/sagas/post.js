import { call, all, fork, takeLatest, delay, put } from "redux-saga/effects"
import {
  ADD_POST_SUCCESS,
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST
} from "../reducers/post"

function* addPostAPI() {}
function* addPost() {
  // yield call(addPostAPI)
  yield delay(2000)
  try {
    yield put({
      type: ADD_POST_SUCCESS
    })
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e
    })
  }
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

// 댓글 달렸을 때
function* addCommentAPI() {}
function* addComment(action) {
  // action 은 ADD_COMMENT_REQUEST 에서 옴 (dispatch에서 넣어준 데이터)
  // yield call(addPostAPI)
  yield delay(2000)
  try {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId
      }
    })
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e
    })
  }
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)])
}
