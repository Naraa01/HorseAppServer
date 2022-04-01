const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/protect");
const {
  getHorses,
  createHorseM,
  updateHorse,
  getHorseM,
  deleteHorse,
  uploadHorsePhoto,
} = require("../../controller/mon/horse");

router
  .route("/")
  .get(getHorses) //.post(protect, createHorseM);
  // .post(protect, createHorseM);
  .post(createHorseM);
router
  .route("/:id")
  .get(getHorseM)
  // .put(protect, updateHorse)
  // .delete(protect, deleteHorse)
  .put(updateHorse)
  .delete(deleteHorse);

router.route("/:id/upload-photo").put(uploadHorsePhoto);
// uploadHorsePhoto

module.exports = router;
