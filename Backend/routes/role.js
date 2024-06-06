const express = require("express");
const roleRouter = express.Router();

// roleRouter on http://localhost:5000/role

const createRole = require("../controllers/role");

roleRouter.post("/createRole", createRole);

module.exports = roleRouter;
