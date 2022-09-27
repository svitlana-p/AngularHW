const express = require("express");
const router = express.Router();
const { 
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    checkTodo,
    deleteTodo 
} = require("../services/todoServices");

router.post("/:id", createTodo);

router.get("/:id", getTodos);

router.get("/:id/todo/:id", getTodo);

router.patch("/:id/todo/:id", updateTodo);

router.put("/:id/todo/:id", checkTodo)

router.delete("/:id/todo/:id", deleteTodo);


module.exports = {
  boardRouter: router,
};