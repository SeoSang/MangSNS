const express = require("express")
const db = require("../models")
const router = express.Router()

router.get("/:tag", async (req, res, next) => {
  try {
    let where = {}
    if (req.query.lastId != 0) {
      where = { id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) } }
    }

    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(req.query.limit, 10),
    })
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
