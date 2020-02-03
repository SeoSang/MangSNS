import React from "react"
import { List, Icon, Input, Card, Form, Button } from "antd"
import NickNameEditForm from "../components/NickNameEditForm"

const Profile = () => {
  return (
    <>
      <NickNameEditForm />
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={["서상혁", "지드래곤", "싸이"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key="stop" type="stop" />]}>
              <Card.Meta description={item}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={["서상혁", "홍길동", "김건모"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key="stop" type="stop" />]}>
              <Card.Meta description={item}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
    </>
  )
}

export default Profile
