import React from "react"
import Link from "next/link"
import LoginForm from "./loginForm"
import { Menu, Input, Button, Row, Col, Avatar, Card, Form } from "antd"
import UserProfile from "./UserProfile"

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm)

const dummy = {
  isLogin: true,
  nickname: "서상혁",
  Posts: [],
  Followings: [],
  Followers: []
}

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>망SNS</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={5}>
          {dummy.isLogin ? <UserProfile dummy={dummy} /> : <WrappedLoginForm />}
        </Col>
        <Col xs={24} md={14}>
          {children}
        </Col>
        <Col xs={24} md={5}>
          세번째
        </Col>
      </Row>
      <Link href="/login">
        <a>
          <Button>로그인</Button>
        </a>
      </Link>
      <Link href="/signup">
        <a>
          <Button>회원가입</Button>
        </a>
      </Link>
    </div>
  )
}

export default AppLayout
