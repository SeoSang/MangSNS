import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import AppLayout from "../components/AppLayout"

const MangSNS = ({ Component }) => {
  return (
    <>
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
    </>
  )
}

MangSNS.propTypes = {
  Component: PropTypes.elementType
}

export default MangSNS
