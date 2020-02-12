const express = require("express")
const morgan = require("morgan") // 로그 저장됨
const cors = require("cors")
const cookieParser = require("cookie-parser")
const expressSession = require("express-session")
const userAPIRouter = require("./routes/user")
const postAPIRouter = require("./routes/post")
const postsAPIRouter = require("./routes/posts")
const dotenv = require("dotenv")
const passport = require("passport")
const passportConfig = require("./passport")
const db = require("./models")
const app = express()

dotenv.config({ path: __dirname + "/.env" })
db.sequelize.sync()
passportConfig()

// api는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use(morgan("dev")) // 로그 저장용
app.use(cors())
app.use(express.json()) // json 데이터 처리
app.use(express.urlencoded({ extended: true })) // form으로 넘어온 데이터 처리
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, // 암호화
    cookie: {
      httpOnly: true,
      secure: false, // https 쓸 때 true로 하면됨
    },
    name: "rnbck",
  }),
)
app.use(passport.initialize())
app.use(passport.session()) // expressSession 아래에다가 해야댐

app.use("/api/user", userAPIRouter)
app.use("/api/post", postAPIRouter)
app.use("/api/posts", postsAPIRouter)

app.listen(4539, () => {
  console.log("Hello server, http://localhost:4539")
})
