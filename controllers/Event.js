// example.js

const mongoose = require("mongoose");
const Event = require("../models/event");

exports.getAllEvents = async (req, res) => {
  try {
    const blogs = await Event.find({});
    res.status(200).json({
      data: blogs,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Event.findById(id);
    res.status(200).json({
      data: blog,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addNewEvent = async (req, res) => {
  const {
    name,
    imgUrl,
    description,
    venue,
    eventDate,
    registrationLink,
    registrationStarted,
  } = req.body;

  try {
    const newEvent = new Event({
      name,
      image_url: imgUrl,
      description,
      venue,
      event_date: eventDate,
      registration_link: registrationLink,
      registration_started: registrationStarted,
    });
    await newEvent.save().catch((err) => {
      throw new Error("Error while creating a new Event " + err.message);
    });

    res.status(200).json({
      data: newEvent,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      data: error.message,
      success: false,
    });
  }
};

exports.updateEvent = async (req, res) => {
  const id = req.query.id;
  const {
    name,
    imgUrl,
    description,
    venue,
    eventDate,
    registrationLink,
    registrationStarted,
  } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Invalid event id");
    }

    event.name = name;
    event.imgUrl = imgUrl;
    event.description = description;
    event.venue = venue;
    event.event_date = eventDate;
    event.registration_link = registrationLink;
    event.registration_started = registrationStarted;

    await event.save().catch((err) => {
      throw new Error("Error while Updating the event " + err.message);
    });

    res.status(200).json({
      data: event,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      data: err.message,
      success: false,
    });
  }
};

exports.removeEvent = async (req, res) => {
  const id = req.query.id;
  try {
    const isEvent = await Event.findByIdAndDelete(id).then((event) => {
      if (!event) {
        throw new Error("Invalid member id");
      }
      res.status(200).json({
        data: event,
        success: true,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};
