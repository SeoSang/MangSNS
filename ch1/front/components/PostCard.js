import React, { useCallback, useState, useMemo } from "react"
import { Card, Button, Icon, Avatar, Form, TextArea, List, Input } from "antd"
import { useSelector, useDispatch } from "react-redux"

const PostCard = ({ c }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const [commentText, setCommentText] = useState("")
  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev)
  }, [])

  const onSubmitComment = useCallback(e => {
    e.preventDefault()
    if (!me) {
      return alert("로그인이 필요합니다!")
    }
    dispatch({
      type: ADD_COMMENT_REQUEST
    })
  }, [])

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value)
  }, [])

  return (
    <>
      <Card
        key={+c.createdAt}
        cover={c.img && <img alt="example" src={c.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
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
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              보내기
            </Button>
          </Form>
          <List
            header={`${c.Comments ? c.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={c.Comment || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                  datetime={item.createdAt}
                />
              </li>
            )}
          ></List>
        </>
      )}
    </>
  )
}

export default PostCard
