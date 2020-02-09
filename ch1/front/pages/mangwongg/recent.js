import React, { useState, useEffect } from "react"
import { Row, Col, List, Typography, Card } from "antd"
import RecenteStats from "../../components/RecentStats"
import styled, { css } from "styled-components"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"

const { Title } = Typography

const dummy = {
  kda: ["3/1/2", "11/4/5", "10/1/2"]
}

const BolderCol = styled(Col)`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  text-align: center;
  vertical-align: middle;
`
const BolderRow = styled(Row)`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  text-align: center;
  vertical-align: middle;
`

const Recent = () => {
  const dispatch = useDispatch()
  const { summonerName } = useSelector(state => state.mwgg)
  const [tier, setTier] = useState("")
  const [kda, setKda] = useState(0)

  const getSummonerData = async () => {
    console.log(summonerName)
    const apiKey = "RGAPI-93bb8d21-c283-49b0-a564-b26bfb50b52e"
    const url = `/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
    const data = await axios
      .get(url, config)
      .then(response => console.log(response))
      .catch(err => console.log(err))

    console.log("data : ", data)
  }

  useEffect(() => {
    getSummonerData()
  }, [])

  return (
    <div>
      <BolderRow>
        <Title level={4}>소환사 이름</Title>
      </BolderRow>
      <BolderRow style={{ margin: "3px 0px" }}>
        <Title level={3} style={{ marginTop: "0.5em" }}>
          {summonerName}
        </Title>
      </BolderRow>
      <Row>
        <BolderCol style={{ height: "300px" }} xs={12} md={10}>
          <Title style={{ marginTop: "0.5em" }} level={4}>
            최근전적
          </Title>
          <BolderCol xs={12} md={12}>
            <Card title="승률" bordered={false}>
              <p>승률 그래프</p>
            </Card>
          </BolderCol>
          <BolderCol xs={12} md={12}>
            <Card title="KDA" bordered={false}>
              <p>KDA</p>
            </Card>
          </BolderCol>
        </BolderCol>
        <Col xs={24} md={14}>
          <RecenteStats />
        </Col>
      </Row>
    </div>
  )
}

export default Recent
