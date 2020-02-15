import React from "react"

const Hashtag = ({ tag }) => {
  return <div>Hello</div>
}

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
}

Hashtag.getInitialProps = async context => {
  console.log("hashtag", context.query.tag)
  return { tag: context.query.tag }
}

export default Hashtag
