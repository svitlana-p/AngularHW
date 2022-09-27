const express = require("express");
const router = express.Router();
const {
  createBoard,
  getBoards,
  editBoard,
  deleteBoard,
} = require("../services/boardServices");

router.post("/", createBoard);

router.get("/", getBoards);

router.patch("/:id", editBoard);

router.delete("/:id", deleteBoard);

module.exports = {
  boardsRouter: router,
};
