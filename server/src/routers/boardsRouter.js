const express = require("express");
const router = express.Router();
const {
  createBoard,
  getBoards,
  getBoard,
  editBoard,
  deleteBoard,
} = require("../services/boardServices");

router.post("/", createBoard);

router.get("/",getBoards);

router.get("/:id",getBoard);

router.patch("/:id", editBoard);

router.delete("/:id", deleteBoard);

module.exports = {
  boardsRouter: router,
};
