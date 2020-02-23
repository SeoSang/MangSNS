import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/reducerTypes"
import PostCard from "../components/PostCard"

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch()
  const { mainPosts } = useSelector(state => state.post)
  console.log("pages__hashtag.js : ", mainPosts)
  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
    })
  }, [])
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

Hashtag.getInitialProps = async context => {
  return { tag: context.query.tag }
}

export default Hashtag
