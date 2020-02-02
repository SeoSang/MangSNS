import React from "react"
import AppLayout from "../components/AppLayout"
import Link from "next/link"
import Head from "next/head"

const Profile = () => {
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
        <div>프로필</div>
      </AppLayout>
    </>
  )
}

export default Profile
