const express = require("express")
const router = express.Router()

const {getAllEvents, getEventById} = require('../controllers/Event');
const {getAllProjects, getProjectById} = require('../controllers/Project');
const {getAllBlogs, getBlogById} = require('../controllers/Blog');
const {getAllMembers, getMemberById} = require('../controllers/Member');

router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);

router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);

router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);

router.get('/members', getAllMembers);
router.get('/members/:id', getMemberById);

module.exports = router;