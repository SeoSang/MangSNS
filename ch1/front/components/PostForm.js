import React from "react"
import { Form, Input, Icon, Row, Col, Checkbox, Button, AutoComplete, Avatar, Card } from "antd"
import { useDispatch, useSelector } from "react-redux"

const PostForm = () => {
  const dispatch = useDispatch()
  const { imagePaths, mainPosts } = useSelector(state => state.post)
  const { isLogin } = useSelector(state => state.user)
  return (
    <Form style={{ margin: "10px 0 " }} encType="multipart/form-data">
      <Input.TextArea maxLength={140} placeholder="어떤 일이 있으셨나요?"></Input.TextArea>
      <div>
        <Input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          하이
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
