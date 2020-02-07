const dummyUser = {
  nickname: "서상혁",
  Posts: [],
  Followings: [],
  Followers: [],
  signUpData: {}
}

export const initialState = {
  isLogin: false,
  isLoggingIn: false,
  isLoggingOut: false,
  loginErrorReason: "",
  signedUp: false,
  isSigningUp: false,
  signUpErrorReason: "",
  me: null,
  followingList: [],
  followerList: [],
  userInfo: null
}

// ------------- 비동기 액션들 -----------------

// 로그인
export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

// 로그아웃
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

// 유저정보 불러오기
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST"
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS"
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE"

// 팔로우 불러오기
export const LOAD_FOLLOW_REQUEST = "LOAD_FOLLOW_REQUEST"
export const LOAD_FOLLOW_SUCCESS = "LOAD_FOLLOW_SUCCESS"
export const LOAD_FOLLOW_FAILURE = "LOAD_FOLLOW_FAILURE"

// 팔로우 신청
export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST"
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS"
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE"

// 언팔로우 신청
export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST"
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS"
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE"

// 팔로워 삭제
export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST"
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS"
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE"

// 회원가입
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

export const ADD_POST_TO_ME = "ADD_POST_TO_ME"

export const loginRequestAction = {
  type: LOG_IN_REQUEST
}
export const loginSuccessAction = {
  type: LOG_IN_SUCCESS
}
export const loginFailureAction = {
  type: LOG_IN_FAILURE
}
export const logoutRequestAction = {
  type: LOG_OUT_REQUEST
}
export const signUpRequestAction = data => {
  return {
    type: SIGN_UP_REQUEST,
    data
  }
}
export const signUpSuccessAction = data => {
  return {
    type: SIGN_UP_SUCCESS
  }
}
export const signUpFailureAction = data => {
  return {
    type: SIGN_UP_SUCCESS
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 로그인
    case LOG_IN_REQUEST: {
      return {
        ...state,
        loginData: action.data,
        isLoggingIn: true
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        isLoggingIn: false,
        me: dummyUser
      }
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLogin: false,
        isLoggingIn: false,
        me: null,
        loginErrorReason: action.error
      }
    }
    // 로그아웃
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        isLogin: false,
        me: null
      }
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
        isLogin: false,
        me: null
      }
    }

    // 회원가입
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true
      }
    }
    case SIGN_UP_SUCCESS: {
      console.log("I got DATA")
      console.table(action.data)
      return {
        ...state,
        signUpData: action.data,
        isSigningUp: false
      }
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer
