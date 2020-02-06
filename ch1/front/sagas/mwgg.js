import { takeEvery, put, call } from "redux-saga/effects"

const GET_SUMMONER = "GET_SUMMONER"

export function* getSummoner(actions) {
  const { summonerName } = actions
  yield put(getSummonerRequest())
  try {
    const summonerInfo = yield call(getSummonerInfo, summonerName)
    yield put(getSummonerSuccess(summonerInfo.data))
  } catch (error) {
    console.log("error:", error)
    yield put(getSummonerFailure(error))
  }
}

export function* watchgetSummonerInfo() {
  yield takeEvery(GET_SUMMONER, getSummoner)
}
