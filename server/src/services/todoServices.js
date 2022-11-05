const { Todo } = require("../models/Todo.js");
const { Comment } = require("../models/Comment.js");

const createTodo = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    const boardId = req.params.id;
    if (!name) next({ message: "Please, enter text", status: 404 });
    if (!userId) next({ message: "Please, enter text", status: 404 });
    if (!boardId) next({ message: "Please, enter text", status: 404 });

    const todo = new Todo({
      name,
      userId,
      boardId,
    });
    await todo.save().then(() => {
      res.json(todo);
    });
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const boardId = req.params.id;
    return await Todo.find({ userId: userId, boardId: boardId }, "-__v").then(
      (todos) => {
        res.json(todos);
      }
    );
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { name } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { name } }
    );
    await todo.save();
    return await Todo.findById({
      _id: req.params.id,
    }).then((todo) => res.json(todo));
  } catch (error) {
    next(error);
  }
};

const checkTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById({
      _id: req.params.id,
    });
    const { action } = req.body;

    switch (action) {
      case "todo":
        todo.created = true;
        todo.inProgress = false;
        todo.completed = false;
        break;
      case "inProgress":
        todo.created = false;
        todo.inProgress = true;
        todo.completed = false;
        break;
      case "completed":
        todo.created = false;
        todo.inProgress = false;
        todo.completed = true;
        break;
      case "archive":
        todo.archive = !todo.archive;
        break;
      default:
        todo.created = true;
        todo.inProgress = false;
        todo.completed = false;
        break;
    }
    await todo.save();
    return await Todo.findById({
      _id: req.params.id,
    }).then((todo) => res.json(todo));
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    return await Todo.findByIdAndDelete({
      _id: req.params.id,
    }).then((todo) => res.json(todo));
  } catch (error) {
    next(error);
  }
};
const getTodoComments = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    return Comment.find({ todoId: todoId }).then((comments) => {
      res.json(comments);
    });
  } catch (error) {
    next(error);
  }
};
const postTodoComments = async (req, res, next) => {
  try {
    const { title, todoId } = req.body;

    if (!title) next({ message: "Please, enter text", status: 404 });
    if (!todoId) next({ message: "Please, enter todoId", status: 404 });
    const comment = new Comment({
      title,
      todoId,
    });
    comment.save().then(() => {
      res.json(comment);
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodoComments = async (req, res, next) => {
  try {
    return await Comment.findByIdAndDelete({ _id: req.params.id }).then(
      (comment) => {
        res.json(comment);
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  checkTodo,
  deleteTodo,
  getTodoComments,
  postTodoComments,
  deleteTodoComments,
};
