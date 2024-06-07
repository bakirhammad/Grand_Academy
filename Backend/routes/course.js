const express = require("express");
const courseRouter = express.Router();

// courseRouter on http://localhost:5000/course

const {
  createCourse,
  getAllCourses,
  updateCourseById,
  deleteCouresById,
} = require("../controllers/course");

const authentication = require("../middleware/authentication");

// To create new course
courseRouter.post("/createCourse", authentication, createCourse);

// To get all available courses
courseRouter.get("/getAllCourse", authentication, getAllCourses);

// To update course
courseRouter.put("/updateCourse/:id", authentication, updateCourseById);

// To delete course
courseRouter.delete("/deleteCourse/:id", authentication, deleteCouresById);

module.exports = courseRouter;
