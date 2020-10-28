const express = require("express");
const router = express.Router();
const controller = require("../controllers/board.controller");

router.get("/", controller.listBoard);

// router.get("/", function () {
//   console.log("helloooo");
// });

module.exports = router;
