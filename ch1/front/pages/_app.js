import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import withRedux from "next-redux-wrapper"
import AppLayout from "../components/AppLayout"
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga"
import { createStore, compose, applyMiddleware } from "redux"
import reducer from "../reducers"
import rootSaga from "../sagas"

const MangSNS = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>MangSNS</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
        ></link>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  )
}

MangSNS.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object
}

// dispatch 후 액션이 실행되기 전 (두 작업 사이에)  middleware 의 역할 수행
export default withRedux((initialState, options) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const composeEnhancers =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : (!options.isServer &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
        compose
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  sagaMiddleware.run(rootSaga)
  return store
})(MangSNS)
