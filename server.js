const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
require("dotenv").config()
const postRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())

// to add body to the request
app.use(express.json())

app.use((req, res, next) => {
  console.log(`method: ${req.method}, path: ${req.path}`)
  next()
})

let endPoint = "/api/chat"
let endPointUser = "/api/user"

// routes
app.use(endPoint, postRoutes)
app.use(endPointUser, userRoutes)

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nodejs-chat.onrender.com"
    : "http://localhost:4000"

// connect to db
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    // listen to requests
    app.listen(PORT, () => {
      console.log(`Connected and listen on PORT: ${PORT}`)
      console.log(`${baseUrl}${endPoint}`)
    })
  } catch (err) {
    console.log(err)
  }
}
connectDb()
