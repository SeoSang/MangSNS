import React from "react"
import { Card, Avatar } from "antd"

const UserProfile = ({ dummy }) => {
  return (
    <Card
      actions={[
        <div key="twit">
          포스트
          <br />
          {dummy.Posts.length}
        </div>,
        <div key="Followings">
          팔로잉
          <br />
          {dummy.Followings.length}
        </div>,
        <div key="Followers">
          팔로워
          <br />
          {dummy.Followers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{dummy.nickname[0]}</Avatar>} title={dummy.nickname} />
    </Card>
  )
}

export default UserProfile
