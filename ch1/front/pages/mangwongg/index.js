import { Card, Col, Row } from "antd"

import React from "react"
import { useDispatch, useSelector } from "react-redux"

const index = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.mwgg)

  // 소환사 넘어가는 링크 만들어줌
  const makeLink = summonerArr => {
    const summonerLinks = summonerArr.map(str => {
      return (
        <>
          <a href="">{str}</a>
          <br />
        </>
      )
    })
    return summonerLinks
  }

  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Row gutter={16}>
        {users.map(user => {
          const summonerLinks = makeLink(user.summonerNames)
          return (
            <Col span={8}>
              <Card title={user.userName} bordered={false}>
                {summonerLinks}
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default index
