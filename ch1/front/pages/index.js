import React, { useEffect } from "react"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  const dispatch = useDispatch()
  const { isLogin, user } = useSelector(state => state.user)
  const { mainPosts } = useSelector(state => state.post)
  return (
    <>
      {user ? <div>로그인했습니다. {user.nickname}</div> : <div> 로그인 해주세요</div>}
      {isLogin && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={`Postcard ${c}`} c={c} />
      })}
    </>
  )
}

export default Home
