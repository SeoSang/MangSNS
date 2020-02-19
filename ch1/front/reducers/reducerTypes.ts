// ---------------- User ----------------

// 로그인
export const LOG_IN_REQUEST = "LOG_IN_REQUEST" as const
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS" as const
export const LOG_IN_FAILURE = "LOG_IN_FAILURE" as const

// 로그아웃
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST" as const
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS" as const
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE" as const

// 유저정보 불러오기
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST" as const
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS" as const
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE" as const

// 팔로우 불러오기
export const LOAD_FOLLOW_REQUEST = "LOAD_FOLLOW_REQUEST" as const
export const LOAD_FOLLOW_SUCCESS = "LOAD_FOLLOW_SUCCESS" as const
export const LOAD_FOLLOW_FAILURE = "LOAD_FOLLOW_FAILURE" as const

// 팔로우 신청
export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST" as const
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS" as const
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE" as const

// 언팔로우 신청
export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST" as const
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS" as const
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE" as const

// 팔로워 삭제
export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST" as const
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS" as const
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE" as const

// 회원가입
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST" as const
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS" as const
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE" as const

export const ADD_POST_TO_ME = "ADD_POST_TO_ME" as const

export interface UserState {
  isLoggingIn: boolean
  isLoggingOut: boolean
  loginErrorReason: string | null
  isSignedUp: boolean
  isSigningUp: boolean
  signUpErrorReason: string | null
  // TODO : any 없애기
  me: {
    id: number
    nickname: string
    email: string
    phone: string
    residence: string
    createdAt: string
    updatedAt: string
    Posts: { id: number }[]
    Followings: any[]
    Followers: any[]
  } | null
}

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST
  // TODO : any
  data: any
}
export interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS
  data: any
}
export interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE
  error?: string
}
export interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST
}
export interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS
}
export interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE
  error?: string
}
export interface LoadUserRequestAction {
  type: typeof LOAD_USER_REQUEST
}
export interface LoadUserSuccessAction {
  type: typeof LOAD_USER_SUCCESS
  data: any
}
export interface LoadUserFailureAction {
  type: typeof LOAD_USER_FAILURE
  error?: string
}
export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST
  data: any
}
export interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS
  data: any
}
export interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE
  error?: string
}

export type UserActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | LoadUserRequestAction
  | LoadUserFailureAction
  | LoadUserSuccessAction
  | SignUpRequestAction
  | SignUpSuccessAction
  | SignUpFailureAction

// ---------------- Post ----------------

export interface PostState {
  // TODO
  mainPosts: Array<MainPost>
  imagePaths: string[]
  addPostErrorReason: string | null
  isAddingPost: boolean
  postAdded: boolean
  isAddingComment: boolean
  addCommentErrorReason: string | null
  commentAdded: boolean
}

export interface MainPost {
  id: number
  User?: { id: number; nickname: string }
  content: string
  Comments?: string[]
  img?: string
}

export const ADD_POST_REQUEST = "ADD_POST_REQUEST" as const
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS" as const
export const ADD_POST_FAILURE = "ADD_POST_FAILURE" as const

// 포스트 불러오기
export const LOAD_MAIN_POSTS_REQUEST = "LOAD_MAIN_POSTS_REQUEST" as const
export const LOAD_MAIN_POSTS_SUCCESS = "LOAD_MAIN_POSTS_SUCCESS" as const
export const LOAD_MAIN_POSTS_FAILURE = "LOAD_MAIN_POSTS_FAILURE" as const

//
export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST" as const
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS" as const
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE" as const

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST" as const
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS" as const
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE" as const

export const REMOVE_IMAGE = "REMOVE_IMAGE" as const

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST" as const
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS" as const
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE" as const

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST" as const
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS" as const
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE" as const

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST" as const
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS" as const
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE" as const

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST" as const
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS" as const
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE" as const

export const LOAD_COMMENT_REQUEST = "LOAD_COMMENT_REQUEST" as const
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS" as const
export const LOAD_COMMENT_FAILURE = "LOAD_COMMENT_FAILURE" as const

export const RETWEET_REQUEST = "RETWEET_REQUEST" as const
export const RETWEET_SUCCESS = "RETWEET_SUCCESS" as const
export const RETWEET_FAILURE = "RETWEET_FAILURE" as const

export interface AddPostRequestAction {
  type: typeof ADD_POST_REQUEST
}
export interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS
  data: any
}
export interface AddPostFailureAction {
  type: typeof ADD_POST_FAILURE
  error?: any
}
export interface LoadMainPostsRequestAction {
  type: typeof LOAD_MAIN_POSTS_REQUEST
}
export interface LoadMainPostsSuccessAction {
  type: typeof LOAD_MAIN_POSTS_SUCCESS
  data: any
}
export interface LoadMainPostsFailureAction {
  type: typeof LOAD_MAIN_POSTS_FAILURE
  error?: any
}
export interface AddCommentRequestAction {
  type: typeof ADD_COMMENT_REQUEST
}
export interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS
  data: any
}
export interface AddCommentFailureAction {
  type: typeof ADD_COMMENT_FAILURE
  error?: any
}

export type PostActionTypes =
  | AddPostRequestAction
  | AddPostSuccessAction
  | AddPostFailureAction
  | LoadMainPostsRequestAction
  | LoadMainPostsSuccessAction
  | LoadMainPostsFailureAction
  | AddCommentRequestAction
  | AddCommentSuccessAction
  | AddCommentFailureAction

// ------------ mwgg ------------

export interface MwggState {
  users: MwggUserInfo[]
  summonerName: string | null
}

export interface MwggUserInfo {
  userName: string
  summonerNames: [] | string[]
}

export const ADD_SUMMONER_NAME = "ADD_SUMMONER_NAME" as const

export interface AddSummonerNameAction {
  type: typeof ADD_SUMMONER_NAME
  summonerName: string
}

export type MwggActionTypes = AddSummonerNameAction
