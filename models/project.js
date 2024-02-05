const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logo_url: {
      type: String,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
    },
    live_link: {
      type: String,
      trim: true,
    },
    github_link: {
      type: String,
      trim: true,
    },
    made_by: memberSchema,
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
