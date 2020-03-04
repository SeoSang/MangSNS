import React, { useEffect, useCallback, useState } from "react"
import { List, Icon, Input, Card, Form, Button } from "antd"
import NickNameEditForm from "../components/NickNameEditForm"
import { useDispatch, useSelector } from "react-redux"
import PostCard from "../components/PostCard"
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from "./mytypes/reducerTypes"
import { StoreState } from "../reducers"
import { NextComponentType, NextPage, NextPageContext } from "next"
import { Context } from "./mytypes/pagesTypes"

const Profile: NextPage = () => {
  const { me, followingList, followerList } = useSelector((state: StoreState) => state.user)
  const { mainPosts } = useSelector((state: StoreState) => state.post)
  const dispatch = useDispatch()

  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      })
    },
    [],
  )

  const onRemoveFollower = useCallback(
    userId => () => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId,
      })
    },
    [],
  )

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length,
    })
  }, [followingList])
  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    })
  }, [followerList])

  return (
    <>
      <NickNameEditForm />
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size='small'
        header={<div>팔로워 목록</div>}
        loadMore={
          <Button style={{ width: "100%" }} onClick={loadMoreFollowers}>
            더 보기
          </Button>
        }
        bordered
        dataSource={followerList}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key='stop' type='stop' onClick={onRemoveFollower(item.id)} />]}>
              <Card.Meta description={item.nickname}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size='small'
        header={<div>팔로잉 목록</div>}
        loadMore={
          <Button style={{ width: "100%" }} onClick={loadMoreFollowings}>
            더 보기
          </Button>
        }
        bordered
        dataSource={followingList}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key='stop' type='stop' onClick={onUnfollow(item.id)} />]}>
              <Card.Meta description={item.nickname}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
      <div>
        {mainPosts.map(c => (
          <PostCard key={+c.createdAt} post={c} />
        ))}
      </div>
    </>
  )
}

export default Profile

Profile.getInitialProps = async (context: Context) => {
  const { user } = context.store.getState()
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: user.me && user.me.id,
  })
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: user.me && user.me.id,
  })
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: user.me && user.me.id,
  })
}
