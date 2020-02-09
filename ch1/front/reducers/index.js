// 하위 리듀서들 하나로 묶어주는 index

import { combineReducers } from "redux"
import user from "./user"
import post from "./post"
import mwgg from "./mwgg"

const rootReducer = combineReducers({
  user,
  post,
  mwgg
})

export default rootReducer
