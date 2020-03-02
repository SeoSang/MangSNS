import { ReducerAction } from "react"
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
} from "./reducerTypes"

export const initialState: UserState = {
  isLoggingIn: false,
  isLoggingOut: false,
  loginErrorReason: "",
  isSignedUp: false,
  isSigningUp: false,
  signUpErrorReason: "",
  me: null,
  userInfo: null,
}

const reducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    // 로그인
    case LOG_IN_REQUEST: {
      return {
        ...state,
        loginData: action.data,
        isLoggingIn: true,
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        me: action.data,
      }
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        me: null,
        loginErrorReason: action.error,
      }
    }
    // 로그아웃
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        me: null,
      }
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
      }
    }
    // 회원가입
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signUpErrorReason: "",
      }
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpData: action.data,
        isSigningUp: false,
        isSignedUp: true,
      }
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error,
      }
    }
    // 유저 로드
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case LOAD_USER_SUCCESS: {
      if (action.me) {
        return {
          ...state,
          me: action.data,
        }
      }
      return {
        ...state,
        userInfo: action.data,
      }
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
      }
    }
    // 팔로우와 언팔로우
    case FOLLOW_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: [{ id: action.data }, ...state.me!.Followings],
        },
      }
    }
    case FOLLOW_USER_FAILURE: {
      return {
        ...state,
      }
    }
    case UNFOLLOW_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case UNFOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: state.me!.Followings.filter(v => v.id !== action.data),
        },
      }
    }
    case UNFOLLOW_USER_FAILURE: {
      return {
        ...state,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer
