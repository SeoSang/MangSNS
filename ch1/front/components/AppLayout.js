import React from "react"
import Link from "next/link"
import { Menu, Input, Button } from "antd"

const { Search } = Input

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
      <Link href="/signup">
        <a>
          <Button>회원가입</Button>
        </a>
      </Link>
      {children}
    </div>
  )
}

export default AppLayout
