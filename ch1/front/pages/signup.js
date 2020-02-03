import React, { memo } from "react"
import { Form } from "antd"
import SignupForm from "../components/signupForm"

const WrappedSignupForm = Form.create({ name: "register" })(SignupForm)

const Signup = () => {
  return (
    <>
      <div>회원가입</div>
      <WrappedSignupForm />
    </>
  )
}

export default memo(Signup)
