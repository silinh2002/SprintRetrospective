const express = require("express");
const router = express.Router();
const controller = require("../controllers/tag.controller");

router.get("/", controller.listTag);
router.post("/", controller.postCreate);

router.get("/:id", controller.findById);
router.patch("/:id", controller.patchUpdate);
router.delete("/:id", controller.delete);
module.exports = router;
