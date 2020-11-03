const express = require("express");
const bodyParser = require("body-parser");
const ConnectDB = require("./db");
const cors = require("cors");
const config = require("./config");
const cookieParser = require("cookie-parser");

const { port } = config;

const app = express();

const authMiddleware = require("./middlewares/auth.middleware");

const boardRoutes = require("./routes/board.router");
const columnRoutes = require("./routes/column.router");
const tagRoutes = require("./routes/tag.router");
const userRoutes = require("./routes/user.router");
const authRoutes = require("./routes/auth.route");

// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser("abcxyzasdsadasd"));
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.use("/board", authMiddleware.requireAuth, boardRoutes);
app.use("/column", authMiddleware.requireAuth, columnRoutes);
app.use("/tag", authMiddleware.requireAuth, tagRoutes);
app.use("/user", authMiddleware.requireAuth, userRoutes);
app.use("/auth", authRoutes);

const startSever = async () => {
  app.listen(port, async () => {
    console.log(`API is running on port ${port} http://localhost:${port}`);
  });
};
startSever();

ConnectDB().then(() => {
  console.log("MongoDb connected");
});
