const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
    },
    venue: {
      type: String,
    },
    event_date: {
      type: Date,
      required: true,
    },
    registration_link: {
      type: String,
      trim: true,
    },
    registration_started: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
