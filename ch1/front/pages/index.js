import React, { useEffect, useMemo } from "react"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"
import { useDispatch, useSelector } from "react-redux"
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post"

const Home = () => {
  const dispatch = useDispatch()
  const { me, user } = useSelector(state => state.user)
  const { mainPosts } = useSelector(state => state.post)
  const newDate = useMemo(() => {
    return new Date()
  }, [])
  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    })
  }, [])
  return (
    <>
      {user ? <div>로그인했습니다. {user.nickname}</div> : <div> 로그인 해주세요</div>}
      {me && <PostForm />}
      {mainPosts.map(c => {
        console.log(c)
        return <PostCard key={`Postcard ${c.id}`} c={c} />
      })}
    </>
  )
}

export default Home
