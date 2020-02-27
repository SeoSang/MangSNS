const express = require("express")
const db = require("../models")
const path = require("path")
const multer = require("multer")
const { isLoggedIn, isNotLoggedIn } = require("./middleware")
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

// multer 설정

// 이미지처리
router.post("/images", upload.array("image"), (req, res) => {
  res.json(req.files.map(v => v.filename))
})

module.exports = router
