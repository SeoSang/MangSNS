import React, { memo, useEffect } from "react"
import { Form } from "antd"
import Router from "next/router"
import SignupForm from "../components/SignupForm"
import { useSelector } from "react-redux"
import { StoreState } from "../reducers"
import { Context } from "./mytypes/pagesTypes"
import { NextPage } from "next"
import { UserInfo } from "./mytypes/reducerTypes"

const WrappedSignupForm = Form.create({ name: "register" })(SignupForm)

const Signup: NextPage<{ me?: UserInfo }> = () => {
  const { me } = useSelector((state: StoreState) => state.user)
  useEffect(() => {
    if (me) {
      alert("이미 로그인이 된 상태입니다!")
      Router.push("/")
    }
  }, [me && me.id])
  return (
    <>
      <div>회원가입</div>
      {me ? null : <WrappedSignupForm />}
    </>
  )
}

Signup.getInitialProps = async (context: Context) => {
  const { me } = context.store.getState()
  return { me }
}

export default memo(Signup)
