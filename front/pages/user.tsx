import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Avatar, Card } from "antd"
import PostCard from "../containers/PostCard"
import { LOAD_USER_REQUEST, LOAD_USER_POSTS_REQUEST } from "./mytypes/reducerTypes"
import { StoreState } from "../reducers"
import { NextPage } from "next"
import { Context } from "./mytypes/pagesTypes"

const User: NextPage<{ id: number }> = ({ id }) => {
  const { mainPosts } = useSelector((state: StoreState) => state.post)
  const { userInfo } = useSelector((state: StoreState) => state.user)

  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key='twit'>
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key='following'>
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key='follower'>
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}
      {mainPosts.map(post => (
        <PostCard key={post.createdAt} post={post} />
      ))}
    </div>
  )
}

User.propTypes = {
  id: PropTypes.number.isRequired,
}

User.getInitialProps = async (context: Context) => {
  const id = parseInt(context.query.id as string, 10)
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  })
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id,
  })
  return { id }
}

export default User
