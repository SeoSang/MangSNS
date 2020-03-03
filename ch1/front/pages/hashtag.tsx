import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { LOAD_HASHTAG_POSTS_REQUEST } from "./mytypes/reducerTypes"
import PostCard from "../components/PostCard"
import { StoreState } from "../reducers"
import { Context } from "vm"

const Hashtag = ({ tag }) => {
  const { mainPosts } = useSelector((state: StoreState) => state.post)
  return (
    <div>
      {mainPosts.map(post => (
        <PostCard key={post.createdAt} post={post} />
      ))}
    </div>
  )
}

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
}

Hashtag.getInitialProps = async (context: Context) => {
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.query.tag,
  })
  return { tag: context.query.tag }
}

export default Hashtag
