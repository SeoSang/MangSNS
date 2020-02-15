import React, { useEffect, useMemo } from "react"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"
import { useDispatch, useSelector } from "react-redux"
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post"

const Home = () => {
  const dispatch = useDispatch()
  const { me } = useSelector(state => state.user)
  const { mainPosts } = useSelector(state => state.post)

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    })
  }, [])

  return (
    <>
      {me ? <div>안녕하세요 {me.nickname} 님</div> : <div> 로그인 해주세요</div>}
      {me && <PostForm />}
      {mainPosts.map(c => {
        console.log("TCL: Home -> mainPosts", mainPosts)
        return <PostCard key={`Postcard ${c}`} c={c} />
      })}
    </>
  )
}

export default Home
