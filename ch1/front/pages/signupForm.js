import React, { Component, memo, useMemo } from "react"
import Head from "next/head"
import styled, { css } from "styled-components"

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd"

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option
const StyledForm = styled.div`
  border-radius: 15px;
  background-color: white;
  border-radius: 10px;
  padding: 5% 20% 0 3%;
`

const residences = [
  {
    value: "마포구",
    label: "마포구",
    children: [
      {
        value: "성산동",
        label: "성산동"
      },
      {
        value: "망원동",
        label: "망원동"
      }
    ]
  },
  {
    value: "기타",
    label: "기타"
  }
]

class SignupForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values)
      }
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!")
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { autoCompleteResult } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "82"
    })(
      <Select style={{ width: 70 }}>
        <Option value="82">+82</Option>
      </Select>
    )

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ))

    return (
      <>
        <Head>
          <title>MangSNS</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
          ></link>
        </Head>
        <StyledForm>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
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
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="비밀번호 확인" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "비밀번호를 확인해주세요!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  별명&nbsp;
                  <Tooltip title="무엇으로 불리고 싶으신가요?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("nickname", {
                rules: [
                  {
                    required: true,
                    message: "별명을 입력해주세요!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="거주지">
              {getFieldDecorator("residence", {
                initialValue: ["망원동", "성산동"],
                rules: [
                  {
                    type: "array",
                    required: true,
                    message: "거주지를 입력해주세요!"
                  }
                ]
              })(<Cascader options={residences} />)}
            </Form.Item>
            <Form.Item label="휴대전화">
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: "핸드폰 번호를 입력해주세요!" }]
              })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator("agreement", {
                valuePropName: "checked"
              })(
                <Checkbox>
                  저는 <a href="">약관</a>을 읽었고 동의합니다.
                </Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                가입하기
              </Button>
            </Form.Item>
          </Form>
        </StyledForm>
      </>
    )
  }
}

export default memo(SignupForm)
