export const initialState = {
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "서상혁"
      },
      content: "첫번째 게시글",
      img: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726"
    }
  ], //화면에 보일 포스터들,
  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingPost: false // 포스터 업로드중
}

// 새로운 포스팅
export const ADD_POST_REQUEST = "ADD_POST_REQUEST"
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS"
export const ADD_POST_FAILURE = "ADD_POST_FAILURE"

// 포스트 불러오기
export const LOAD_MAIN_POST_REQUEST = "LOAD_MAIN_POST_REQUEST"
export const LOAD_MAIN_POST_SUCCESS = "LOAD_MAIN_POST_SUCCESS"
export const LOAD_MAIN_POST_FAILURE = "LOAD_MAIN_POST_FAILURE"

//
export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST"
export const LOAD_HASHTAG_POST_SUCCESS = "LOAD_HASHTAG_POST_SUCCESS"
export const LOAD_HASHTAG_POST_FAILURE = "LOAD_HASHTAG_POST_FAILURE"

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST"
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS"
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE"

export const REMOVE_IMAGE = "REMOVE_IMAGE"

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST"
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS"
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE"

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST"
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS"
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE"

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST"
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS"
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE"

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST"
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE"

export const LOAD_COMMENT_REQUEST = "LOAD_COMMENT_REQUEST"
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS"
export const LOAD_COMMENT_FAILURE = "LOAD_COMMENT_FAILURE"

export const RETWEET_REQUEST = "RETWEET_REQUEST"
export const RETWEET_SUCCESS = "RETWEET_SUCCESS"
export const RETWEET_FAILURE = "RETWEET_FAILURE"

export const addPost = {
  type: ADD_POST_REQUEST
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer
