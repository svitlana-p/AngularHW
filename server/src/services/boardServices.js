
const { Board } = require('../models/Boards');

const createBoard = async (req, res, next) => {
    const { name, description } = req.body;
    const userId = req.user.userId;
    if (!name) next({ message: "Please, enter board name", status: 404 });
    if (!description) next({ message: "Please, enter board name", status: 404 });
  
    const board = new Board({
      name,
      description,
      userId
    });
    await board.save().then(() => {
      res.json(
        board
      );
    });
  };

  const getBoards = async (req, res) => {
    return await Board.find({ userId: req.user.userId }, "-__v").then((boards) => {
      res.json(
        boards,
      );
    });
  };

  const editBoard = async (req, res) => {
    const { name } = req.body;
    const board = await Board.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { name } }
    );
  
    await board.save();
    return await Board.findById({ _id: req.params.id }).then((board)=>res.json(board));

  };

  const deleteBoard = async (req, res) => {
     await Board.findByIdAndDelete({
      _id: req.params.id
    })
    return await Board.find({ userId: req.user.userId }, "-__v").then((boards) => {
        res.json(
        boards,
      );
    });
  };
  
  module.exports = {
    createBoard,
    getBoards,
    editBoard,
    deleteBoard
  };