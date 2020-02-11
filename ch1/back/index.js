const express = require("express")
const db = require("./models")
const morgan = require("morgan") // 로그 저장됨
const cors = require("cors")
const userAPIRouter = require("./routes/user")
const postAPIRouter = require("./routes/post")
const postsAPIRouter = require("./routes/posts")
const app = express()
db.sequelize.sync()

// api는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use(express.json()) // json 데이터 처리
app.use(express.urlencoded({ extended: true })) // form으로 넘어온 데이터 처리
app.use(morgan("dev")) // 로그 저장용
app.use(cors())

app.use("/api/user", userAPIRouter)
app.use("/api/post", postAPIRouter)
app.use("/api/posts", postsAPIRouter)

app.listen(4539, () => {
  console.log("Hello server, http://localhost:4539")
})
