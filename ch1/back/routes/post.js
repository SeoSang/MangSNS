const express = require("express")
const db = require("../models")
const router = express.Router()

router.post("/", async (req, res, next) => {
  console.log("TCL: req", req)
  // POST /api/post
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g)
    const newPost = await db.Post.create({
      content: req.body.content, // ex) '제로초 파이팅 #구독 #좋아요 눌러주세요'
      UserId: req.user.id,
    })
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }),
        ),
      )
      console.log(result)
      await newPost.addHashtags(result.map(r => r[0]))
    }
    // const User = await newPost.getUser();
    // newPost.User = User;
    // res.json(newPost);
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
        },
      ],
    })
    res.json(fullPost)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.get("/:id", (req, res) => {})

router.get("/api/user/:id/post", (req, res) => {})
router.post("/api/user/:id/post", (req, res) => {})
router.delete("/api/user/:id/post", (req, res) => {})

router.get("/api/user/:id/hashtag", (req, res) => {})
router.post("/api/user/:id/hashtag", (req, res) => {})
router.delete("/api/user/:id/hashtag", (req, res) => {})

module.exports = router
