const mongoose = require("mongoose");
const Project = require("../models/project");

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json({
            data: projects,
            success: true,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project
            .findById(id)
            .populate("members");
        res.status(200).json({
            data: project,
            success: true,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

