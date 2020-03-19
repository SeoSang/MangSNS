const express = require("express")
const morgan = require("morgan") // 로그 저장됨
const cors = require("cors")
const cookieParser = require("cookie-parser")
const expressSession = require("express-session")
const dotenv = require("dotenv")
const passport = require("passport")
const passportConfig = require("./passport")
const hpp = require("hpp")
const helmet = require("helmet")
const db = require("./models")
const app = express()
const userAPIRouter = require("./routes/user")
const postAPIRouter = require("./routes/post")
const postsAPIRouter = require("./routes/posts")
const hashtagAPIRouter = require("./routes/hashtag")
const IS_PRODUCTION = process.env.NODE_ENV === "production"

dotenv.config()
db.sequelize.sync()
passportConfig()

if (IS_PRODUCTION) {
  app.use(hpp())
  app.use(helmet())
  app.use(morgan("combined"))
  app.use(
    cors({
      origin: "http://mangsns.ml",
      credentials: true,
    }),
  )
} else {
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  )
}

// api는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use(morgan("dev")) // 로그 저장용
app.use("/", express.static("uploads"))
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)
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
      domain: IS_PRODUCTION && ".mangsns.ml",
    },
    name: "mingd",
  }),
)
app.use(passport.initialize())
app.use(passport.session()) // expressSession 아래에다가 해야댐

app.use("/api/user", userAPIRouter)
app.use("/api/post", postAPIRouter)
app.use("/api/posts", postsAPIRouter)
app.use("/api/hashtag", hashtagAPIRouter)

app.listen(IS_PRODUCTION ? process.env.PORT : 4539, () => {
  console.log("Hello server, http://localhost:4539")
})
