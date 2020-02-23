const express = require("express")
const db = require("../models")
const { isLoggedIn, isNotLoggedIn } = require("./middleware")
const router = express.Router()

// 포스트 추가
router.post("/", isLoggedIn, async (req, res, next) => {
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

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    })
    if (!post) {
      return res.status(404).send("없는 포스트입니다.")
    }
    const comments = await db.Comment.findAll({
      where: { PostId: req.params.id },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    })
    return res.json(comments)
  } catch (error) {
    console.error(error)
    next(error)
  }
})
router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    })
    if (!post) {
      return res.status(404).send("없는 포스트입니다.")
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    })
    await post.addComment(newComment.id)
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    })
    console.log("-----routes__post.js : comment =>")
    console.log(comment)
    return res.json(comment)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
