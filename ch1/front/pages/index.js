import React from "react"
import Link from "next/link"
import Head from "next/head"
import AppLayout from "../components/AppLayout.js"

const Home = () => {
  return (
    <>
      <Link href="/users/create">
        <a>Go to create.js</a>
      </Link>
      <div>
        <h1>I am Home</h1>
      </div>
    </>
  )
}

export default Home
