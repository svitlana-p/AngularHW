const { Todo } = require("../models/Todo.js");

const createTodo = (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    const boardId = req.params.id;
    if (!name) next({ message: "Please, enter text", status: 404 });

    const todo = new Todo({
      name,
      userId,
      boardId,
    });
    todo.save().then(() => {
      res.json(todo);
    });
  } catch (error) {
    next(error);
  }
};

const getTodos = (req, res) => {
  try {
    return Todo.find(
      { userId: req.user.userId, boardId: req.params.id },
      "-__v"
    ).then((todos) => {
      res.json(todos);
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res) => {
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

const checkTodo = async (req, res) => {
  try {
    const todo = await Todo.findById({
      _id: req.params.id,
      userId: req.user.userId,
    });

    !todo.inProgress ? (todo.inProgress = true) : (todo.completed = true);

    return todo.save().then(() =>
      res.json({
        message: "Success",
        todo,
      })
    );
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    return await Todo.findByIdAndDelete({
      _id: req.params.id,
    }).then((todo) => res.json(todo));
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
};
