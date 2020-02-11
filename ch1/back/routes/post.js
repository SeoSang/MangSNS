const express = require("express")
const router = express.Router()

router.get("/api/user/:id/post", (req, res) => {})
router.post("/api/user/:id/post", (req, res) => {})
router.delete("/api/user/:id/post", (req, res) => {})

router.get("/api/user/:id/hashtag", (req, res) => {})
router.post("/api/user/:id/hashtag", (req, res) => {})
router.delete("/api/user/:id/hashtag", (req, res) => {})

module.exports = router
