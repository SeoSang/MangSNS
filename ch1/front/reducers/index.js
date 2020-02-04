// 하위 리듀서들 하나로 묶어주는 index

import { combineReducers } from "redux"
import user from "./user"
import post from "./post"

const rootReducer = combineReducers({
  user,
  post
})

export default rootReducer
