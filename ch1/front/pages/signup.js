import React, { memo, useEffect } from "react"
import { Form } from "antd"
import Router from "next/router"
import SignupForm from "../components/SignupForm"

const WrappedSignupForm = Form.create({ name: "register" })(SignupForm)

const Signup = () => {
  useEffect(() => {
    if (me) {
      alert("이미 로그인이 된 상태입니다!")
      Router.push("/")
    }
  }, [me && me.id])
  return (
    <>
      <div>회원가입</div>
      <WrappedSignupForm />
    </>
  )
}

export default memo(Signup)
