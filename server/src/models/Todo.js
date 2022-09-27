const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    created: {
        type: Boolean,
        default: true,
      },
    inProgress: {
        type: Boolean,
        default: false,
      },
    completed: {
        type: Boolean,
        default: false,
      },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", todoSchema);

module.exports = {
  Todo,
};
