// 하위 리듀서들 하나로 묶어주는 index

import { combineReducers } from "redux"
import user from "./user"
import post from "./post"
import mwgg from "./mwgg"
import { UserState, PostState, MwggState } from "../mytypes/reducerTypes"

export interface StoreState {
  user: UserState
  post: PostState
  mwgg: MwggState
}

const rootReducer = combineReducers<StoreState>({
  user,
  post,
  mwgg,
})

export default rootReducer
