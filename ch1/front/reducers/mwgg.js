export const initialState = {
  users: [
    {
      userName: "서상혁",
      summonerNames: ["일로와서앉아봐라", "욕할거면나한테해"]
    },
    {
      userName: "임성진",
      summonerNames: ["이젠삭제란없다"]
    }
  ],
  summonerName: ""
}

export const SET_SUMMONER_NAME = "SET_SUMMONER_NAME"

export const setSummonerNameAction = summonerName => {
  return {
    type: SET_SUMMONER_NAME,
    summonerName
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMONER_NAME: {
      return {
        ...state,
        summonerName: action.summonerName
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer
