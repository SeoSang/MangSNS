import React, { useCallback, useState, useMemo, useEffect } from "react"
import { Card, Button, Icon, Avatar, Form, List, Input, Comment, Popover } from "antd"
import { useSelector, useDispatch } from "react-redux"
import {
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  RETWEET_REQUEST,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
  REMOVE_POST_REQUEST,
  UserInfo,
  PostState,
  MainPost,
} from "../pages/mytypes/reducerTypes"
import Link from "next/link"
import PostImages from "../components/PostImages"
import PostCardContent from "../components/PostCardContent"
import { StoreState } from "../reducers"
import { NextPage } from "next"

const BACKEND_HTTP = "http://localhost:4539/"

const PostCard: NextPage<{ post: MainPost }> = ({ post }) => {
  if (post == undefined) return <></>
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const [commentText, setCommentText] = useState("")
  const { me } = useSelector((state: StoreState) => state.user)
  const { commentAdded } = useSelector((state: StoreState) => state.post)
  const liked = me && post.Likers && post.Likers.find(v => v.id === me.id)
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

  const onRetweet = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다.")
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    })
  }, [me && me.id, post && post.id, post])

  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다!")
    }
    if (liked) {
      // 이미 좋아요 누른상태
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      })
    } else {
      // 좋아요 아직 안누른 상태
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      })
    }
  }, [me && me.id, post && post.id, liked])

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

  const onRemovePost = useCallback(
    id => () => {
      if (!me) {
        console.log("__Postcard.js__ me => ", me)
        return alert("로그인이 필요합니다!")
      }
      return dispatch({
        type: REMOVE_POST_REQUEST,
        data: id,
      })
    },
    [],
  )

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value)
  }, [])

  const onFollow = useCallback(
    userId => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId,
      })
    },
    [],
  )
  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      })
    },
    [],
  )

  useEffect(() => {
    if (commentAdded) setCommentText("")
  }, [commentAdded])

  return (
    <>
      <Card
        key={+post.createdAt}
        cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type='retweet' key='retweet' onClick={onRetweet} />,
          <Icon
            type='heart'
            theme={liked ? "twoTone" : "outlined"}
            twoToneColor='#e84393'
            key='heart'
            onClick={onToggleLike}
          />,
          <Icon type='message' key='message' onClick={onToggleComment} />,
          <Popover
            key='ellipsis'
            content={
              <Button.Group>
                {me && post.User?.id === me.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type='danger' onClick={onRemovePost(post.id)}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <Icon type='ellipsis' />
          </Popover>,
        ]}
        extra={
          !me || post.User?.id === me.id ? null : me.Followings &&
            me.Followings.find(v => v.id === post.User?.id) ? (
            <Button onClick={onUnfollow(post.User?.id)}>언팔로우</Button>
          ) : (
            <Button onClick={onFollow(post.User?.id)}>팔로우</Button>
          )
        }
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet?.Images &&
              post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />
            }
          >
            <Card.Meta
              avatar={
                <Link
                  href={{ pathname: "/user", query: { id: post.Retweet?.User?.id } }}
                  as={`/user/${post.Retweet?.User?.id}`}
                >
                  <a>
                    <Avatar>{post.Retweet?.User?.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.RetweetId ? `${post.User?.nickname}님이 리트윗하셨습니다.` : null}
              description={<PostCardContent postData={post.Retweet.content} />} // a tag x -> Link
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link
                href={{ pathname: "/user", query: { id: post.User?.id } }}
                as={`/user/${post.User?.id}`}
              >
                <a>
                  <Avatar>{post.User?.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={post.User?.nickname}
            description={<PostCardContent postData={post.content} />} // a tag x -> Link
          />
        )}
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
            renderItem={(item: MainPost) => (
              <li>
                <Comment
                  author={item.User?.nickname}
                  avatar={
                    <Link
                      href={{ pathname: "/user", query: { id: item.User?.id } }}
                      as={`/user/${item.User?.id}`}
                    >
                      <a>
                        <Avatar>{item.User?.nickname[0]}</Avatar>
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
