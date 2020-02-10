const express = require("express")

const app = express()

app.get("/", (req, res) => {
  // '/' 는 로컬호스트 뒤에 붙는 주소.  => 응답 : Hello, server
  // get -> 접속
  res.send("Hello, server")
})

app.get("/about", (req, res) => {
  res.send("About page")
})

app.listen(4539, () => {
  console.log("Hello server, http://localhost:4539")
})
