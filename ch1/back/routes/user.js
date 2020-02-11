const express = require("express")
const router = express.Router()
const db = require("../models")
const bcrypt = require("bcrypt")

router.get("/", (req, res) => {}) // request 요청 response 응답
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
router.post("/login", (req, res) => {})
router.delete("/login", (req, res) => {})

router.get("/logout", (req, res) => {})
router.post("/logout", (req, res) => {})
router.delete("/logout", (req, res) => {})

router.get("/:id/follow", (req, res) => {})
router.post("/:id/follow", (req, res) => {})
router.delete("/:id/follow", (req, res) => {})

router.get("/:id/follower", (req, res) => {})
router.post("/:id/follower", (req, res) => {})
router.delete("/:id/follower", (req, res) => {})

module.exports = router
