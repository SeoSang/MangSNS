import React, { memo } from "react"
import AppLayout from "../components/AppLayout"
import Link from "next/link"
import Head from "next/head"
import { Form } from "antd"
import SignupForm from "./signupForm"
import styled, { css, createGlobalStyle, keyframes } from "styled-components"

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
