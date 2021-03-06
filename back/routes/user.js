const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const { isLoggedIn, isNotLoggedIn } = require("./middleware")
const db = require("../models")
const router = express.Router()

// 유저정보 가져오기
router.get("/", isLoggedIn, (req, res) => {
  // /api/user/
  console.log("routes__user.js => req.user", req.user)
  const user = Object.assign({}, req.user.toJSON())
  delete user.password
  return res.json(user)
})

router.post("/", isNotLoggedIn, async (req, res, next) => {
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

// 유저정보 확인
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
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
      attributes: ["id", "nickname"],
    })
    const jsonUser = user.toJSON()
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0
    res.json(jsonUser)
  } catch (error) {
    console.error(error)
    next(e)
  }
})

router.get("/login", (req, res) => {})
router.post("/login", (req, res, next) => {
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
  req.session.destroy()
  res.send("logout 성공!")
})
router.delete("/logout", (req, res) => {})
router.get("/:id/posts", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
        RetweetId: null,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
      ],
    })
    res.json(posts)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    })
    await me.addFollowing(req.params.id)
    res.send(req.params.id)
  } catch (e) {
    console.error(e)
    next(e)
  }
})
router.delete("/:id/unfollow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    })
    await me.removeFollowing(req.params.id)
    res.send(req.params.id)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.get("/:id/followings", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },
    })
    const followings = await user.getFollowings({
      attributes: ["id", "nickname"],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10),
    })

    res.json(followings)
  } catch (e) {
    console.error(e)
    next(e)
  }
})
router.get("/:id/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },
    })
    const followers = await user.getFollowers({
      attributes: ["id", "nickname"],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10),
    })

    res.json(followers)
  } catch (e) {
    console.error(e)
    next(e)
  }
})
router.delete("/:id/follower", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
    })
    await user.removeFollower(req.params.id)
    res.send(req.params.id)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      },
    )
    res.send(req.body.nickname)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
