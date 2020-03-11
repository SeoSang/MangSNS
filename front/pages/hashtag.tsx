import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LOAD_HASHTAG_POSTS_REQUEST } from "./mytypes/reducerTypes"
import PostCard from "../containers/PostCard"
import { StoreState } from "../reducers"
import { Context } from "vm"
import { NextPage } from "next"

const Hashtag: NextPage<{ tag: string }> = ({ tag }) => {
  const { mainPosts, hasMorePost } = useSelector((state: StoreState) => state.post)
  const dispatch = useDispatch()

  const onScroll = useCallback(() => {
    const lastId = mainPosts ? mainPosts[mainPosts.length - 1].id : 0
    // console.log(
    //   window.scrollY,
    //   document.documentElement.clientHeight,
    //   document.documentElement.scrollHeight,
    // )
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost)
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          lastId,
        })
    }
  }, [mainPosts.length, hasMorePost])

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [mainPosts])

  return (
    <div>
      <div>#{tag} 의 게시글들입니다.</div>
      {mainPosts.map(post => (
        <PostCard key={post.createdAt} post={post} />
      ))}
    </div>
  )
}

Hashtag.getInitialProps = async (context: Context) => {
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.query.tag,
  })
  return { tag: context.query.tag }
}

export default Hashtag
