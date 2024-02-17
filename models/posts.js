const mongoose = require("mongoose");

const postShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img_link: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      default: "Community",
    },
    createdOn: {
      type: Date,
    },
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "Read",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postShema);

module.exports = Post;
