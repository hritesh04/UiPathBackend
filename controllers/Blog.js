const mongoose = require("mongoose");
const Blog = require("../models/blog");

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            data: blogs,
            success: true,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        res.status(200).json({
            data: blog,
            success: true,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

