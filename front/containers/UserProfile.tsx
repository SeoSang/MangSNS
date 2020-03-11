import React from "react"
import { Card, Avatar } from "antd"
import { NextPage } from "next"
import { UserInfo } from "../pages/mytypes/reducerTypes"
import Link from "next/link"

const UserProfile: NextPage<{ user: UserInfo }> = ({ user }) => {
  return (
    <Card
      actions={[
        <Link href='/profile' key='twit'>
          <a>
            <div key='twit'>
              포스트
              <br />
              {user.Posts.length}
            </div>
          </a>
        </Link>,
        <Link href='/profile' key='followings'>
          <a>
            <div key='Followings'>
              팔로잉
              <br />
              {user.Followings.length}
            </div>
          </a>
        </Link>,
        <Link href='/profile' key='followers'>
          <a>
            <div key='Followers'>
              팔로워
              <br />
              {user.Followers.length}
            </div>
          </a>
        </Link>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{user.nickname[0]}</Avatar>} title={user.nickname} />
    </Card>
  )
}

export default UserProfile
