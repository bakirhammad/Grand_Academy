const express = require("express");
const userRouter = express.Router();

//userRouter on http://localhost:5000/user

const { register, login } = require("../controllers/user");

// To Create new user
userRouter.post("/register", register);

// To Login
userRouter.post("/login", login);

module.exports = userRouter;
