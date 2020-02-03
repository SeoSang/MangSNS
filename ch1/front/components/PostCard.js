import React from "react"
import { Card, Button, Icon, Avatar } from "antd"

const PostCard = ({ c }) => {
  return (
    <Card
      key={+c.createdAt}
      cover={c.img && <img alt="example" src={c.img} />}
      actions={[
        <Icon type="retweet" key="retweet" />,
        <Icon type="heart" key="heart" />,
        <Icon type="message" key="message" />,
        <Icon type="ellipsis" key="ellipsis" />
      ]}
      extra={<Button>팔로우</Button>}
    >
      <Card.Meta
        avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
        title={c.User.nickname}
        description={c.content}
      />
    </Card>
  )
}

export default PostCard
