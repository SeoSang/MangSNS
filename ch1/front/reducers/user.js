const dummyUser = {
  nickname: "서상혁",
  Posts: [],
  Followings: [],
  Followers: []
}

export const initialState = {
  isLogin: false,
  user: null
}

export const LOG_IN = "LOG_IN" // 액션의 이름
export const LOG_OUT = "LOG_OUT" // 액션의 이름

export const loginAction = {
  type: LOG_IN
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
    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer
