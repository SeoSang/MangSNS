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
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  RETWEET_REQUEST,
  RETWEET_FAILURE,
  RETWEET_SUCCESS,
} from "../reducers/reducerTypes"
import axios from "axios"
axios.defaults.baseURL = "http://localhost:4539/api"

function addPostAPI(formData) {
  return axios.post("/post", formData, {
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
function addCommentAPI(data) {
  return axios.post(
    `/post/${data.postId}/comment`,
    { content: data.content },
    { withCredentials: true },
  )
}
function* addComment(action) {
  const result = yield call(addCommentAPI, action.data)
  yield delay(2000)
  try {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data,
      },
    })
  } catch (e) {
    console.error(e)
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

// 특정 포스트 불러오기
function loadUserPostsAPI(id) {
  return axios.get(`/user/${id}/posts`)
}
function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data)
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e,
    })
  }
}
function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

function loadCommentsAPI(postId) {
  return axios.get(`/post/${postId}/comments`)
}
function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data)
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data,
        comments: result.data,
      },
    })
  } catch (e) {
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e,
    })
  }
}
function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments)
}

// 해쉬태그 포스트 불러오기
function loadHashtagPostsAPI(tag) {
  return axios.get(`/hashtag/${tag}`)
}
function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data)
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e,
    })
  }
}
function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

// 이미지 업로드
function uploadImagesAPI(formData) {
  return axios.post(`/post/images`, formData, { withCredentials: true })
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data)
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data, // image 주소
    })
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    })
  }
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`, { withCredentials: true })
}
function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data)
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        userId: result.data.userId,
        postId: action.data,
      },
    })
  } catch (e) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e,
    })
  }
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

function likePostAPI(postId) {
  return axios.post(`/post/${postId}/like`, postId, { withCredentials: true })
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data)
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        userId: result.data.userId,
        postId: action.data,
      },
    })
  } catch (e) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: e,
    })
  }
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost)
}

function retweetAPI(postId) {
  return axios.post(`/post/${postId}/retweet`, {}, { withCredentials: true }) // post 요청때에는 데이터 없어도 무언가 보내야댐
}
function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data)
    console.log("__sagas__post.js__result.data => ", result.data)
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: RETWEET_FAILURE,
      error: e,
    })
    alert(e.response.data && e.response.data)
  }
}
function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadMainPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadComments),
    fork(watchUploadImages),
    fork(watchUnlikePost),
    fork(watchLikePost),
    fork(watchRetweet),
  ])
}
