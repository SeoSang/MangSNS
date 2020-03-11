import React, { useCallback, useEffect } from "react"
import Link from "next/link"
import LoginForm from "./LoginForm"
import { Menu, Input, Button, Row, Col, Avatar, Card, Form } from "antd"
import UserProfile from "./UserProfile"
import { useDispatch, useSelector } from "react-redux"
import { LOG_OUT_REQUEST } from "../pages/mytypes/reducerTypes"
import Router from "next/router"
import { NextPage, NextComponentType } from "next"
import { StoreState } from "../reducers"

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm)

const AppLayout: NextPage = ({ children }) => {
  const dispatch = useDispatch()
  const { me } = useSelector((state: StoreState) => state.user)
  const handleLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }, [me])

  const onSearch = (value: string) => {
    Router.push({ pathname: "/hashtag", query: { tag: value } }, `/hashtag/${value}`)
  }

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
          <Input.Search enterButton style={{ verticalAlign: "middle" }} onSearch={onSearch} />
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
