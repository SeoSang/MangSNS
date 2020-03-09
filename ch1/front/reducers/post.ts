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
} from "../pages/mytypes/reducerTypes"

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
}

const reducer = (state = initialState, action: PostActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        draft.isAddingPost = true
        draft.addPostErrorReason = ""
        draft.postAdded = false
      }
      case ADD_POST_SUCCESS: {
        draft.isAddingPost = false
        draft.mainPosts.push(action.data)
        return {
          ...state,
          isAddingPost: false,
          mainPosts: [action.data, ...state.mainPosts],
          postAdded: true,
          imagePaths: [],
        }
      }
      case ADD_POST_FAILURE: {
        return {
          ...state,
          isAddingPost: false,
          addPostErrorReason: action.error,
        }
      }
      case REMOVE_POST_SUCCESS: {
        return {
          ...state,
          mainPosts: state.mainPosts.filter(v => v.id !== action.data),
        }
      }
      case LIKE_POST_REQUEST: {
        break
      }
      case LIKE_POST_SUCCESS: {
        const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
        const post = state.mainPosts[postIndex]
        const Likers = [{ id: action.data.userId }, ...post.Likers!]
        const mainPosts = [...state.mainPosts]
        mainPosts[postIndex] = { ...post, Likers }
        return {
          ...state,
          mainPosts,
        }
      }
      case LIKE_POST_FAILURE: {
        return {
          ...state,
          likeErrorReason: action.error,
        }
      }
      case UNLIKE_POST_REQUEST: {
        break
      }
      case UNLIKE_POST_SUCCESS: {
        const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
        const post = state.mainPosts[postIndex]
        const Likers = post.Likers ? post.Likers.filter(v => v.id !== action.data.userId) : []
        const mainPosts = [...state.mainPosts]
        mainPosts[postIndex] = { ...post, Likers }
        return {
          ...state,
          mainPosts,
        }
      }
      case UNLIKE_POST_FAILURE: {
        return {
          ...state,
          unlikeErrorReason: action.error,
        }
      }
      case RETWEET_REQUEST: {
        break
      }
      case RETWEET_SUCCESS: {
        return {
          ...state,
          mainPosts: [action.data, ...state.mainPosts],
        }
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
        return {
          ...state,
          mainPosts: [],
        }
      }
      // 포스트 불러오기
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS: {
        return {
          ...state,
          mainPosts: action.data,
        }
      }
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_MAIN_POSTS_FAILURE: {
        break
      }
      case ADD_COMMENT_REQUEST: {
        return {
          ...state,
          isAddingComment: true,
          addCommentErrorReason: "",
          commentAdded: false,
        }
      }
      case ADD_COMMENT_SUCCESS: {
        const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
        const post = state.mainPosts[postIndex]
        console.log("------reducers__post.ts / action.data => ", action.data)
        console.log("------reducers__post.ts / post.Comments => ", post.Comments)
        const Comments = post.Comments
          ? [...post.Comments, action.data.comment]
          : [action.data.comment]
        const mainPosts = [...state.mainPosts]
        mainPosts[postIndex] = { ...post, Comments }
        return {
          ...state,
          isAddingComment: false,
          mainPosts,
          commentAdded: true,
        }
      }
      case ADD_COMMENT_FAILURE: {
        return {
          ...state,
          isAddingComment: false,
          addCommentErrorReason: action.error,
          commentAdded: false,
        }
      }
      case LOAD_COMMENTS_SUCCESS: {
        const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
        const post = state.mainPosts[postIndex]
        const Comments = action.data.comments
        const mainPosts = [...state.mainPosts]
        mainPosts[postIndex] = { ...post, Comments }
        console.log("----reducers__post.ts / mainPosts[postIndex] => ", mainPosts[postIndex])
        return {
          ...state,
          mainPosts,
        }
      }
      case REMOVE_IMAGE: {
        draft.imagePaths = state.imagePaths.filter((v, i) => i !== action.index)
      }

      default: {
        break
      }
    }
  })
}

export default reducer
