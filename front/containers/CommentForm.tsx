import React, { useState, useCallback, useEffect } from "react"
import { Form, Input, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { StoreState } from "../reducers"
import { ADD_COMMENT_REQUEST } from "../mytypes/reducerTypes"
import { NextPage } from "next"

const CommentForm: NextPage<{ postId: number }> = ({ postId }) => {
  const [commentText, setCommentText] = useState("")
  const { me } = useSelector((state: StoreState) => state.user)
  const { commentAdded } = useSelector((state: StoreState) => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    if (commentAdded) setCommentText("")
  }, [commentAdded])

  const onSubmitComment = useCallback(
    e => {
      e.preventDefault()
      if (!me) {
        return alert("로그인이 필요합니다!")
      }
      return dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId,
          content: commentText,
        },
      })
    },
    [me && me.id, commentText],
  )

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value)
  }, [])

  return (
    <Form onSubmit={onSubmitComment}>
      <Form.Item>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
      </Form.Item>
      <Button type='primary' htmlType='submit'>
        보내기
      </Button>
    </Form>
  )
}

export default CommentForm
