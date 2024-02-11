const mongoose = require("mongoose");
const Project = require("../models/project");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate("made_by");
    res.status(200).json({
      data: projects,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate("made_by");
    res.status(200).json({
      data: project,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addNewProject = async (req, res) => {
  const { title, description, imgUrl, liveLink, githubLink, madeBy } = req.body;

  try {
    const newProject = new Project({
      title,
      image_url: imgUrl,
      description,
      live_link: liveLink,
      github_link: githubLink,
      made_by: [...madeBy],
    });
    await newProject.save().catch((err) => {
      throw new Error("Error while creating a new Project " + err.message);
    });

    res.status(200).json({
      data: newProject,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      data: error.message,
      success: false,
    });
  }
};

exports.updateProject = async (req, res) => {
  const id = req.query.id;
  const { title, description, imgUrl, liveLink, githubLink, madeBy } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new Error("Invalid project id");
    }

    project.title = title;
    project.description = description;
    project.image_url = imgUrl;
    project.live_link = liveLink;
    project.github_link = githubLink;
    project.made_by = [...madeBy];

    await project.save().catch((err) => {
      throw new Error("Error while Updating the project " + err.message);
    });

    res.status(200).json({
      data: project,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      data: err.message,
      success: false,
    });
  }
};

exports.removeProject = async (req, res) => {
  const id = req.query.id;
  try {
    const isProject = await Project.findByIdAndDelete(id).then((project) => {
      if (!project) {
        throw new Error("Invalid member id");
      }
      res.status(200).json({
        data: project,
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
