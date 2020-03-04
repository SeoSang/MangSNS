import React, { memo, useEffect } from "react"
import { Form } from "antd"
import Router, { useRouter } from "next/router"
import SignupForm from "../components/SignupForm"
import { useSelector } from "react-redux"
import { StoreState } from "../reducers"
import { Context } from "./mytypes/pagesTypes"
import { NextPage } from "next"
import { UserInfo } from "./mytypes/reducerTypes"

const WrappedSignupForm = Form.create({ name: "register" })(SignupForm)

const Signup: NextPage<{ me?: UserInfo }> = () => {
  const { me, isSignedUp } = useSelector((state: StoreState) => state.user)
  useEffect(() => {
    if (me) {
      alert("이미 로그인이 된 상태입니다!")
      Router.push("/")
    }
  }, [me && me.id])

  useEffect(() => {
    if (isSignedUp) Router.push("/")
  }, [isSignedUp])

  return (
    <>
      <div>회원가입</div>
      {me ? null : <WrappedSignupForm />}
    </>
  )
}

// Signup.getInitialProps = async (context: Context) => {
//   const { me } = context.store.getState()
//   return { me }
// }

export default memo(Signup)
