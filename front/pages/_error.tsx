import React from "react"
import { Context } from "../mytypes/pagesTypes"
import { NextPage } from "next"

const MyError: NextPage<{ statusCode: number | null | undefined }> = ({ statusCode }) => {
  if (!statusCode) {
    statusCode = 400
  }
  return (
    <div>
      <h1>{statusCode} 에러 발생</h1>
      <h2>운영자에게 문의 바랍니다.</h2>
    </div>
  )
}

MyError.getInitialProps = async (context: Context) => {
  const statusCode = context.res
    ? context.res.statusCode
    : context.err
    ? context.err.statusCode
    : null
  return { statusCode }
}

export default MyError
