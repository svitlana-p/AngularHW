const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    todoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
},
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
  Comment,
};
