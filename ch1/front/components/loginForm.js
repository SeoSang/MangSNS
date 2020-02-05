import React, { Component, memo, useMemo, useState } from "react"
import styled, { css } from "styled-components"

import { Form, Input, Button, Icon, Row, Col, Typography } from "antd"
import { loginAction } from "../reducers/user"
import { useDispatch, useSelector } from "react-redux"

const { Title } = Typography

const StyledFormDiv = styled.div`
  border-radius: 15px;
  background-color: #dff9fb;
  border-radius: 10px;
  padding: 5% 1% 2% 1%;
  margin: 2% 2%;
`

const StyledTitle = styled(Title)`
  text-align: center;
`
const LoginForm = ({ form }) => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector(state => state.user)

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !!values.agreement) {
        console.log("Received values of form: ", values)
      }
    })
    dispatch(loginAction)
    console.log(form.getFieldValue)
  }

  const { getFieldDecorator } = form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 24,
        offset: 0
      }
    }
  }

  return (
    <StyledFormDiv>
      <StyledTitle level={3}>로그인</StyledTitle>
      <Form {...formItemLayout} onSubmit={handleSubmit} labelAlign="left">
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "올바른 이메일 주소가 아닙니다!"
              },
              {
                required: true,
                message: "이메일을 입력해주세요!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="비밀번호" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "비밀번호를 입력해주세요!"
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </StyledFormDiv>
  )
}

export default memo(LoginForm)
