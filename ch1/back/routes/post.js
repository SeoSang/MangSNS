const express = require("express")
const router = express.Router()
const db = require("../models")

router.post("/", async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g)
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    if (hashtags) {
      hashtags.map(tag =>
        db.Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() },
        }),
      )
      await newPost.addHashtags(result.map(r => r[0]))
      // sequelize 가 DB 테이블으 관계에 따라 함수 만들어줌 (addHashtags, removeHashtags , getPosts등등)
    }
    const fullPost = await db.Post.findone({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
        },
      ],
    })
    console.log("TCL: fullPost", fullPost)
    res.json(fullPost)
  } catch (e) {
    console.error(e)
  }
})

router.get("/api/user/:id/post", (req, res) => {})
router.post("/api/user/:id/post", (req, res) => {})
router.delete("/api/user/:id/post", (req, res) => {})

router.get("/api/user/:id/hashtag", (req, res) => {})
router.post("/api/user/:id/hashtag", (req, res) => {})
router.delete("/api/user/:id/hashtag", (req, res) => {})

module.exports = router
