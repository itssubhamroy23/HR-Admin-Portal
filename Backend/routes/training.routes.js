const express = require("express");
const router = express.Router();
const trainingController = require("../controllers/training.controller");

router.get("/", trainingController.getAllTrainings);
router.get("/:id", trainingController.getTrainingById);
router.post("/", trainingController.createTraining);
router.put("/:id", trainingController.updateTraining);
router.delete("/:id", trainingController.deleteTraining);

module.exports = router;
