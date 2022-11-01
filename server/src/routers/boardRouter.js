const express = require("express");
const router = express.Router();
const { 
    createTodo,
    getTodos,
    updateTodo,
    checkTodo,
    deleteTodo,
    getTodoComments,
    postTodoComments,
    deleteTodoComments
} = require("../services/todoServices");

router.post("/:id", createTodo);

router.get("/:id", getTodos);

router.patch("/:id/todo/:id", updateTodo);

router.put("/:id/todo/:id", checkTodo)

router.delete("/:id/todo/:id", deleteTodo);

router.get("/:id/todo/:id/comments", getTodoComments);

router.post("/:id/todo/:id/comments", postTodoComments);

router.delete("/:id/todo/:id/comments/:id", deleteTodoComments);

module.exports = {
  boardRouter: router,
};