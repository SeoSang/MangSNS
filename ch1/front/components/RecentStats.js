import React, { useState, useEffect } from "react"
import { Row, Col, List, Typography, message, Avatar, Spin } from "antd"
import reqwest from "reqwest"
import styled, { css } from "styled-components"
import InfiniteScroll from "react-infinite-scroller"

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
    console.log("useEffect")
    fetchData(res => {
      console.log("TCL: mangwongg -> res(data)", res)
      setData(res.results)
      console.log("TCL: mangwongg -> res.results", res.results)
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
                    style={{ backgroundPosition: "0px -2788px;" }}
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
