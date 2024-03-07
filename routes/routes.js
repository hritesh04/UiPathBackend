const express = require("express");
const multer = require("multer");
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
} = require("../controllers/member");

const {
  getAllGallery,
  addNewGallery,
  deleteGallery,
  getGalleryById,
  updateGallery,
} = require("../controllers/gallery");

const { adminAuth } = require("../utils/middleware");
const {
  getAllPosts,
  addNewPost,
  deletePost,
  getPostById,
} = require("../controllers/Posts");

const upload = multer();

router.post("/admin", adminLogin);

router.get("/events", getAllEvents); //
router.get("/events/:id", getEventById); //
router.post("/events", adminAuth, upload.any("image"), addNewEvent); //
router.patch("/events", adminAuth, upload.any("image"), updateEvent); //
router.delete("/events", adminAuth, removeEvent); //

router.get("/projects", getAllProjects); //
router.get("/projects/:id", getProjectById); //
router.post("/projects", adminAuth, upload.any("image"), addNewProject); //
router.patch("/projects", adminAuth, upload.any("image"), updateProject); //
router.delete("/projects", adminAuth, removeProject); //

router.get("/blogs", getAllBlogs); //
router.get("/blogs/:id", getBlogById); //
router.post("/blogs", adminAuth, upload.any("image"), addNewBlog); //
router.delete("/blogs", adminAuth, removeBlog); //

router.get("/gallery", getAllGallery); //
router.get("/gallery/:id", getGalleryById); //
router.post("/gallery", adminAuth, upload.array("image"), addNewGallery); //
router.patch("/gallery", adminAuth, upload.any("image"), updateGallery); //
router.delete("/gallery", adminAuth, deleteGallery); //

router.get("/members", getAllMembers); //
router.get("/members/:id", getMemberById); //
router.post("/members", adminAuth, upload.any("image"), addNewMember); //
router.patch("/members", adminAuth, upload.any("image"), updateMember); //
router.delete("/members", adminAuth, removeMember); //

router.get("/post", getAllPosts); //
router.get("/post/:id", getPostById); //
router.post("/post", adminAuth, upload.single("image"), addNewPost); //
router.delete("/post", adminAuth, deletePost); //

module.exports = router;
