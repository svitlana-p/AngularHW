const { Board } = require("../models/Boards");

const createBoard = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;
    if (!name) next({ message: "Please, enter board name", status: 404 });
    if (!description)
      next({ message: "Please, enter board name", status: 404 });

    const board = new Board({
      name,
      description,
      userId,
    });
    await board.save().then(() => {
      res.json(board);
    });
  } catch (error) {
    next(error);
  }
};

const getBoards = async (req, res, next) => {
  try {
    return await Board.find({ userId: req.user.userId }, "-__v").then(
      (boards) => {
        res.json(boards);
      }
    );
  } catch (error) {
    next(error);
  }
};
const getBoard = async (req, res, next) => {
  try {
    return await Board.find({_id: req.params.id}, "-__v").then(
      (board) => {
        res.json(board);
      }
    );
  } catch (error) {
    next(error);
  }
};

const editBoard = async (req, res, next) => {
  try {
    const { name } = req.body;
    const board = await Board.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { name } }
    );

    await board.save();
    return await Board.findById({ _id: req.params.id }).then((board) =>
      res.json(board)
    );
  } catch (error) {
    next(error);
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    await Board.findByIdAndDelete({
      _id: req.params.id,
    });
    return await Board.find({ userId: req.user.userId }, "-__v").then(
      (boards) => {
        res.json(boards);
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  editBoard,
  deleteBoard,
};
