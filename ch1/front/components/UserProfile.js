import React from "react"
import { Card, Avatar } from "antd"

const UserProfile = ({ user }) => {
  console.log(user)
  return (
    <Card
      actions={[
        <div key='twit'>
          포스트
          <br />
          {user.Posts.length}
        </div>,
        <div key='Followings'>
          팔로잉
          <br />
          {user.Followings.length}
        </div>,
        <div key='Followers'>
          팔로워
          <br />
          {user.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{user.nickname[0]}</Avatar>} title={user.nickname} />
    </Card>
  )
}

export default UserProfile
