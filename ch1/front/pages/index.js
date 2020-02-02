import React from "react"
import Link from "next/link"
import Head from "next/head"
import AppLayout from "../components/AppLayout.js"

const Home = () => {
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
        <Link href="/users/create">
          <a>Go to create.js</a>
        </Link>
        <div>
          <h1>I am Home</h1>
        </div>
      </AppLayout>
    </>
  )
}

export default Home
