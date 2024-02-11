const mongoose = require("mongoose");
const Blog = require("../models/blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("author");
    res.status(200).json({
      data: blogs,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("author");
    res.status(200).json({
      data: blog,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addNewBlog = async (req, res) => {
  const { title, description, author, imgUrl, date, link } = req.body;

  try {
    const newBlog = new Blog({
      title,
      image_url: imgUrl,
      description,
      author,
      date,
      link,
    });
    await newBlog.save().catch((err) => {
      throw new Error("Error while creating a new Blog " + err.message);
    });

    res.status(200).json({
      data: newBlog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      data: error.message,
      success: false,
    });
  }
};

exports.removeBlog = async (req, res) => {
  const id = req.query.id;
  try {
    const isBlog = await Blog.findByIdAndDelete(id).then((blog) => {
      if (!blog) {
        throw new Error("Invalid blog id");
      }
      res.status(200).json({
        data: blog,
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
