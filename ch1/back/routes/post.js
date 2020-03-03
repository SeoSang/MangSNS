const express = require("express")
const db = require("../models")
const path = require("path")
const multer = require("multer")
const { isLoggedIn, isNotLoggedIn, isPostExist } = require("./middleware")
const router = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads") // null 은 서버에러
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      const basename = path.basename(file.originalname, ext)
      done(null, basename + new Date().valueOf() + ext) // 동일한 이름일 경우를 대비하여 , 날짜 추가.
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
})

// 포스트 추가
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
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
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map(image => {
            return db.Image.create({ src: image })
          }),
        )
        await newPost.addImages(images) // image 가여러개므로 addImages (시퀄라이즈 문법)
      } else {
        const image = await db.Image.create({ src: req.body.image })
        await newPost.addImage(image)
      }
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
        {
          model: db.Image,
        },
      ],
    })
    res.json(fullPost)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.delete("/:id/removePost", isLoggedIn, isPostExist, async (req, res, next) => {
  try {
    await db.Post.destroy({
      where: { id: req.params.id },
    })
    res.send(req.params.id)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.get("/:id/comments", async (req, res, next) => {
  try {
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
router.post("/:id/comment", isLoggedIn, isPostExist, async (req, res, next) => {
  try {
    const post = req.post
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

// multer 설정

// 이미지처리
router.post("/images", upload.array("image"), (req, res) => {
  res.json(req.files.map(v => v.filename))
})

// 좋아요처리
router.post("/:id/like", isLoggedIn, isPostExist, async (req, res, next) => {
  try {
    const post = req.post
    await post.addLiker(req.user.id)
    return res.json({ userId: req.user.id })
  } catch (e) {
    console.error(e)
    console.log("test")
    next(e)
  }
})

router.delete("/:id/like", isLoggedIn, isPostExist, async (req, res, next) => {
  try {
    const post = req.post
    await post.removeLiker(req.user.id)
    return res.json({ userId: req.user.id })
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post("/:id/retweet", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Post,
          as: "Retweet",
        },
      ],
    })
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다.")
    }
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send("자신의 글은 리트윗할 수 없습니다.")
    }
    const retweetTargetId = post.RetweetId || post.id
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    })
    if (exPost) {
      return res.status(403).send("이미 리트윗했습니다.")
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet",
    })
    const retweetWithPrevPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
    })
    res.json(retweetWithPrevPost)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
