import React from "react"
import Link from "next/link"
import LoginForm from "./loginForm"
import { Menu, Input, Button, Row, Col, Avatar, Card, Form } from "antd"

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm)

const dummy = {
  isLogin: false,
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
        <Menu.Item key="search">
          <Input.Search
            enterButton
            placeholder="검색어를 입력하세요."
            style={{ verticalAlign: "middle" }}
          />
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          {dummy.isLogin ? (
            <Card
              actions={[
                <div key="twit">
                  포스트
                  <br />
                  {dummy.Posts.length}
                </div>,
                <div key="Followings">
                  팔로잉
                  <br />
                  {dummy.Followings.length}
                </div>,
                <div key="Followers">
                  팔로워
                  <br />
                  {dummy.Followers.length}
                </div>
              ]}
            >
              <Card.Meta avatar={<Avatar>{dummy.nickname[0]}</Avatar>} title={dummy.nickname} />
            </Card>
          ) : (
            <WrappedLoginForm />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
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
