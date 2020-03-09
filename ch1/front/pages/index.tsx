import React, { useEffect, useMemo, useCallback, useRef } from "react"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"
import { useSelector, useDispatch } from "react-redux"
import { LOAD_MAIN_POSTS_REQUEST } from "./mytypes/reducerTypes"
import { StoreState } from "../reducers"
import { Context } from "./mytypes/pagesTypes"

const Home = () => {
  const { me } = useSelector((state: StoreState) => state.user)
  const { mainPosts, hasMorePost } = useSelector((state: StoreState) => state.post)
  const countRef = useRef<number[]>([])
  const dispatch = useDispatch()
  const onScroll = useCallback(() => {
    // console.log(
    //   window.scrollY,
    //   document.documentElement.clientHeight,
    //   document.documentElement.scrollHeight,
    // )
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        console.log("hasMorePost => ", hasMorePost)
        const lastId = mainPosts ? mainPosts[mainPosts.length - 1].id : 0
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId: lastId,
          })
        }
        countRef.current.push(lastId)
      }
    }
  }, [mainPosts.length, hasMorePost])

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [mainPosts])

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
