const express = require("express");
const bodyParser = require("body-parser");
const ConnectDB = require("./db");
const cors = require("cors");
const config = require("./config");

const { port } = config;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.use("/board", require("./routes/board.router"));
app.use("/user", require("./routes/user.router"));

const startSever = async () => {
  app.listen(port, async () => {
    console.log(`API is running on port ${port} http://localhost:${port}`);
  });
};
startSever();

ConnectDB().then(() => {
  console.log("MongoDb connected");
});
