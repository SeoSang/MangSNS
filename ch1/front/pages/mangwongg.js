import React from "react"
import { Row, Col, List, Typography, Card } from "antd"
import RecenteStats from "../components/RecentStats"
import styled, { css } from "styled-components"
import axios from "axios"

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

const mangwongg = () => {
  return (
    <div>
      <BolderRow>
        <Title level={3}>소환사 이름</Title>
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

export default mangwongg
