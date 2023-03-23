const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

async function requireAuth(req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" })
  }

  // take the token, it is "Bearer tokenItself"
  const token = authorization.split(" ")[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({ _id })
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ error: "Request is not authorized" })
  }
}

module.exports = requireAuth