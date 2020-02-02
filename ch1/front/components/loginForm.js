import React, { Component, memo, useMemo } from "react"
import styled, { css } from "styled-components"

import { Form, Input, Button, Icon, Row, Col, Typography } from "antd"

const { Title } = Typography

const StyledForm = styled.div`
  border-radius: 15px;
  background-color: #dff9fb;
  border-radius: 10px;
  padding: 5% 17% 2% 0;
`

const StyledTitle = styled(Title)`
  text-align: center;
`
class LoginForm extends Component {
  state = {
    confirmDirty: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && !!values.agreement) {
        console.log("Received values of form: ", values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
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
          span: 16,
          offset: 8
        }
      }
    }

    return (
      <>
        <StyledForm>
          <StyledTitle level={3}>로그인</StyledTitle>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
              <Button type="primary" htmlType="submit" loadding={true}>
                로그인
              </Button>
            </Form.Item>
          </Form>
        </StyledForm>
      </>
    )
  }
}

export default memo(LoginForm)
