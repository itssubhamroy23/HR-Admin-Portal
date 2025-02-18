require("dotenv").config();
const express = require("express");
const cors = require("cors");
const trainerRoutes = require("./routes/trainer.routes");
const trainingRoutes = require("./routes/training.routes");
const additionalResource = require("./routes/additionalResource.routes");
const courseMaterial = require("./routes/courseMaterial.routes");
const employee = require("./routes/employee.routes");
const participant = require("./routes/participant.routes");
const session = require("./routes/session.routes");
const videoLecture = require("./routes/videoLecture.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/additional-resource", additionalResource);
app.use("/course-material", courseMaterial);
app.use("/employee", employee);
app.use("/participant", participant);
app.use("/session", session);
app.use("/trainers", trainerRoutes);
app.use("/trainings", trainingRoutes);
app.use("/video-Lectures", videoLecture);
// Add other routes here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
