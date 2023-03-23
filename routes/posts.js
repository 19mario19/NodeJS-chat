const express = require("express")
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/postsController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

//require auth for all post routes
router.use(requireAuth)

// routes

// get all posts
router.get("/", getPosts)

// create a post
router.post("/", createPost)

// delete a post
router.delete("/:id", deletePost)

module.exports = router
