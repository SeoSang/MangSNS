import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import withRedux from "next-redux-wrapper"
import AppLayout from "../components/AppLayout"
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga"
import { createStore, compose, applyMiddleware, CombinedState, Store } from "redux"
import reducer, { StoreState } from "../reducers/index"
import rootSaga from "../sagas"
import withReduxSaga from "next-redux-saga"
import { Context } from "vm"
import { NextComponentType } from "next"
import { AppContextType, AppInitialProps, AppPropsType } from "next/dist/next-server/lib/utils"
import { LOAD_USER_REQUEST } from "../reducers/reducerTypes"
import axios from "axios"

export interface MyAppPropsType extends AppPropsType {
  store: Store
}

const MangSNS = ({ Component, store, pageProps }: MyAppPropsType) => {
  return (
    <Provider store={store}>
      <Head>
        <title>MangSNS</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css'
        ></link>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  )
}

MangSNS.getInitialProps = async (context: Context) => {
  // 제일먼저 실행되는 사이클 (프론트, 서버 둘다 실행됨)
  const { ctx, Component } = context
  const state = ctx.store.getState()
  // 서버일때만 쿠키 준다 (클라이언트일때는 알아서 쿠키 줌)
  const cookie = ctx.isServer ? ctx.req.headers.cookie : ""
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie // 모든 axios 에 적용
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    })
  }
  let pageProps = {}
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx)
  }
  return { pageProps }
}

const middle = (initialState: StoreState, options: any) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [
    sagaMiddleware,
    store => next => action => {
      console.log(action)
      next(action) // 엑션 로그받는 미들웨어
    },
  ]
  const composeEnhancers =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : (!options.isServer &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
        compose
  const store = createStore(
    reducer,
    initialState as any,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
  ;(store as any).sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

// dispatch 후 액션이 실행되기 전 (두 작업 사이에)  middleware 의 역할 수행
export default withRedux(middle)(withReduxSaga(MangSNS))
