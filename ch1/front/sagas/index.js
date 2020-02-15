import { all, call } from "redux-saga/effects"
import axios from "axios"
import user from "./user"
import post from "./post"
import { watchgetSummonerInfo } from "./mwgg"

axios.defaults.baseURL = "http://localhost:4539/api"

export default function* rootSaga() {
  yield all([call(user), call(post), call(watchgetSummonerInfo)])
}
