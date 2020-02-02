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
      <Head>
        <title>MangSNS</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
        ></link>
      </Head>
      <AppLayout>
        <div>회원가입</div>
        <WrappedSignupForm />
      </AppLayout>
    </>
  )
}

export default memo(Signup)
