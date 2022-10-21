const { User } = require("../models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isUserName = await User.findOne({
      username: req.body.username,
    });

    if (isUserName) {
      return res
        .status(400)
        .json({ message: "User with such username is already exists" });
    }
    const isUserEmail = await User.findOne({
      email: req.body.email,
    });

    if (isUserEmail) {
      return res
        .status(400)
        .json({ message: "User with such email is already exists" });
    }

    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user
      .save()
      .then(() => res.send({ message: "Success" }))
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (
      user &&
      (await bcrypt.compare(String(req.body.password), String(user.password)))
    ) {
      const payload = { username: user.username, userId: user._id };
      const jwtToken = jwt.sign(payload, process.env.SECRET_JWT_KEY);
      return res.send({
        token: jwtToken,
        username: user.username
      });
    }
    return res.status(400).json({ message: "Not authorized" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
