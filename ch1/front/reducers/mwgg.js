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
  ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return { ...state }
    }
  }
}

export default reducer
