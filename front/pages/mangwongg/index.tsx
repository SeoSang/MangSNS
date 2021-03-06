import React, { ChangeEvent, useCallback } from "react"
import { Card, Col, Row } from "antd"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { ADD_SUMMONER_NAME } from "../../mytypes/reducerTypes"
import { StoreState } from "../../reducers"

const index = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state: StoreState) => state.mwgg)

  const onClickEvent = useCallback(e => {
    const summonerName = e.target.innerText
    dispatch({ type: ADD_SUMMONER_NAME, data: summonerName })
  }, [])

  // 소환사 넘어가는 링크 만들어줌
  const makeLink = (summonerArr: string[]) => {
    const summonerLinks = summonerArr.map(str => {
      return (
        <React.Fragment key={str}>
          <Link href='/mangwongg/recent'>
            <a onClick={onClickEvent}>{str}</a>
          </Link>
          <br />
        </React.Fragment>
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
            <Col key={`${summonerLinks}`} span={8}>
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
