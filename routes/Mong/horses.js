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
  getHorseComments,
  updateHorseRating,
  getHorseTree,
  getHorseNoParent,
  getHorseTree2,
} = require("../../controller/mon/horse");

// /horsesM
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

// router.route("/noparent/:genderId").get(getHorseNoParent);
router.route("/:id/tree").get(getHorseTree);
router.route("/:id/treelast").get(getHorseTree2);
router.route("/update/:id").put(updateHorseRating);

router.route("/comments/:id").get(getHorseComments);
// uploadHorsePhoto
router.route("/:id/upload-photo").put(uploadHorsePhoto);
// router
//   .route("/:id/upload-photo")
//   .put(protect, authorize("admin", "operator"), uploadHorsePhoto);

module.exports = router;
