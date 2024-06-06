const express = require("express");
const courseRouter = express.Router();

// courseRouter on http://localhost:5000/course

const { createCourse } = require("../controllers/course");

const authentication = require("../middleware/authentication");

// To Create new course
courseRouter.post("/createCourse", authentication, createCourse);


module.exports = courseRouter;
