const express = require("express");
const router = express.Router();
const controller = require("../controllers/column.controller");

router.get("/", controller.listColumn);
router.post("/", controller.postCreate);

router.get("/:id", controller.findById);
router.patch("/:id", controller.patchUpdate);
router.delete("/:id", controller.delete);
module.exports = router;
