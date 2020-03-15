import React from "react"
import { List, Button, Card, Icon } from "antd"
import { EndOfData } from "../pages/profile"
import { NextPage } from "next"
import { UserInfo } from "../mytypes/reducerTypes"

const FollowList: NextPage<{
  header: String
  onClickMore: () => void
  onClickCard: (userId: number) => () => void
  hasMore: Boolean
  dataSource: UserInfo[] | []
}> = ({ header, onClickMore, onClickCard, hasMore, dataSource }) => {
  return (
    <List
      style={{ marginBottom: "20px" }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      header={<div>{header}</div>}
      loadMore={
        hasMore ? (
          <Button style={{ width: "100%" }} onClick={onClickMore}>
            더 보기
          </Button>
        ) : (
          <EndOfData>데이터의 끝입니다.</EndOfData>
        )
      }
      bordered
      dataSource={dataSource}
      renderItem={item => (
        <List.Item style={{ marginTop: "20px" }}>
          <Card actions={[<Icon key='stop' type='stop' onClick={onClickCard(item.id)} />]}>
            <Card.Meta description={item.nickname}></Card.Meta>
          </Card>
        </List.Item>
      )}
    ></List>
  )
}

export default FollowList
