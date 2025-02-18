const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllTrainings = async () => {
  return await prisma.training.findMany({
    include: {
      trainer: true,
      participants: true,
      sessions: true,
      courseMaterials: true,
      videoLectures: true,
      additionalResources: true,
    },
  });
};

exports.getTrainingById = async (id) => {
  return await prisma.training.findUnique({
    where: { id },
    include: {
      trainer: true,
      participants: true,
      sessions: true,
      courseMaterials: true,
      videoLectures: true,
      additionalResources: true,
    },
  });
};

exports.createTraining = async (data) => {
  return await prisma.training.create({ data });
};

exports.updateTraining = async (id, data) => {
  return await prisma.training.update({ where: { id }, data });
};

exports.deleteTraining = async (id) => {
  return await prisma.training.delete({ where: { id } });
};
