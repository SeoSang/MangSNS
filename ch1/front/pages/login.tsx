import React, { memo } from "react"
import { Form } from "antd"
import LoginForm from "../components/LoginForm"

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm)

const Login = () => {
  return (
    <>
      <div>로그인</div>
      <WrappedLoginForm />
    </>
  )
}

export default memo(Login)
