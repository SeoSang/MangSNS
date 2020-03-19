import { all, call } from "redux-saga/effects"
import axios from "axios"
import user from "./user"
import post from "./post"
import { watchgetSummonerInfo } from "./mwgg"
import { backURL } from "../config/config"

axios.defaults.baseURL = `${backURL}/api`

export default function* rootSaga() {
  yield all([call(user), call(post), call(watchgetSummonerInfo)])
}
