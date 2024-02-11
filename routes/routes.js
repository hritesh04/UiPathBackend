const express = require("express");
const router = express.Router();

const {
  getAllEvents,
  getEventById,
  addNewEvent,
  updateEvent,
  removeEvent,
} = require("../controllers/Event");
const {
  getAllProjects,
  getProjectById,
  addNewProject,
  removeProject,
  updateProject,
} = require("../controllers/Project");
const {
  getAllBlogs,
  getBlogById,
  addNewBlog,
  removeBlog,
} = require("../controllers/Blog");
const {
  getAllMembers,
  getMemberById,
  addNewMember,
  removeMember,
  adminLogin,
  updateMember,
} = require("../controllers/Member");

const {
  getAllGallery,
  addNewGallery,
  deleteGallery,
  getGalleryById,
  updateGallery,
} = require("../controllers/gallery");

router.post("/admin", adminLogin);

router.get("/events", getAllEvents); //
router.get("/events/:id", getEventById); //
router.post("/events", addNewEvent); //
router.patch("/events", updateEvent); //
router.delete("/events", removeEvent); //

router.get("/projects", getAllProjects); //
router.get("/projects/:id", getProjectById); //
router.post("/projects", addNewProject); //
router.patch("/projects", updateProject); //
router.delete("/projects", removeProject); //

router.get("/blogs", getAllBlogs); //
router.get("/blogs/:id", getBlogById); //
router.post("/blogs", addNewBlog); //
router.delete("/blogs", removeBlog); //

router.get("/gallery", getAllGallery); //
router.get("/gallery/:id", getGalleryById); //
router.post("/gallery", addNewGallery); //
router.patch("/gallery", updateGallery); //
router.delete("/gallery", deleteGallery); //

router.get("/members", getAllMembers); //
router.get("/members/:id", getMemberById); //
router.post("/members", addNewMember); //
router.patch("/members", updateMember); //
router.delete("/members", removeMember); //

module.exports = router;
