import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import withRedux from "next-redux-wrapper"
import AppLayout from "../components/AppLayout"
import { Provider } from "react-redux"
import { createStore, compose, applyMiddleware } from "redux"
import reducer from "../reducers"

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

export default withRedux((initialState, options) => {
  const middlewares = [] // store 에 기능을 추가하거나 변조!
  const composeEnhancers =
    (!options.isServer &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
    compose
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  return store
})(MangSNS)
