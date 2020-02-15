import React, { useCallback, useState, useEffect } from "react"
import { Form, Input, Icon, Row, Col, Checkbox, Button, AutoComplete, Avatar, Card } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ADD_POST_REQUEST } from "../reducers/post"

const PostForm = () => {
  const [text, setText] = useState("")
  const dispatch = useDispatch()
  const { postAdded, isAddingPost, imagePaths, mainPosts } = useSelector(state => state.post)

  const onChangeTextArea = useCallback(e => {
    setText(e.target.value)
  }, [])

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault()
      if (!text || !text.trim()) {
        return alert("빈 게시글은 작성할 수 없습니다!")
      }
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: text,
        },
      })
    },
    [text],
  )

  useEffect(() => {
    console.log("useEffect")
    if (postAdded) setText("")
  }, [postAdded])

  return (
    <Form style={{ margin: "10px 0 " }} encType='multipart/form-data' onSubmit={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder='어떤 일이 있으셨나요?'
        onChange={onChangeTextArea}
        value={text}
      ></Input.TextArea>
      <div>
        <Input type='file' multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type='primary' style={{ float: "right" }} htmlType='submit' loading={isAddingPost}>
          올리기
        </Button>
      </div>
      <br></br>
      <div>
        {imagePaths.map((v, i) => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={"http://localhost:3065/" + v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  )
}

export default PostForm
