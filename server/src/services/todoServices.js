const { Todo } = require("../models/Todo.js");

const createTodo = (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.userId;
  const boardId = req.params.id
  if (!name) next({ message: "Please, enter text", status: 404 });

  const todo = new Todo({
    name,
    userId,
    boardId,
  });
  todo.save().then(() => {
    res.json({
      message: "Success",
      todo
    });
  });
};

const getTodos = (req, res) => {
  return Todo.find({ userId: req.user.userId }, "-__v").then((todos) => {
    res.json({
      todos,
    });
  });
};

const getTodo = (req, res) => {
  return Todo.findById(req.params.id).then((todo) =>
    res.json({
      todo,
    })
  );
};

const updateTodo = async (req, res) => {
  const { name } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    { $set: { name } }
  );

  return todo.save().then(() => res.json({ 
    message: "Success",
    todo
}));
};

const checkTodo = async (req, res) => {
  const todo = await Todo.findById({
    _id: req.params.id,
    userId: req.user.userId,
  });

  !todo.inProgress ? todo.inProgress = true : todo.completed = true;

  return todo.save().then(() => res.json({ 
    message: "Success",
    todo
 }));
};

const deleteTodo = async (req, res) => {
  return await Todo.findByIdAndDelete({
    _id: req.params.id,
    userId: req.user.userId,
  }).then(() => res.json({ message: "Success" }));
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  checkTodo,
  deleteTodo,
};