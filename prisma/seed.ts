import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
async function main() {
  try {
    // Menjalankan seeding satu per satu
    await seedUser();
    await seedCourse();
    await seedModule();
    await seedMaterial();
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect dari Prisma setelah selesai
    await prisma.$disconnect();
  }
}

const seedUser = async () => {
  for (let i = 0; i < 30; i++) {
    await prisma.user.create({
      data: {
        username: "username " + i,
        fullname: "fullname " + i,
        password: await bcrypt.hash("password", 10),
      },
    });
  }
};

const seedCourse = async () => {
  for (let i = 0; i < 30; i++) {
    const randomTeacherId = Math.floor(Math.random() * 30);
    await prisma.coursePremium.create({
      data: {
        title: "title " + i,
        description: "description " + i,
        teacher_id: randomTeacherId,
      },
    });
  }
};
const seedModule = async () => {
  for (let i = 0; i < 30; i++) {
    const randomCourseId = Math.floor(Math.random() * 30);
    await prisma.modulPremium.create({
      data: {
        title: "title " + i,
        description: "description " + i,
        course_id: randomCourseId,
      },
    });
  }
};

const seedMaterial = async () => {
  for (let i = 0; i < 30; i++) {
    const randomModuleId = Math.floor(Math.random() * 30);
    await prisma.materialPremium.create({
      data: {
        title: "title " + i,
        description: "description " + i,
        source_type: "PDF",
        material_path: "/",
        module_id: randomModuleId,
      },
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
