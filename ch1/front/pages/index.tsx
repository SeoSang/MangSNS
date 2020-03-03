import React, { useEffect, useMemo } from "react"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"
import { useSelector } from "react-redux"
import { LOAD_MAIN_POSTS_REQUEST } from "./mytypes/reducerTypes"
import { StoreState } from "../reducers"
import { Context } from "./mytypes/pagesTypes"

const Home = () => {
  const { me } = useSelector((state: StoreState) => state.user)
  const { mainPosts } = useSelector((state: StoreState) => state.post)

  return (
    <>
      {me ? <div>안녕하세요 {me.nickname} 님</div> : <div> 로그인 해주세요</div>}
      {me && <PostForm />}
      {mainPosts.map(post => {
        return <PostCard key={`Postcard ${post.createdAt}`} post={post} />
      })}
    </>
  )
}

Home.getInitialProps = async (context: Context) => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  })
}

export default Home
