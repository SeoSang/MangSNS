import React from "react"
import { Form, Input, Icon, Row, Col, Checkbox, Button, AutoComplete, Avatar, Card } from "antd"

const dummy = {
  isLogin: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "서상혁"
      },
      content: "첫번째 게시글",
      img: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726"
    }
  ]
}

const PostForm = () => {
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
        {dummy.imagePaths.map((v, i) => {
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
