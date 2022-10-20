const mongoose = require("mongoose");

const boardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
  },  
  { timestamps: true }
);

const Board = mongoose.model("board", boardSchema);

module.exports = {
  Board,
};
