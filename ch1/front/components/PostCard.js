import React, { useCallback, useState, useMemo, useEffect } from "react"
import { Card, Button, Icon, Avatar, Form, TextArea, List, Input, Comment } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { ADD_COMMENT_REQUEST } from "../reducers/post"
import Link from "next/link"

const PostCard = ({ c }) => {
  console.log("TCL: PostCard -> c", c)
  if (c == undefined) return <></>
  console.log("-----PostCard실행-----")
  console.log("TCL: PostCard -> c", c.User.nickname)
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const [commentText, setCommentText] = useState("")
  const { me } = useSelector(state => state.user)
  const { commentAdded } = useSelector(state => state.post)
  const dispatch = useDispatch()

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev)
  }, [])

  const onSubmitComment = useCallback(
    e => {
      e.preventDefault()
      if (!me) {
        return alert("로그인이 필요합니다!")
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: c.id,
        },
      })
    },
    [me && me.id],
  )

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value)
  }, [])

  useEffect(() => {
    if (commentAdded) setCommentText("")
  }, [commentAdded])

  return (
    <>
      <Card
        key={+c.createdAt}
        cover={c.img && <img alt='example' src={c.img} />}
        actions={[
          <Icon type='retweet' key='retweet' />,
          <Icon type='heart' key='heart' />,
          <Icon type='message' key='message' onClick={onToggleComment} />,
          <Icon type='ellipsis' key='ellipsis' />,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
          title={c.User.nickname}
          description={
            <div>
              {c.content.split(/(#[^\s]+)/g).map(v => {
                if (v.match(/#[^\s]+/)) {
                  return (
                    <Link href='/hashtag' key={v}>
                      <a>{v}</a>
                    </Link>
                  )
                }
                return v
              })}
            </div>
          }
        />
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
            </Form.Item>
            <Button type='primary' htmlType='submit'>
              보내기
            </Button>
          </Form>
          <List
            header={`${c.Comments ? c.Comments.length : 0} 댓글`}
            itemLayout='horizontal'
            dataSource={c.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
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
