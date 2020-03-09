import {
  UserState,
  UserActionTypes,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  ADD_POST_TO_ME,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_FAILURE,
  REMOVE_POST_OF_ME,
} from "../pages/mytypes/reducerTypes"
import produce from "immer"

export const initialState: UserState = {
  isLoggingIn: false,
  isLoggingOut: false,
  loginErrorReason: "",
  isSignedUp: false,
  isSigningUp: false,
  signUpErrorReason: "",
  me: null,
  userInfo: null,
  followerList: [],
  followingList: [],
  isEditingNickname: false,
  hasMoreFollower: false,
  hasMoreFollowing: false,
}

const reducer = (state = initialState, action: UserActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      // 로그인
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true
        break
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false
        draft.me = action.data
        break
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false
        draft.me = null
        draft.loginErrorReason = action.error
        break
      }
      // 로그아웃
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true
        break
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false
        draft.me = null
        draft.followerList = []
        draft.followingList = []
        draft.userInfo = null
        break
      }
      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false
        break
      }
      // 회원가입
      case SIGN_UP_REQUEST: {
        draft.isSigningUp = true
        draft.signUpErrorReason = ""
        break
      }
      case SIGN_UP_SUCCESS: {
        draft.isSignedUp = false
        draft.isSignedUp = true
        break
      }
      case SIGN_UP_FAILURE: {
        draft.isSignedUp = false
        draft.signUpErrorReason = action.error
        break
      }
      // 유저 로드
      case LOAD_USER_REQUEST: {
        break
      }
      case LOAD_USER_SUCCESS: {
        if (action.me) {
          draft.me = action.data
        } else {
          draft.userInfo = action.data
        }
        break
      }
      case LOAD_USER_FAILURE: {
        break
      }
      // 팔로우와 언팔로우
      case FOLLOW_USER_REQUEST: {
        break
      }
      case FOLLOW_USER_SUCCESS: {
        draft.me?.Followings.unshift({ id: action.data })
        break
      }
      case FOLLOW_USER_FAILURE: {
        break
      }
      case UNFOLLOW_USER_REQUEST: {
        break
      }
      case UNFOLLOW_USER_SUCCESS: {
        draft.me!.Followings = draft.me!.Followings!.filter(v => v.id !== action.data)
        draft.followingList = draft.followerList.filter(v => v.id !== action.data)
        break
      }
      case UNFOLLOW_USER_FAILURE: {
        break
      }
      case LOAD_FOLLOWERS_REQUEST: {
        draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true
        break
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        draft.followerList = draft.followerList.concat(action.data)
        break
      }
      case LOAD_FOLLOWERS_FAILURE: {
        break
      }
      case LOAD_FOLLOWINGS_REQUEST: {
        draft.hasMoreFollowing = action.offset ? state.hasMoreFollowing : true
        break
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        draft.followingList = draft.followingList.concat(action.data)
        draft.hasMoreFollowing = action.data.length === 3
        break
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        break
      }
      case REMOVE_FOLLOWER_REQUEST: {
        break
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        draft.me!.Followers = draft.me!.Followers!.filter(v => v.id !== action.data)
        draft.followerList = draft.followerList.filter(v => v.id !== action.data)
        break
      }
      case REMOVE_FOLLOWER_FAILURE: {
        break
      }
      case EDIT_NICKNAME_REQUEST: {
        draft.isEditingNickname = true
        break
      }
      case EDIT_NICKNAME_SUCCESS: {
        draft.isEditingNickname = false
        if (draft.me) draft.me.nickname = action.data
        break
      }
      case EDIT_NICKNAME_FAILURE: {
        draft.isEditingNickname = false
        break
      }
      case ADD_POST_TO_ME: {
        draft.me?.Posts.unshift({ id: action.data })
        break
      }
      case REMOVE_POST_OF_ME: {
        draft.me!.Posts = draft.me!.Posts!.filter(v => v.id !== action.data)
        break
      }
      default: {
        break
      }
    }
  })
}

export default reducer
