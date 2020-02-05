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
export const LOG_OUT = "LOG_OUT" // 액션의 이름
export const SIGN_UP = "SIGN_UP" // 액션의 이름

export const loginAction = {
  type: LOG_IN
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
