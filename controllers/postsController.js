const Post = require("../models/postModel")
const { Types } = require("mongoose")

async function getPosts(req, res) {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function createPost(req, res) {
  let { message } = req.body

  try {
    const user_id = req.user.email
    const post = await Post.create({ message, user_id })
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}

async function deletePost(req, res){
  try {
    let {id} = req.params
    if(!Types.ObjectId.isValid(id)){
      return res.status(404).json({error: "No such post"})
    }
    const post = await Post.findOneAndDelete({_id: id})
    if(!post){
      return res.status(404).json({error: "No such post"})
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}


module.exports = {
  getPosts,
  createPost,
  deletePost
}
