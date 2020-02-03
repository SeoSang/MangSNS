import React from "react"
import { Form, Button, Input } from "antd"

const NickNameEditForm = () => {
  return (
    <Form style={{ marginBottom: "20px", border: "1px solid #d9d9d9", padding: "20px" }}>
      <Input addonBefore="닉네임"></Input>
      <Button type="primary">수정</Button>
    </Form>
  )
}

export default NickNameEditForm
