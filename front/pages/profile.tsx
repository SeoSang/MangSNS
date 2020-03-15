import React, { useEffect, useCallback, useState } from "react"
import NickNameEditForm from "../containers/NickNameEditForm"
import { useDispatch, useSelector } from "react-redux"
import PostCard from "../containers/PostCard"
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from "../mytypes/reducerTypes"
import { StoreState } from "../reducers"
import { NextPage } from "next"
import { Context } from "../mytypes/pagesTypes"
import styled from "styled-components"
import Router from "next/router"
import FollowerList from "../containers/FollowList"
import FollowList from "../containers/FollowList"

export const EndOfData = styled.div`
  text-align: center;
  font-style: italic;
`

const Profile: NextPage<{ isLogin: boolean }> = ({ isLogin }) => {
  const { followingList, followerList, hasMoreFollower, hasMoreFollowing } = useSelector(
    (state: StoreState) => state.user,
  )
  const { mainPosts } = useSelector((state: StoreState) => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다!")
      Router.push("/")
    }
  }, [])

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
  }, [followingList.length])

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    })
  }, [followerList.length])

  return (
    <>
      <NickNameEditForm />
      <FollowList
        header='팔로워목록'
        onClickMore={loadMoreFollowers}
        onClickCard={onRemoveFollower}
        hasMore={hasMoreFollower}
        dataSource={followerList}
      />
      <FollowList
        header='팔로잉목록'
        onClickMore={loadMoreFollowings}
        onClickCard={onUnfollow}
        hasMore={hasMoreFollowing}
        dataSource={followingList}
      />
      <div>
        {mainPosts.map(c => (
          <PostCard key={c.id} post={c} />
        ))}
      </div>
    </>
  )
}

export default Profile

Profile.getInitialProps = async (context: Context) => {
  const { user } = context.store.getState()
  if (!user.me) {
    return { isLogin: false }
  }
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
  return { isLogin: true }
}
