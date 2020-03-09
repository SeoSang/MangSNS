import React from "react"
import { useSelector } from "react-redux"
import { StoreState } from "../reducers"
import { NextPage } from "next"
import { Context } from "./mytypes/pagesTypes"
import { LOAD_POST_REQUEST } from "./mytypes/reducerTypes"

const Post: NextPage<{ id: number }> = ({ id }) => {
  const { singlePost } = useSelector((state: StoreState) => state.post)

  return singlePost ? (
    <React.Fragment>
      <div>{singlePost.content}</div>
      <div>{singlePost.User?.nickname}</div>
      <div>
        {singlePost.Images![0]} &&{" "}
        <img src={`http://localhost:4539/${singlePost.Images![0].src}`} />
      </div>
      <div>{singlePost.content}</div>
    </React.Fragment>
  ) : (
    <div>에러 발생</div>
  )
}

Post.getInitialProps = async (context: Context) => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id,
  })
  return { id: parseInt(context.query.id as string, 10) }
}

export default Post
