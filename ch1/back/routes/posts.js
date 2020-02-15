const express = require("express")
const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    })
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.get("/api/user/:id/posts", (req, res) => {})
router.post("/api/user/:id/posts", (req, res) => {})
router.delete("/api/user/:id/posts", (req, res) => {})

module.exports = router
