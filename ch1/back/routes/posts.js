const express = require("express")
const router = express.Router()
const db = require("../models")

router.get("/", async (req, res, next) => {
  try {
    let where = {}
    if (req.query.lastId != 0) {
      where = { id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) } }
    }
    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"],
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
      order: [
        ["createdAt", "DESC"],
        ["updatedAt", "DESC"],
      ],
      limit: parseInt(req.query.limit, 10),
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
