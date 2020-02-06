const dummyUser = {
  nickname: "서상혁",
  Posts: [],
  Followings: [],
  Followers: [],
  signUpData: {}
}

export const initialState = {
  isLogin: false,
  user: null
}

export const LOG_IN = "LOG_IN" // 액션의 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS" // 액션의 이름
export const LOG_IN_FAILURE = "LOG_IN_FAILURE" // 액션의 이름
export const LOG_OUT = "LOG_OUT" // 액션의 이름
export const SIGN_UP = "SIGN_UP" // 액션의 이름
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS" // 액션의 이름

export const loginAction = {
  type: LOG_IN
}
export const loginSuccessAction = {
  type: LOG_IN_SUCCESS
}
export const loginFailureAction = {
  type: LOG_IN_FAILURE
}
export const logoutAction = {
  type: LOG_OUT
}
export const signUpAction = data => {
  return {
    type: SIGN_UP,
    data: data
  }
}
export const signUpSuccessAction = data => {
  return {
    type: SIGN_UP_SUCCESS
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLogin: true,
        user: dummyUser
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isLogin: false,
        user: null
      }
    }
    case SIGN_UP: {
      console.log("I got DATA")
      console.table(action.data)
      return {
        ...state,
        signUpData: action.data
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
