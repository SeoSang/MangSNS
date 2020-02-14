const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const db = require("../models")
const router = express.Router()

router.get("/", (req, res) => {
  console.log("routes__user.js: req", req.session)
  if (!req.user) {
    return res.status(401).send("로그인이 필요합니다.")
  }
  const user = Object.assign({}, req.user.toJSON())
  delete user.password
  return res.json(user)
}) // request 요청 response 응답
router.post("/", async (req, res, next) => {
  // 회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (exUser) {
      return res.status(400).send("이미 사용중인 아이디입니다.")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.prefix + "," + req.body.phone,
      residence: req.body.residence.join(","),
    })
    console.log("새로운유저입니다 : ", newUser)
    res.redirect("/")
    return res.status(200).json(newUser)
  } catch (e) {
    console.error(e)
    // 에러처리는 여기 사이에서!
    return next(e) // 에러났을때 다음으로 이어짐(에러났따고 알려줌)
  }
})

router.get("/:id", (req, res) => {
  // ex) api/user/3
})
router.get("/login", (req, res) => {})
router.post("/login", (req, res, next) => {
  console.log("TCL: req.session", req.session)
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    if (info) {
      console.log(info.reason)
      return res.status(401).send(info.reason)
    }
    return req.login(user, async loginErr => {
      try {
        if (loginErr) {
          return next(loginErr)
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              as: "Posts",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id"],
            },
          ],
          attributes: ["id", "nickname", "email"],
        })
        console.log(fullUser)
        return res.json(fullUser)
      } catch (e) {
        next(e)
      }
    })
  })(req, res, next)
})
router.delete("/login", (req, res) => {})

router.get("/logout", (req, res) => {})
router.post("/logout", (req, res) => {
  req.logout()
  console.log("routes__user.js : logout req.session", req.session)
  req.session.destroy()
  res.send("logout 성공!")
  console.log("routes__user.js : logout req.session", req.session)
})
router.delete("/logout", (req, res) => {})

router.get("/:id/follow", (req, res) => {})
router.post("/:id/follow", (req, res) => {})
router.delete("/:id/follow", (req, res) => {})

router.get("/:id/follower", (req, res) => {})
router.post("/:id/follower", (req, res) => {})
router.delete("/:id/follower", (req, res) => {})

module.exports = router
