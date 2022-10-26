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

const getTodos = (req, res, next) => {
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
      _id: req.params.id
    });
    const { action } = req.body;
    
    // if (action === 'todo') {
    //   todo.created = true;
    //   todo.inProgress = false;
    //   todo.completed = false;
    // } else if (action === 'inProgress') {
      
    //   todo.created = false;
    //   todo.inProgress = true;
    //   todo.completed = false;
    // } if (action === 'completed') {
    //   todo.created = false;
    //   todo.inProgress = false;
    //   todo.completed = true;
    // }
    switch (action) {
      case 'todo':
        todo.created = true;
        todo.inProgress = false;
        todo.completed = false;
        break;
      case 'inProgress':
        todo.created = false;
        todo.inProgress = true;
        todo.completed = false;
        break;
      case 'completed':
        todo.created = false;
        todo.inProgress = false;
        todo.completed = true;
        break;
      default:
        todo.created = true;
        todo.inProgress = false;
        todo.completed = false;
        break;
    }
await todo.save()
    return await Todo.findById({
      _id: req.params.id,
    }).then((todo) => res.json({
      todo,
      action
    }
      ));
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

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  checkTodo,
  deleteTodo,
};
