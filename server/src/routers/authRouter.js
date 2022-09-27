const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../services/authService.js");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = {
  authRouter: router,
};
