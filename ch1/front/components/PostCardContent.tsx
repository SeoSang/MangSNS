import React, { FC } from "react"
import Link from "next/link"

const PostCardContent: FC<{ postData: string }> = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s]+)/g).map((v: string) => {
        if (v.match(/#[^\s]+/)) {
          return (
            <Link
              href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
              as={`/hashtag/${v.slice(1)}`}
              key={v}
            >
              <a>{v}</a>
            </Link>
          )
        }
        return v
      })}
    </div>
  )
}

export default PostCardContent
