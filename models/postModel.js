const { Schema, model } = require("mongoose")

const postSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = model("Post", postSchema)
