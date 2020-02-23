import React, { useCallback, useState, useMemo, useEffect } from "react"
import { Card, Button, Icon, Avatar, Form, TextArea, List, Input, Comment } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST } from "../reducers/reducerTypes"
import Link from "next/link"

const PostCard = ({ post }) => {
  if (post == undefined) return <></>
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const [commentText, setCommentText] = useState("")
  const { me } = useSelector(state => state.user)
  const { commentAdded } = useSelector(state => state.post)
  const dispatch = useDispatch()

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev)
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id,
      })
    }
  }, [])

  const onSubmitComment = useCallback(
    e => {
      e.preventDefault()
      if (!me) {
        return alert("로그인이 필요합니다!")
      }
      return dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          content: commentText,
        },
      })
    },
    [me && me.id, commentText],
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
        key={+post.createdAt}
        cover={post.img && <img alt='example' src={post.img} />}
        actions={[
          <Icon type='retweet' key='retweet' />,
          <Icon type='heart' key='heart' />,
          <Icon type='message' key='message' onClick={onToggleComment} />,
          <Icon type='ellipsis' key='ellipsis' />,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={
            <Link
              href={{ pathname: "/user", query: { id: post.User.id } }}
              as={`/user/${post.User.id}`}
            >
              <a>
                <Avatar>{post.User.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={post.User.nickname}
          description={
            <div>
              {post.content.split(/(#[^\s]+)/g).map(v => {
                if (v.match(/#[^\s]+/)) {
                  return (
                    <Link
                      href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
                      key={v}
                      as={`/hashtag/${v.slice(1)}`}
                    >
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
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link
                      href={{ pathname: "/user", query: { id: item.User.id } }}
                      as={`/user/${item.User.id}`}
                    >
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
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
