export const initialState = {
  isLogin: false,
  user: {}
}

const LOG_IN = "LOG_IN" // 액션의 이름
const LOG_OUT = "LOG_OUT" // 액션의 이름

export const loginAction = {
  type: LOG_IN,
  data: {
    nickname: "제로초"
  }
}

export const logoutAction = {
  type: LOG_OUT
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLogin: true,
        user: action.data
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isLogin: false,
        use: null
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
