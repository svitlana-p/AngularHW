const { Board } = require('../models/Boards');

const createBoard = (req, res, next) => {
    const { name, description } = req.body;
    const userId = req.user.userId;
    if (!name) next({ message: "Please, enter board name", status: 404 });
    if (!description) next({ message: "Please, enter board name", status: 404 });
  
    const board = new Board({
      name,
      description,
      userId
    });
    board.save().then(() => {
      res.json({
        message: "Success",
        board
      });
    });
  };

  const getBoards = (req, res) => {
    return Board.find({ userId: req.user.userId }, "-__v").then((boards) => {
      res.json({
        boards,
      });
    });
  };

  const editBoard = async (req, res) => {
    const { name } = req.body;
    const board = await Board.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $set: { name } }
    );
  
    return board.save().then(() => res.json({ 
        message: "Success",
        board 
    }));
  };

  const deleteBoard = async (req, res) => {
    return await Board.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    }).then(() => res.json({ message: "Success" }));
  };
  
  module.exports = {
    createBoard,
    getBoards,
    editBoard,
    deleteBoard
  };