const trainingService = require("../services/training.service");

exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await trainingService.getAllTrainings();
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrainingById = async (req, res) => {
  try {
    const training = await trainingService.getTrainingById(req.params.id);
    res.json(training);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createTraining = async (req, res) => {
  try {
    const training = await trainingService.createTraining(req.body);
    res.status(201).json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTraining = async (req, res) => {
  try {
    const training = await trainingService.updateTraining(
      req.params.id,
      req.body
    );
    res.json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    await trainingService.deleteTraining(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
