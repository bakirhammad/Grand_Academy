const courseModel = require("../models/course");

// To Create New Course
const createCourse = (req, res) => {
  const { courseTitle, courseBody, courseImage, courseDuration } = req.body;
  const teacher = req.token.userId;

  const newCourse = new courseModel({
    teacher,
    courseTitle,
    courseBody,
    courseImage,
    courseDate: Date.now(),
    courseDuration,
  });
  newCourse
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        course: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};

// To Get One Course By Id
const getOneCouse = (req, res) => {
  const { id } = req.params;

  courseModel
    .findOne({ _id: id })
    .populate("teacher", "firstName lastName")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Success",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// To Get All Available Courses
const getAllCourses = (req, res) => {
  courseModel
    .find()
    .populate("teacher", "firstName lastName")
    .sort({ courseDate: -1 })
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Courses Available",
          result: result,
        });
      }
      res.status(200).json({
        success: true,
        message: "Success",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// To Update Course
const updateCourseById = (req, res) => {
  const { id } = req.params;
  const { courseBody } = req.body;

  courseModel
    .findOneAndUpdate({ _id: id }, { courseBody }, { new: true })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Course Updated",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};

// To Delete Course
const deleteCouresById = (req, res) => {
  const { id } = req.params;

  courseModel
    .findOneAndDelete({ _id: id })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Course Deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};

module.exports = {
  createCourse,
  getOneCouse,
  getAllCourses,
  updateCourseById,
  deleteCouresById,
};
