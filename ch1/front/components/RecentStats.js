import React, { useState, useEffect } from "react"
import { Row, Col, List, Typography, message, Avatar, Spin } from "antd"
import reqwest from "reqwest"
import styled, { css } from "styled-components"
import InfiniteScroll from "react-infinite-scroller"
import axios from "axios"

const API_KEY = "RGAPI-93bb8d21-c283-49b0-a564-b26bfb50b52e"
const SUMMONER = "일로와서앉아봐라"
const SUMMONER_URL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${SUMMONER}?api_key=${API_KEY}`

const fakeDataUrl = "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo"

const DemoInfiniteContainer = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
`

const DemoLoadingContainer = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
`

const RecentStats = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchData(res => {
      setData(res.results)
    })
  }, [])

  const fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res)
      }
    })
  }

  const handleInfiniteOnLoad = () => {
    setLoading(true)
    if (data.length > 14) {
      message.warning("Infinite List loaded all")
      setLoading(false)
      setHasMore(false)
      return
    }
    fetchData(res => {
      let newData = data.concat(res.results)
      setData(newData)
      setLoading(false)
    })
  }

  return (
    <DemoInfiniteContainer>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundPosition: "0px -2788px" }}
                    src="https://opgg-static.akamaized.net/assets/champion82.png?image=q_auto&v=1579759199"
                  />
                }
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>승</div>
            </List.Item>
          )}
        >
          {loading && hasMore && (
            <DemoLoadingContainer>
              <Spin />
            </DemoLoadingContainer>
          )}
        </List>
      </InfiniteScroll>
    </DemoInfiniteContainer>
  )
}

export default RecentStats
