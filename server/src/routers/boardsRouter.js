const express = require("express");
const router = express.Router();
const {
  createBoard,
  getBoards,
  getBoard,
  editBoard,
  deleteBoard,
  updateBoard
} = require("../services/boardServices");

router.post("/", createBoard);

router.get("/",getBoards);

router.get("/:id",getBoard);

router.patch("/:id", editBoard);

router.put("/:id", updateBoard);

router.delete("/:id", deleteBoard);

module.exports = {
  boardsRouter: router,
};
