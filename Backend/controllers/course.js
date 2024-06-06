const courseModel = require("../models/course");
const usersModel = require("../models/user");

// To create new Course
const createCourse = (req, res) => {
  const { courseTitle, courseBody, courseImage, courseDuration } = req.body;
  const Teacher = req.token.userId;

  const newCourse = new courseModel({
    Teacher,
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
  