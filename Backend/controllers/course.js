const courseModel = require("../models/course");

// To create new Course
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

module.exports = {
  createCourse,
};
