import {
  MainPost,
  PostState,
  PostActionTypes,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_IMAGE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
} from "../mytypes/reducerTypes"

import produce from "immer"

export const initialState: PostState = {
  mainPosts: [],
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: "", // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  isAddingComment: false,
  addCommentErrorReason: "",
  commentAdded: false,
  likeErrorReason: "",
  unlikeErrorReason: "",
  hasMorePost: true,
  singlePost: null,
}

const reducer = (state = initialState, action: PostActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        draft.isAddingPost = true
        draft.addPostErrorReason = ""
        draft.postAdded = false
        break
      }
      case ADD_POST_SUCCESS: {
        draft.isAddingPost = false
        draft.mainPosts.unshift(action.data)
        draft.postAdded = true
        draft.imagePaths = []
        break
      }
      case ADD_POST_FAILURE: {
        draft.isAddingPost = false
        draft.addPostErrorReason = action.error
        break
      }
      case REMOVE_POST_SUCCESS: {
        draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data)
        break
      }
      case LIKE_POST_REQUEST: {
        break
      }
      case LIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId)
        draft.mainPosts[postIndex].Likers?.unshift({ id: action.data.userId })
        break
      }
      case LIKE_POST_FAILURE: {
        draft.likeErrorReason = action.error
        break
      }
      case UNLIKE_POST_REQUEST: {
        break
      }
      case UNLIKE_POST_SUCCESS: {
        const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
        draft.mainPosts[postIndex].Likers = draft.mainPosts[postIndex].Likers?.filter(
          v => v.id !== action.data.userId,
        )
        break
      }
      case UNLIKE_POST_FAILURE: {
        draft.unlikeErrorReason = action.error
        break
      }
      case RETWEET_REQUEST: {
        break
      }
      case RETWEET_SUCCESS: {
        draft.mainPosts.unshift(action.data)
        break
      }
      case RETWEET_FAILURE: {
        break
      }
      case UPLOAD_IMAGES_REQUEST: {
        break
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data.forEach(imgPath => {
          draft.imagePaths.push(imgPath)
        })
      }
      case UPLOAD_IMAGES_FAILURE: {
        break
      }
      // 포스트 불러오기
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_MAIN_POSTS_REQUEST: {
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts
        draft.hasMorePost = action.lastId ? draft.hasMorePost : true
        break
      }
      // 포스트 불러오기
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS: {
        action.data.forEach(post => {
          draft.mainPosts.push(post)
        })
        draft.hasMorePost = action.data.length == 10
        break
      }
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_MAIN_POSTS_FAILURE: {
        break
      }
      case ADD_COMMENT_REQUEST: {
        draft.isAddingComment = true
        draft.addCommentErrorReason = ""
        draft.commentAdded = false
        break
      }
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId)
        draft.mainPosts[postIndex].Comments.push(action.data.comment)
        draft.isAddingComment = false
        draft.commentAdded = true
        break
      }
      case ADD_COMMENT_FAILURE: {
        draft.isAddingComment = false
        draft.addCommentErrorReason = action.error
        draft.commentAdded = false
        break
      }
      case LOAD_COMMENTS_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId)
        draft.mainPosts[postIndex].Comments = action.data.comments
        break
      }
      case REMOVE_IMAGE: {
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.index)
        break
      }

      case LOAD_POST_SUCCESS: {
        draft.singlePost = action.data
        break
      }

      default: {
        break
      }
    }
  })
}

export default reducer
