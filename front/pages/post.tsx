import React from "react"
import { useSelector } from "react-redux"
import { StoreState } from "../reducers"
import { NextPage } from "next"
import { Context } from "../mytypes/pagesTypes"
import { LOAD_POST_REQUEST } from "../mytypes/reducerTypes"
import Helmet from "react-helmet"

const Post: NextPage<{ id: number }> = ({ id }) => {
  const { singlePost } = useSelector((state: StoreState) => state.post)
  console.log(id)
  return singlePost ? (
    <React.Fragment>
      <Helmet
        title={`${singlePost.User?.nickname}님의 글`}
        meta={[
          {
            name: "description",
            content: singlePost.content,
          },
          {
            property: "og:title",
            content: `${singlePost.User?.nickname}님의 게시글`,
          },
          {
            property: "og:description",
            content: singlePost.content,
          },
          {
            property: "og:image",
            content: singlePost.Images![0] && `http://localhost:4539/${singlePost.Images![0].src}`,
          },
          {
            property: "og:url",
            content: `http://localhost:3060/post/${id}`,
          },
        ]}
      />
      <div>
        {singlePost.Images![0] && (
          <img src={`http://localhost:4539/${singlePost.Images![0].src}`} />
        )}
      </div>
      <div>{singlePost.Likers![0].id}</div>
    </React.Fragment>
  ) : (
    <div>
      <h1>존재하지 않는 포스트입니다.</h1>
      <h3>에러가 지속되면 운영자에게 문의 바랍니다.</h3>
    </div>
  )
}

Post.getInitialProps = async (context: Context) => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    postId: context.query.id,
  })
  return { id: parseInt(context.query.id as string, 10) }
}

export default Post
