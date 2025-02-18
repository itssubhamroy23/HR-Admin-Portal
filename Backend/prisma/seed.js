const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with bulk data...");

  // Create Trainers
  const trainers = [];
  for (let i = 1; i <= 5; i++) {
    trainers.push(
      prisma.trainer.create({
        data: {
          name: `Trainer ${i}`,
          email: `trainer${i}@example.com`,
          phone: `+91 98765${i}4321`,
          expertise: [
            "Full Stack",
            "Data Science",
            "DevOps",
            "Cybersecurity",
            "AI",
          ][i % 5],
        },
      })
    );
  }
  const createdTrainers = await prisma.$transaction(trainers);

  // Create Employees
  const employees = [];
  for (let i = 1; i <= 20; i++) {
    employees.push(
      prisma.employee.create({
        data: {
          name: `Employee ${i}`,
          email: `employee${i}@example.com`,
          department: ["Engineering", "Marketing", "HR", "Sales", "Finance"][
            i % 5
          ],
        },
      })
    );
  }
  const createdEmployees = await prisma.$transaction(employees);

  // Create Trainings
  const trainings = [];
  for (let i = 1; i <= 10; i++) {
    trainings.push(
      prisma.training.create({
        data: {
          title: `Training ${i}`,
          description: `Description for training ${i}`,
          trainerId: createdTrainers[i % 5].id,
          duration: Math.floor(Math.random() * 50) + 10,
          courseProgress: Math.random() * 100,
          certificationAvailable: i % 2 === 0,
          totalParticipants: Math.floor(Math.random() * 50),
          upcomingSessions: Math.floor(Math.random() * 5),
          activeTraining: i % 3 !== 0,
        },
      })
    );
  }
  const createdTrainings = await prisma.$transaction(trainings);

  // Create Participants
  const participants = [];
  createdEmployees.forEach((employee) => {
    const training =
      createdTrainings[Math.floor(Math.random() * createdTrainings.length)];
    participants.push(
      prisma.participant.create({
        data: {
          employeeId: employee.id,
          trainingId: training.id,
          progress: Math.random() * 100,
          status: ["Enrolled", "Completed", "In Progress"][
            Math.floor(Math.random() * 3)
          ],
        },
      })
    );
  });
  await prisma.$transaction(participants);

  // Create Sessions
  const sessions = [];
  createdTrainings.forEach((training) => {
    for (let j = 1; j <= 3; j++) {
      sessions.push(
        prisma.session.create({
          data: {
            trainingId: training.id,
            sessionDate: new Date(Date.now() + j * 7 * 24 * 60 * 60 * 1000), // Future dates
            isCompleted: j % 3 === 0,
          },
        })
      );
    }
  });
  await prisma.$transaction(sessions);

  // Create Course Materials
  const courseMaterials = [];
  createdTrainings.forEach((training) => {
    courseMaterials.push(
      prisma.courseMaterial.create({
        data: {
          trainingId: training.id,
          type: ["PDF", "Video", "Article"][Math.floor(Math.random() * 3)],
          title: `Material for ${training.title}`,
          fileUrl: `https://example.com/materials/${training.id}.pdf`,
        },
      })
    );
  });
  await prisma.$transaction(courseMaterials);

  // Create Video Lectures
  const videoLectures = [];
  createdTrainings.forEach((training) => {
    videoLectures.push(
      prisma.videoLecture.create({
        data: {
          trainingId: training.id,
          title: `Lecture for ${training.title}`,
          videoUrl: `https://example.com/videos/${training.id}.mp4`,
          duration: Math.floor(Math.random() * 120) + 30,
          uploadedAt: new Date(),
        },
      })
    );
  });
  await prisma.$transaction(videoLectures);

  // Create Additional Resources
  const additionalResources = [];
  createdTrainings.forEach((training) => {
    additionalResources.push(
      prisma.additionalResource.create({
        data: {
          trainingId: training.id,
          title: `Resource for ${training.title}`,
          resourceUrl: `https://example.com/resources/${training.id}`,
          uploadedAt: new Date(),
        },
      })
    );
  });
  await prisma.$transaction(additionalResources);

  console.log("Seeding completed successfully!");
}

// Execute the script
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
