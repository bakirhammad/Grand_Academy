const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "Grand";

// To create new User >>
const register = (req, res) => {
  const { firstName, lastName, email, password, role, specialty } = req.body;
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password,
    role,
    specialty,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account Is Created",
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Email is exists",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      }
    });
};

// login function >>
const login = (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  userModel
    .findOne({ email })
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: "Wrong Email or password",
        });
      }
      try {
        const checkPassowrd = await bcrypt.compare(password, result.password);
        if (!checkPassowrd) {
          return res.status(403).json({
            success: false,
            message: "Wrong email or Password",
          });
        }

        const payload = {
          userId: result._id,
        };

        const options = {
          expiresIn: "120m",
        };

        const token = jwt.sign(payload, SECRET, options);

        res.status(200).json({
          success: true,
          message: "Valid login",
          token: token,
          userInfo: {
            userId: result._id,
            firstName: result.firstName,
            userRole: result.role,
          },
        });
      } catch (err) {
        throw err;
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = { register, login };
