import React, { useCallback, useEffect } from "react"
import Link from "next/link"
import LoginForm from "./LoginForm"
import { Menu, Input, Button, Row, Col, Avatar, Card, Form } from "antd"
import UserProfile from "./UserProfile"
import { useDispatch, useSelector } from "react-redux"
import { logoutRequestAction, LOAD_USER_REQUEST } from "../reducers/user"

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm)

const AppLayout = ({ children }) => {
  const dispatch = useDispatch()
  const { me } = useSelector(state => state.user)
  const handleLogout = useCallback(() => {
    dispatch(logoutRequestAction)
  }, [me])

  useEffect(() => {
    if (!me)
      dispatch({
        type: LOAD_USER_REQUEST,
      })
  }, [])

  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item key='home'>
          <Link href='/'>
            <a>망SNS</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link href='/profile'>
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='mangwongg'>
          <Link href='/mangwongg'>
            <a>MangWonGG</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='mail'>
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={5} style={{ textAlign: "center" }}>
          {me ? <UserProfile user={me} /> : <WrappedLoginForm />}
          {!me ? (
            <Link href='/signup'>
              <a>
                <Button>회원가입</Button>
              </a>
            </Link>
          ) : (
            <Button onClick={handleLogout}>로그아웃</Button>
          )}
        </Col>
        <Col xs={24} md={14}>
          {children}
        </Col>
        <Col xs={24} md={5}>
          세번째
        </Col>
      </Row>
    </div>
  )
}

export default AppLayout
