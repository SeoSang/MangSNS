import React from "react"

const User = ({ id }) => {
  return <div>User id = {id}</div>
}

User.getInitialProps = async context => {
  return { id: parseInt(context.query.id, 10) } // 이러면 Props로 전달가능
}

export default User
