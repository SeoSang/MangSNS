import { MwggState, MwggActionTypes } from "./reducerTypes"

export const initialState: MwggState = {
  users: [
    {
      userName: "서상혁",
      summonerNames: ["일로와서앉아봐라", "욕할거면나한테해"],
    },
    {
      userName: "임성진",
      summonerNames: ["이젠삭제란없다"],
    },
  ],
  summonerName: "",
}

export const ADD_SUMMONER_NAME = "ADD_SUMMONER_NAME"

export const addSummonerNameAction = (summonerName: string): MwggActionTypes => {
  return {
    type: ADD_SUMMONER_NAME,
    summonerName,
  }
}

const reducer = (state = initialState, action: MwggActionTypes) => {
  switch (action.type) {
    case ADD_SUMMONER_NAME: {
      return {
        ...state,
        summonerName: action.summonerName,
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer
