import { call, all, fork, takeLatest, delay, put, throttle } from "redux-saga/effects"
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
  ADD_POST_TO_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
} from "../mytypes/reducerTypes"
import axios from "axios"
import { backURL } from "../config/config"

axios.defaults.baseURL = `${backURL}/api`

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
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
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

function removePostAPI(postId) {
  return axios.delete(`/post/${postId}/removePost`, {
    withCredentials: true,
  })
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    })
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e,
    })
  }
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
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

// 개별 포스트 불러오기
function loadPostAPI(postId) {
  return axios.get(`/post/${postId}`, { withCredentials: true })
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.postId)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_POST_FAILURE,
      error: e,
    })
  }
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

// 포스트 불러오기
function loadMainPostsAPI(lastId = 0, limit = 10) {
  return axios.get(`/posts?lastId=${lastId}&limit=${limit}`)
}
function* loadMainPosts(action) {
  try {
    const result = yield call(loadMainPostsAPI, action.lastId)
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
  yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

// 특정 포스트 불러오기
function loadUserPostsAPI(id = 0) {
  return axios.get(`/user/${id || 0}/posts`)
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
function loadHashtagPostsAPI(tag, lastId) {
  return axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=10`)
}
function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId)
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
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLoadPost),
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
