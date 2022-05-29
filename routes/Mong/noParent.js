const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/protect");
const { getHorseNoParent } = require("../../controller/mon/horse");

// /horsesM
router.route("/").get(getHorseNoParent);

module.exports = router;
