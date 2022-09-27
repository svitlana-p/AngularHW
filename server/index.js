const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.22vwbrd.mongodb.net/angular?retryWrites=true&w=majority`
);

const { authRouter } = require("./src/routers/authRouter.js");
const { authMiddleware } = require("./src/middleware/authMiddleware.js");
const { boardsRouter } = require("./src/routers/boardsRouter.js");
const { boardRouter } = require("./src/routers/boardRouter.js");
const accessedLog = fs.createWriteStream(
  path.join(__dirname, "requestLogs.log"),
  { flags: "a" }
);

app.use(express.json());
app.use(morgan("tiny", { stream: accessedLog }));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

app.use("/api/auth", authRouter);
app.use("/api/dashboard", authMiddleware, boardsRouter);
app.use("/api/dashboard/board", authMiddleware, boardRouter);

const start = async () => {
  try {
    app.listen(PORT);
    console.log(`App started at port: ${PORT}`);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

//ERROR HANDLER
app.use(errorHandler);

function errorHandler(err, req, res) {
  console.error(err);
  res.status(500).send({ message: "Server error" });
}
